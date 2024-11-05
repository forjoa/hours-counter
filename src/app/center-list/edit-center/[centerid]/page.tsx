import Modal from '@/components/ui/Modal'

export default async function Page({
  params,
}: {
  params: Promise<{ centerid: string }>
}) {
  const slug = (await params).centerid
  return (
    <Modal>
      <div>My center id: {slug}</div>
    </Modal>
  )
}
