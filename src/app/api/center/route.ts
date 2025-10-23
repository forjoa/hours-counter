import { turso } from '@/core/db';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/core/getToken';

export async function GET(request: NextRequest) {
  const user = await getUserFromToken(request);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { rows } = await turso.execute({
      sql: 'SELECT * FROM workcenter WHERE userid = ?',
      args: [user.userid as number],
    });

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching centers', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await getUserFromToken(request);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.json();
    const newCenter = formData.name as string;

    // Check if center already exists
    const { rows } = await turso.execute({
      sql: 'SELECT * FROM workcenter WHERE LOWER(name) = LOWER(?) AND userid = ?',
      args: [newCenter, user.userid as number],
    });

    if (rows.length > 0) {
      return NextResponse.json(
        { message: 'Este centro ya existe' },
        { status: 409 }
      );
    }

    // Insert new center
    await turso.execute({
      sql: 'INSERT INTO workcenter (name, userid) VALUES (?, ?)',
      args: [newCenter, user.userid as number],
    });

    return NextResponse.json(
      { message: 'Center created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating center', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const user = await getUserFromToken(request);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.json();
    const { workcenterid, name } = formData;

    // Check if another center with the same name exists
    const { rows } = await turso.execute({
      sql: 'SELECT * FROM workcenter WHERE LOWER(name) = LOWER(?) AND userid = ? AND workcenterid != ?',
      args: [name, user.userid as number, workcenterid],
    });

    if (rows.length > 0) {
      return NextResponse.json(
        { message: 'Este centro ya existe' },
        { status: 409 }
      );
    }

    // Update the center
    await turso.execute({
      sql: 'UPDATE workcenter SET name = ? WHERE workcenterid = ? AND userid = ?',
      args: [name, workcenterid, user.userid as number],
    });

    return NextResponse.json(
      { message: 'Center updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating center', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getUserFromToken(request);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const workcenterid = searchParams.get('workcenterid');

    if (!workcenterid) {
      return NextResponse.json(
        { message: 'workcenterid is required' },
        { status: 400 }
      );
    }

    await turso.execute({
      sql: 'DELETE FROM workcenter WHERE workcenterid = ? AND userid = ?',
      args: [workcenterid, user.userid as number],
    });

    return NextResponse.json(
      { message: 'Center deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting center', error: (error as Error).message },
      { status: 500 }
    );
  }
}