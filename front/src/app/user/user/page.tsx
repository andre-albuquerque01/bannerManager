import { InsertUserComponent } from '@/components/user/insertUser'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Insert user',
  },
}

export default function InsertBanner() {
  return (
    <div className="flex justify-center items-center h-screen mt-[-80px]">
      <InsertUserComponent />
    </div>
  )
}
