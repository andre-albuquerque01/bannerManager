'use client'
import { Download } from 'lucide-react'

export const DownloadImageComponent = ({ urlMidia }: { urlMidia: string }) => {
  const handleDownload = (url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'media-file')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <a
      onClick={() => handleDownload(urlMidia)}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 transition duration-500 hover:bg-blue-300 cursor-pointer rounded"
      title="Baixar mídia"
    >
      <Download size={20} /> Download
    </a>
  )
}
