'use client'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { ArrowLeft } from 'lucide-react'
import { InputComponent } from '../form/input'
import { InsertUser } from '@/action/user/insert'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Cadastrando...
        </button>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Cadastrar
        </button>
      )}
    </>
  )
}

export const InsertUserComponent = () => {
  const [state, action] = useFormState(InsertUser, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <form className="space-y-5 flex flex-col text-black my-5" action={action}>
      <Link href="/user/login" className="flex items-center">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputComponent
        type="text"
        label="Nome"
        name="name"
        id="name"
        placeholder="Nome"
        required={true}
      />
      <InputComponent
        type="text"
        label="E-mail"
        name="email"
        id="email"
        placeholder="Email"
        required={true}
      />
      <InputComponent
        type="password"
        label="Senha"
        name="password"
        id="password"
        placeholder="Senha"
        required={true}
      />
      <InputComponent
        type="password"
        label="Confirmação da senha"
        name="password_confirmation"
        id="password_confirmation"
        placeholder="Repita a senha"
        required={true}
      />
      {state.error && <p className="text-xs text-red-600">{state.error}</p>}
      <FormButton />
    </form>
  )
}
