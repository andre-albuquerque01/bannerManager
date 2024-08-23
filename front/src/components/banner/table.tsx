'use client'
import { BannerInterface } from '@/data/type/banner'
import { DeleteBannerComponent } from './deleteBanner'
import { Eye, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DownLoadImageComponent } from './downLoadImage'

export const TableComponent = ({
  data,
  authenticated,
}: {
  data: BannerInterface[]
  authenticated: boolean
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const getMediaType = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    const videoExtensions = ['mp4', 'webm', 'ogg']
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']

    if (videoExtensions.includes(extension || '')) {
      return 'video'
    } else if (imageExtensions.includes(extension || '')) {
      return 'image'
    } else {
      return null
    }
  }

  return (
    <div className="font-normal overflow-x-auto">
      <div className="bg-zinc-800 text-white">
        <table className="text-center border-collapse border">
          <thead>
            <tr className="border bg-zinc-500 text-sm font-semibold">
              <th className="px-2 py-2 border">Item</th>
              <th className="px-2 py-2 border">Ver</th>
              <th className="px-2 py-2 border">Linha Criativa</th>
              <th className="px-2 py-2 border">Veículo</th>
              <th className="px-2 py-2 border">Dimensão</th>
              <th className="px-2 py-2 border">Peso</th>
              <th className="px-2 py-2 border">Looping</th>
              <th className="px-2 py-2 border">Tempo</th>
              <th className="px-2 py-2 border">Complexidade</th>
              <th className="px-2 py-2 border">Tipo</th>
              <th className="px-2 py-2 border">Status</th>
              {authenticated && <th className="px-2 py-2 border">#</th>}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((banner, index) => {
                const bgColor =
                  banner.tipo === 'Desenvolvimento'
                    ? 'bg-green-500'
                    : banner.tipo === 'Adaptação'
                      ? 'bg-cyan-300'
                      : banner.tipo === 'Réplica'
                        ? 'bg-yellow-500'
                        : ''

                const mediaType = getMediaType(banner.nameMidia)
                const position = index + 1
                const fileName = banner.nameMidia.split('.', 1)

                return (
                  <React.Fragment key={index}>
                    <tr className="border bg-white text-black">
                      <td className={`px-2 py-2 border ${bgColor}`}>
                        {position}
                      </td>
                      <td className="px-2 py-2 border" title="Ver o mídia">
                        <button
                          onClick={() =>
                            setExpandedIndex(
                              expandedIndex === index ? null : index,
                            )
                          }
                        >
                          <Eye size={20} className="hover:text-blue-400" />
                        </button>
                      </td>
                      <td className="px-2 py-2 border">{fileName}</td>
                      <td className="px-2 py-2 border">{banner.veiculo}</td>
                      <td className="px-2 py-2 border">{banner.dimensao}</td>
                      <td className="px-2 py-2 border">{banner.tamanho}</td>
                      <td className="px-2 py-2 border">{banner.looping}</td>
                      <td className="px-2 py-2 border">{banner.tempo}</td>
                      <td className="px-2 py-2 border">
                        {banner.complexidade}
                      </td>
                      <td className="px-2 py-2 border">{banner.tipo}</td>
                      <td className="px-2 py-2 border">
                        {banner.statusBanner ?? 'Aguardando Aprovação'}
                      </td>
                      {authenticated && (
                        <td className="p-2 flex flex-col items-center gap-2 justify-center">
                          <Link
                            href={`banner/update/${banner.idBanner}`}
                            className="text-blue-500 hover:underline"
                          >
                            <Pencil size={20} />
                          </Link>
                          <DeleteBannerComponent id={banner.idBanner} />
                        </td>
                      )}
                    </tr>
                    {expandedIndex === index && mediaType && (
                      <tr className="bg-white" key={index}>
                        <td
                          colSpan={authenticated ? 12 : 11}
                          className="px-2 py-2"
                        >
                          {mediaType === 'video' ? (
                            <>
                              <video
                                width="800"
                                height="800"
                                className="w-auto p-4 h-auto mt-2"
                                controls
                              >
                                <source
                                  src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/${banner.nameMidia}`}
                                  type="video/mp4"
                                />
                                <source
                                  src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/${banner.nameMidia}`}
                                  type="video/webm"
                                />
                                <source
                                  src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/${banner.nameMidia}`}
                                  type="video/ogg"
                                />
                                Seu navegador não suporta a exibição de vídeos.
                              </video>
                            </>
                          ) : (
                            <Image
                              width={800}
                              height={800}
                              src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/${banner.nameMidia}`}
                              alt="Imagem"
                              className="w-auto p-4 h-auto mt-2"
                            />
                          )}
                          <DownLoadImageComponent
                            id={banner.idBanner}
                            fileExtension={banner.complexidade}
                            fileName={fileName}
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
