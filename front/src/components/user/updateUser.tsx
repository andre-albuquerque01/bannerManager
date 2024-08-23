'use client'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { ArrowLeft } from 'lucide-react'
import { InputComponent } from '../form/input'
import { InputUpdateComponent } from '../form/inputUpdate'
import { UserInterface } from '@/data/type/user'
import { FormEvent, useState } from 'react'
import { UpdateUser } from '@/action/user/update'
import { useRouter } from 'next/navigation'

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

export const UpdateUserComponent = ({
  data,
}: {
  data: UserInterface | undefined
}) => {
  const [error, setError] = useState()
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await UpdateUser(data)

    if (req === 'success') {
      alert('Alterado com sucesso!')
      router.back()
    }
    setError(req)
  }

  return (
    <form
      className="space-y-5 flex flex-col text-black my-5"
      onSubmit={handleSubmit}
    >
      <Link href="/" className="flex items-center">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputUpdateComponent
        type="text"
        label="Nome"
        name="name"
        id="name"
        value={data?.name ?? ''}
        required={true}
      />
      <InputUpdateComponent
        type="text"
        label="E-mail"
        name="email"
        id="email"
        value={data?.email ?? ''}
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
      {error && <p className="text-xs text-red-600">{error}</p>}
      <FormButton />
    </form>
  )
}
