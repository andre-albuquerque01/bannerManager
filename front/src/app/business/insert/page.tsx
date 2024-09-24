import { InsertBusinessComponent } from '@/components/business/insertBusiness'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Insert Business',
  },
}

export default function InsertBusiness() {
  return (
    <div className="flex justify-center items-center h-screen mt-[-80px]">
      <InsertBusinessComponent />
    </div>
  )
}
