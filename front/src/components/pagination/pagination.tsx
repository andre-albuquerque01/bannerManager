import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PropsPagination {
  query: number
  countPage: number
  totalItems: number
  itemsPerPage: number
}

export default function LinkPagination({
  query,
  countPage,
  totalItems,
  itemsPerPage,
}: PropsPagination) {
  const startItem = (query - 1) * itemsPerPage + 1
  const endItem = Math.min(query * itemsPerPage, totalItems)

  return (
    <div className="mt-2 flex justify-end items-center gap-2 text-sm text-gray-500">
      <div className="flex gap-2">
        {startItem}-{endItem} de {totalItems}
        {query > 1 ? (
          <Link
            href={`?page=${query - 1}`}
            className="transition duration-500"
            title="Anterior"
          >
            <ChevronLeft size={20} />
          </Link>
        ) : (
          <ChevronLeft size={20} className="cursor-not-allowed text-zinc-400" />
        )}
        {query < countPage ? (
          <Link
            href={`?page=${Number(query) + 1}`}
            className="transition duration-500 text-zinc-900 font-black"
            title="Próximo"
          >
            <ChevronRight size={20} className="font-black" />
          </Link>
        ) : (
          <ChevronRight
            size={20}
            className="cursor-not-allowed text-zinc-400"
          />
        )}
      </div>
    </div>
  )
}
