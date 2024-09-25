'use client'
import { BannerInterface } from '@/data/type/banner'
import { DeleteBannerComponent } from './deleteBanner'
import { Eye, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'
import { ExtractDriveId } from '@/data/function/extractDriveId'
import Image from 'next/image'
import { GetMediaType } from '@/data/function/getMediaType'

export const TableComponent = ({
  data,
  authenticated,
}: {
  data: BannerInterface[]
  authenticated: boolean
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-center border-collapse border">
        <thead>
          <tr className="border bg-zinc-700 text-sm font-semibold text-white">
            <th className="px-4 py-2 border">Item</th>
            <th className="px-4 py-2 border">Ver</th>
            <th className="px-4 py-2 border">Linha Criativa</th>
            <th className="px-4 py-2 border">Veículo</th>
            <th className="px-4 py-2 border">Dimensão</th>
            <th className="px-4 py-2 border">Peso</th>
            <th className="px-4 py-2 border">Tempo</th>
            <th className="px-4 py-2 border">Complexidade</th>
            <th className="px-4 py-2 border">Status</th>
            {authenticated && <th className="px-4 py-2 border">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((banner, index) => {
              const bgColor =
                banner.tipo === 'Desenvolvimento' ||
                banner.tipo === 'desenvolvimento'
                  ? 'bg-green-500'
                  : banner.tipo === 'Adaptação' || banner.tipo === 'adaptação'
                    ? 'bg-cyan-300'
                    : banner.tipo === 'Réplica' || banner.tipo === 'réplica'
                      ? 'bg-yellow-500'
                      : ''

              const position = index + 1
              const idImage = ExtractDriveId(banner.urlMidia)
              const mediaType = GetMediaType(banner.extensionMidia)

              return (
                <React.Fragment key={index}>
                  <tr className="border bg-white text-black">
                    <td className={`px-4 py-2 border ${bgColor}`}>
                      {position}
                    </td>
                    <td className="px-4 py-2 border">
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
                    <td className="px-4 py-2 border">{banner.title}</td>
                    <td className="px-4 py-2 border">{banner.veiculo}</td>
                    <td className="px-4 py-2 border">{banner.dimensao}</td>
                    <td className="px-4 py-2 border">{banner.tamanho}</td>
                    <td className="px-4 py-2 border">{banner.tempo}</td>
                    <td className="px-4 py-2 border uppercase">
                      {banner.extensionMidia}
                    </td>
                    <td className="px-4 py-2 border">{banner.statusBanner}</td>
                    {authenticated && (
                      <td className="px-4 py-2 flex flex-col items-center gap-2">
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
                  {expandedIndex === index && banner.urlMidia && (
                    <tr className="bg-white" key={`expanded-${index}`}>
                      <td
                        colSpan={authenticated ? 10 : 9}
                        className="px-4 py-2"
                      >
                        {idImage ? (
                          <iframe
                            src={`https://drive.google.com/file/d/${idImage}/preview`}
                            width="800"
                            height="660"
                            allow="autoplay"
                          ></iframe>
                        ) : mediaType === 'video' ? (
                          <video
                            className="w-full max-w-full h-auto p-4 mt-2"
                            controls
                          >
                            <source
                              src={banner.urlMidia}
                              type={`video/${banner.extensionMidia}`}
                            />
                            Seu navegador não suporta a exibição de vídeos.
                          </video>
                        ) : (
                          <Image
                            width={800}
                            height={800}
                            src={banner.urlMidia}
                            alt="Imagem"
                            className="w-full max-w-full h-auto p-4 mt-2"
                          />
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })
          ) : (
            <tr>
              <td colSpan={authenticated ? 10 : 9} className="px-4 py-4">
                Nenhum banner encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
