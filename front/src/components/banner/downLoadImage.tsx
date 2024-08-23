'use client'
import ApiRoute from '@/data/apiRoute'
import { Download } from 'lucide-react'

export const DownLoadImageComponent = ({
  id,
  fileExtension,
  fileName,
}: {
  id: string
  fileExtension: string
  fileName: string[]
}) => {
  const handleDownload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()

    const response = await ApiRoute(`/downLoadImage/${id}`)
    if (!response.ok) {
      console.error('Erro ao baixar a imagem')
      return
    }
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${fileName}.${fileExtension.toLowerCase()}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 transition duration-500 hover:bg-blue-300 cursor-pointer rounded"
      title="Baixar mídia"
    >
      <Download size={20} /> Download
    </button>
  )
}
