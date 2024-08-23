import { SendEmailComponent } from '@/components/user/recover/sendEmail'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Recuperação de senha',
  },
}

export default function InsertBanner() {
  return (
    <div className="flex justify-center items-center h-screen mt-[-80px]">
      <SendEmailComponent />
    </div>
  )
}
