'use client'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { InputUpdateComponent } from '../form/inputUpdate'
import { useRouter } from 'next/navigation'
import { BusinessInterface } from '@/data/type/business'
import { UpdateBusiness } from '@/action/business/update'

const BtnForm = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {pending ? (
        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
            disabled={pending}
          >
            Alterando...
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg">
            Alterar
          </button>
        </div>
      )}
    </>
  )
}

export const UpdateBusinessComponent = ({
  data,
  id,
}: {
  data: BusinessInterface | undefined
  id: string
}) => {
  const router = useRouter()
  const [status, setStatus] = useState<boolean>(false)
  const [returnError, setReturnError] = useState<string>('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    setReturnError('')
    const formData = new FormData(e.currentTarget)
    const req = await UpdateBusiness(formData, id)
    if (req === '') {
      alert('Alterado com sucesso.')
      router.back()
    }
    setReturnError(req)
    setStatus(false)
  }

  return (
    <form
      className="space-y-5 flex flex-col text-black my-5"
      onSubmit={handleSubmit}
    >
      <Link href="/business" className="flex items-center">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputUpdateComponent
        type="text"
        label="Campanha"
        name="campanha"
        id="campanha"
        value={data?.campanha ?? ''}
        required={true}
      />
      <InputUpdateComponent
        type="text"
        label="Cliente"
        name="cliente"
        id="cliente"
        value={data?.cliente ?? ''}
        required={true}
      />
      <InputUpdateComponent
        type="text"
        label="Agência"
        name="agencia"
        id="agencia"
        value={data?.agencia ?? ''}
        required={true}
      />
      <div className="flex items-center gap-2 text-black">
        <input
          type="checkbox"
          name="destaque"
          id="destaque"
          defaultChecked={data?.destaque === 1}
        />
        <label htmlFor="destaque">Para o destaque</label>
      </div>
      {returnError && <p className="text-xs text-red-600">{returnError}</p>}
      <BtnForm pending={status} />
    </form>
  )
}
