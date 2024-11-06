import Modal from '@/components/ui/Modal'
import { getCenterById } from '@/core/getCenterById'

export default async function Page({
  params,
}: {
  params: Promise<{ centerid: string }>
}) {
  const slug = (await params).centerid

  const center = await getCenterById(slug)
  return (
    <Modal route='center-list'>
      <div>My center id: {slug}</div>
      <div>name: {center.name}</div>
      <div>userid: {center.userid}</div>
      <div>created at: {center.createdat}</div>
    </Modal>
  )
}
