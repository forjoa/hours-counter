import { PropsWithChildren } from "react"
import { MoveLeft } from "lucide-react"
import Link from "next/link"

interface Props extends PropsWithChildren {
  route?: string
}

export default function Modal({ children, route }: Props) {
  const link = route ?? "home"

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 rounded-t-2xl">
          <Link
            href={`/${link}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MoveLeft className="w-5 h-5 text-gray-700" />
          </Link>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}