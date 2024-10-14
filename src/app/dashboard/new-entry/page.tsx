import Modal from '@/components/ui/Modal'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewEntry() {
  return (
    <Modal>
      <Link href='/dashboard' className='transition-all hover:pl-2'>
        <MoveLeft strokeWidth={1.5} className='transition-all hover:ml-2' />
      </Link>
      <h1>New Entry</h1>
    </Modal>
  )
}
