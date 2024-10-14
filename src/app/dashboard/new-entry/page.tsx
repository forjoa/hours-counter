import Modal from '@/components/ui/Modal'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewEntry() {
  return (
    <Modal>
      <Link href='/dashboard' className='w-fit hover:ml-2 transition-all'>
        <MoveLeft strokeWidth={1.5} />
      </Link>
      <h1>New Entry</h1>
    </Modal>
  )
}
