'use client'
import { LoginUser } from '@/action/user/login'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { InputComponent } from '../form/input'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Entrando...
        </button>
      ) : (
        <button className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg">
          Entrar
        </button>
      )}
    </>
  )
}

export const LoginComponent = () => {
  const [state, action] = useFormState(LoginUser, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <div className="flex flex-col ">
      <form action={action} className="space-y-5 flex flex-col">
        <InputComponent
          type="email"
          label="E-mail"
          name="email"
          id="email"
          required={false}
        />
        <InputComponent
          type="password"
          label="Senha"
          name="password"
          id="Senha"
          required={false}
        />
        {state.error &&
          state.error !== 'E-mail não verificado' &&
          state.error !== 'Unexpected end of JSON input' &&
          state.error !==
            "Cannot read properties of undefined (reading 'message')" && (
            <span className="text-xs text-red-600">{state.error}</span>
          )}
        {state.error === 'Unexpected end of JSON input' && (
          <span className="text-xs text-red-600">
            Erro ao realizar o login.
          </span>
        )}
        <p className="text-black text-xs">
          Esqueceu a senha?
          <Link
            href="/user/recover/sendEmail"
            className="text-blue-500 text-xs"
          >
            Recuperar
          </Link>
        </p>
        <FormButton />
      </form>
      <div className="mt-6 w-96 max-sm:w-80 text-center max-md:mx-auto space-y-5">
        <hr />
        <p className="text-black text-xs">
          Não tem uma conta? Contate um administrador
        </p>
      </div>
    </div>
  )
}
