import { LoginComponent } from '@/components/user/login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Login',
  },
}

export default function InsertBanner() {
  return (
    <div className="flex justify-center items-center h-screen mt-[-80px]">
      <LoginComponent />
    </div>
  )
}
