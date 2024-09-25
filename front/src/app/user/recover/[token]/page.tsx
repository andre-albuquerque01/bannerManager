import { UpdatePasswordRecoverComponent } from '@/components/user/recover/updatePasswordRecover'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Recuperação de senha',
  },
}

export default function SendEmail({ params }: { params: { token: string } }) {
  if (!params) redirect('/')
  return (
    <div className="flex justify-center items-center h-screen mt-[-80px]">
      <UpdatePasswordRecoverComponent token={params.token} />
    </div>
  )
}
