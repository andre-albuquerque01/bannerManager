'use client'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { InsertBanner } from '@/action/banner/insert'
import { ArrowLeft } from 'lucide-react'
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

export const InsertBannerComponent = () => {
  const [state, action] = useFormState(InsertBanner, {
    ok: false,
    error: '',
    data: null,
  })

  const [media, setMedia] = useState<{ type: string; url: string } | null>(null)

  function handleMediaChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files && target.files.length > 0) {
      const file = target.files[0]
      const url = URL.createObjectURL(file)
      const type = file.type.startsWith('video') ? 'video' : 'image'
      setMedia({ type, url })
    }
  }

  useEffect(() => {
    if (state.ok) {
      setMedia(null)
      alert('Banner cadastrado com sucesso!')
    }
  }, [state])

  return (
    <form className="space-y-5 flex flex-col text-black my-5" action={action}>
      <Link href="/" className="flex items-center">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputComponent
        type="text"
        label="Veículo"
        name="veiculo"
        id="veiculo"
        placeholder="Por default OUTRO"
        required={false}
      />
      <InputComponent
        type="text"
        label="Dimensão"
        name="dimensao"
        id="dimensao"
        placeholder="Por default INDETERMINADO"
        required={false}
      />
      <InputComponent
        type="text"
        label="Tempo"
        name="tempo"
        id="tempo"
        placeholder="Por default INDETERMINADO"
        required={false}
      />
      <InputComponent
        type="number"
        label="Looping"
        name="looping"
        id="looping"
        placeholder="Por default INDETERMINADO"
        required={false}
      />
      <InputComponent
        type="text"
        label="Tipo"
        name="tipo"
        id="tipo"
        placeholder="Por default DESENVOLVIMENTO"
        required={false}
      />
      <InputComponent
        type="text"
        label="Status do banner"
        name="statusBanner"
        id="statusBanner"
        placeholder="Por default AGURDANDO APROVAÇÃO"
        required={false}
      />
      <div className="flex flex-col text-black">
        <label htmlFor="nameMidia">
          Mídia <span className="text-xs text-red-600"> *</span>
        </label>
        <input
          type="file"
          name="nameMidia"
          id="nameMidia"
          onChange={handleMediaChange}
          className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
        />
      </div>
      {media && (
        <>
          {media.type === 'image' ? (
            <Image src={media.url} alt="Imagem" width={300} height={300} />
          ) : (
            <video width="300" height="300" controls>
              <source src={media.url} type="video/webm" />
              <source src={media.url} type="video/mp4" />
              Seu navegador não suporta a exibição de vídeos.
            </video>
          )}
        </>
      )}
      {state.error && <p className="text-xs text-red-600">{state.error}</p>}
      <FormButton />
    </form>
  )
}
