/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { SendEmail } from '@/action/user/recoverPassword/sendEmail'
import { InputComponent } from '@/components/form/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Enviando...
        </button>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Enviar
        </button>
      )}
    </>
  )
}

export const SendEmailComponent = () => {
  const router = useRouter()
  const [state, action] = useFormState(SendEmail, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state && state.ok) {
      alert('Email enviado!')
      router.push('/')
    }
  }, [state])

  return (
    <form className="space-y-5 flex flex-col text-black" action={action}>
      <Link href="/user/login" className="flex items-center">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputComponent
        type="email"
        label="E-mail"
        name="email"
        id="email"
        required={true}
      />
      <p className="text-xs text-red-600">{state && state.error}</p>
      <FormButton />
    </form>
  )
}
