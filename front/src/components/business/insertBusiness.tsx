'use client'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { ArrowLeft } from 'lucide-react'
import { InputComponent } from '../form/input'
import { InsertBusiness } from '@/action/business/insert'

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

export const InsertBusinessComponent = () => {
  const [state, action] = useFormState(InsertBusiness, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <form className="space-y-5 flex flex-col text-black my-5" action={action}>
      <Link href="/business" className="flex items-center">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputComponent
        type="text"
        label="Campanha"
        name="campanha"
        id="campanha"
        placeholder="Campanha"
        required={true}
      />
      <InputComponent
        type="text"
        label="Cliente"
        name="cliente"
        id="cliente"
        placeholder="Cliente"
        required={true}
      />
      <InputComponent
        type="text"
        label="Agência"
        name="agencia"
        id="agencia"
        placeholder="Agência"
        required={true}
      />
      <div className="flex items-center gap-2 text-black">
        <input type="checkbox" name="destaque" id="destaque" />
        <label htmlFor="destaque">Para o destaque</label>
      </div>
      {state.error && <p className="text-xs text-red-600">{state.error}</p>}
      <FormButton />
    </form>
  )
}
