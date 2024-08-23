/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { RecoverUpdatePassword } from '@/action/user/recoverPassword/recoverUpdatePassword'
import { InputComponent } from '@/components/form/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useFormStatus } from 'react-dom'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Alterando...
        </button>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Alterar
        </button>
      )}
    </>
  )
}

export const UpdatePasswordRecoverComponent = ({
  token,
}: {
  token: string
}) => {
  const router = useRouter()
  const [error, setError] = useState<string>('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = {
      token,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      password_confirmation: formData.get('password_confirmation') as string,
    }
    const response = await RecoverUpdatePassword(data)
    if (response === '') {
      alert('Alterado com sucesso!')
      router.push('/user/login')
    } else setError(response)
  }

  return (
    <form
      className="space-y-5 flex flex-col text-black"
      onSubmit={handleSubmit}
    >
      <Link href="/user/login" className="flex items-center ">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <input type="hidden" name="token" defaultValue={token} />
      <InputComponent
        type="email"
        label="E-mail"
        name="email"
        id="email"
        required={true}
      />
      <InputComponent
        type="password"
        label="Senha"
        name="password"
        id="Senha"
        required={true}
      />
      <InputComponent
        type="password"
        label="Confirmação de senha"
        name="password_confirmation"
        id="Confirmação de senha"
        required={true}
      />
      <p className="text-xs text-red-600">{error && error}</p>
      <FormButton />
    </form>
  )
}
