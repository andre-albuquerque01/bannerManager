'use client'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { UpdateBanner } from '@/action/banner/update'
import { BannerInterface } from '@/data/type/banner'
import { InputUpdateComponent } from '../form/inputUpdate'
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

export const UpdateBannerComponent = ({
  data,
}: {
  data: BannerInterface | undefined
}) => {
  const [state, action] = useFormState(UpdateBanner, {
    ok: false,
    error: '',
    data: null,
  })
  const router = useRouter()
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
      alert('Alterado com sucesso!')
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <form className="space-y-5 flex flex-col text-black my-5" action={action}>
      <Link href="/" className="flex items-center">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <input type="hidden" name="idBanner" defaultValue={data?.idBanner} />
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
        label="Looping"
        name="looping"
        id="looping"
        value={data?.looping ?? ''}
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
      <div className="flex flex-col text-black">
        <label htmlFor="nameMidia">
          Mídia atual: <span className="text-xs text-red-600"> </span>
        </label>
        {data?.complexidade === 'MP4' ? (
          <video width="300" height="300" controls>
            <source
              src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/${data?.nameMidia}`}
              type="video/webm"
            />
            <source
              src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/${data?.nameMidia}`}
              type="video/mp4"
            />
            Seu navegador não suporta a exibição de vídeos.
          </video>
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/${data?.nameMidia}`}
            alt="Imagem"
            width={300}
            height={300}
          />
        )}
      </div>
      {state.error && <p className="text-xs text-red-600">{state.error}</p>}
      <FormButton />
    </form>
  )
}
