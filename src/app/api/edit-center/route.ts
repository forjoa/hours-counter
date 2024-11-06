export async function POST (request: Request) {
    const {workcenterid, name} = await request.json()
    console.log(workcenterid, name)
}