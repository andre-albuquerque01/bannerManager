'use client'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { useState } from 'react'
import { InsertBanner } from '@/action/banner/insert'
import { ArrowLeft } from 'lucide-react'
import { InputComponent } from '../form/input'
import { ExtractDriveId } from '@/data/function/extractDriveId'
import Image from 'next/image'

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

  const [media, setMedia] = useState<string | undefined>()
  const [extension, setExtension] = useState<string>('')
  const idImage = ExtractDriveId(media)

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
      <InputComponent
        type="text"
        label="Tamanho da mídia"
        name="tamanho"
        id="tamanho"
        placeholder="Tamanho da mídia"
        required={true}
      />
      <InputComponent
        type="text"
        label="Título"
        name="title"
        id="title"
        placeholder="Título da mídia"
        required={true}
      />
      <div className="flex flex-col text-black">
        <label htmlFor="extensionMidia">
          Extensão da mídia
          <span className="text-xs text-red-600"> *</span>
        </label>
        <select
          name="extensionMidia"
          id="extensionMidia"
          className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
          onChange={(e) => setExtension(e.target.value)}
          value={extension}
          required
        >
          <option>Selecione uma extensão</option>
          <option value="JPG">JPG</option>
          <option value="PNG">PNG</option>
          <option value="GIF">GIF</option>
          <option value="MP4">MP4</option>
          <option value="WEBM">WEBM</option>
        </select>
      </div>
      <div className="flex flex-col text-black">
        <label htmlFor="urlMidia">
          Url da mídia
          <span className="text-xs text-red-600"> *</span>
        </label>
        <input
          type="text"
          name="urlMidia"
          id="urlMidia"
          className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
          onChange={(e) => setMedia(e.target.value)}
          required
        />
      </div>

      {media && extension && (
        <>
          {!idImage ? (
            ['JPG', 'PNG', 'GIF'].includes(extension) ? (
              <Image src={media} alt="Imagem" width={300} height={300} />
            ) : (
              <video width="300" height="300" controls>
                <source src={media} type={`video/${extension}`} />
                Seu navegador não suporta a exibição de vídeos.
              </video>
            )
          ) : (
            <iframe
              src={`https://drive.google.com/file/d/${idImage}/preview`}
              width="320"
              height="160"
              allow="autoplay"
            ></iframe>
          )}
        </>
      )}

      {state.error && <p className="text-xs text-red-600">{state.error}</p>}
      <FormButton />
    </form>
  )
}
