import { GetAllBanner } from '@/action/banner/get'
import { TableComponent } from '@/components/banner/table'
import LinkPagination from '@/components/pagination/pagination'
import { BannerInterface } from '@/data/type/banner'
import { cookies } from 'next/headers'

import Link from 'next/link'

interface SearchParamsProps {
  searchParams: {
    page: number
  }
}

export default async function Home({ searchParams }: SearchParamsProps) {
  let { page } = searchParams || 1
  if (page === undefined) page = 1
  const dt = await GetAllBanner(page)
  const data = dt.data as BannerInterface[]
  const countPage = dt.countPage
  const perPage = dt.perPage
  const totalItems = dt.totalItems

  const token = cookies().get('token')?.value
  const authenticated =
    token !== undefined && token.length >= 49 && token.length <= 53

  return (
    <div className="mx-auto max-w-[1200px] my-10">
      <div className="max-md:p-4">
        <div className="">
          {authenticated && (
            <div className="flex justify-start my-5">
              <Link
                href="banner/insert"
                className="inline-block px-4 py-2 rounded-md bg-zinc-500 text-white transition duration-500 hover:bg-zinc-900"
              >
                Inserir banner
              </Link>
            </div>
          )}
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="border border-yellow-500 bg-yellow-400 w-5 h-5 rounded-sm"></div>
              Réplica
            </div>
            <div className="flex items-center gap-1">
              <div className="border border-green-500 bg-green-400 w-5 h-5 rounded-sm"></div>
              Desenvolvimento
            </div>
            <div className="flex items-center gap-1">
              <div className="border border-cyan-500 bg-cyan-400 w-5 h-5 rounded-sm"></div>
              Adaptação
            </div>
          </div>
          <TableComponent data={data} authenticated={authenticated} />
          <LinkPagination
            query={page}
            countPage={countPage}
            itemsPerPage={perPage}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  )
}
