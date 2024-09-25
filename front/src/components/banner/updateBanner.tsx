'use client'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { UpdateBanner } from '@/action/banner/update'
import { BannerInterface } from '@/data/type/banner'
import { InputUpdateComponent } from '../form/inputUpdate'
import { useRouter } from 'next/navigation'
import { ExtractDriveId } from '@/data/function/extractDriveId'

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

export const UpdateBannerComponent = ({
  data,
  id,
}: {
  data: BannerInterface | undefined
  id: string
}) => {
  const router = useRouter()
  const [media, setMedia] = useState<string>(data?.urlMidia || '')
  const [extension, setExtension] = useState<string>(data?.extensionMidia || '')
  const [status, setStatus] = useState<boolean>(false)
  const [returnError, setReturnError] = useState<string>('')
  const idImage = ExtractDriveId(media)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    setReturnError('')
    const formData = new FormData(e.currentTarget)
    const req = await UpdateBanner(formData, id)
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
      <Link href="/" className="flex items-center">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputUpdateComponent
        type="text"
        label="Veículo"
        name="veiculo"
        id="veiculo"
        value={data?.veiculo ?? ''}
        required={false}
      />
      <InputUpdateComponent
        type="text"
        label="Dimensão"
        name="dimensao"
        id="dimensao"
        value={data?.dimensao ?? ''}
        required={false}
      />
      <InputUpdateComponent
        type="text"
        label="Tempo"
        name="tempo"
        id="tempo"
        value={data?.tempo ?? ''}
        required={false}
      />
      <InputUpdateComponent
        type="text"
        label="Tamanho da mídia"
        name="tamanho"
        id="tamanho"
        value={data?.tamanho ?? ''}
        required={false}
      />
      <InputUpdateComponent
        type="text"
        label="Tipo"
        name="tipo"
        id="tipo"
        value={data?.tipo ?? ''}
        required={false}
      />
      <InputUpdateComponent
        type="text"
        label="Status do banner"
        name="statusBanner"
        id="statusBanner"
        value={data?.statusBanner ?? ''}
        required={false}
      />
      <InputUpdateComponent
        type="text"
        label="Título"
        name="title"
        id="title"
        value={data?.title ?? ''}
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
          value={data?.extensionMidia}
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
          defaultValue={data?.urlMidia}
          className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
          onChange={(e) => setMedia(e.target.value)}
          value={media}
          required
        />
      </div>
      {returnError && <p className="text-xs text-red-600">{returnError}</p>}
      <BtnForm pending={status} />

      <div className="flex flex-col text-black">
        {media !== data?.urlMidia ? (
          idImage ? (
            <iframe
              key={`iframe-${media}`}
              src={`https://drive.google.com/file/d/${idImage}/preview`}
              width="320"
              height="160"
              allow="autoplay"
            ></iframe>
          ) : ['JPG', 'PNG', 'GIF'].includes(extension.toUpperCase()) ? (
            <Image
              key={`image-${media}`}
              src={media}
              alt="Nova mídia"
              width={300}
              height={300}
            />
          ) : (
            <video key={`video-${media}`} width="300" height="300" controls>
              <source src={media} type={`video/${extension.toLowerCase()}`} />
              Seu navegador não suporta a exibição de vídeos.
            </video>
          )
        ) : (
          <>
            {idImage ? (
              <iframe
                key={`iframe-${data?.urlMidia}`}
                src={`https://drive.google.com/file/d/${idImage}/preview`}
                width="320"
                height="160"
                allow="autoplay"
              ></iframe>
            ) : ['JPG', 'PNG', 'GIF'].includes(extension.toUpperCase()) ? (
              <Image
                key={`image-${data?.urlMidia}`}
                src={data?.urlMidia || ''}
                alt="Mídia atual"
                width={300}
                height={300}
              />
            ) : (
              <video
                key={`video-${data?.urlMidia}`}
                width="300"
                height="300"
                controls
              >
                <source
                  src={data?.urlMidia || ''}
                  type={`video/${extension.toLowerCase()}`}
                />
                Seu navegador não suporta a exibição de vídeos.
              </video>
            )}
          </>
        )}
      </div>
    </form>
  )
}
