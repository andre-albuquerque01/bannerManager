import { GetAllBanner } from '@/action/banner/get'
import { GetBusiness } from '@/action/business/get'
import { TableComponent } from '@/components/banner/table'
import LinkPagination from '@/components/pagination/pagination'
import { BannerInterface } from '@/data/type/banner'
import { BusinessInterface } from '@/data/type/business'
import { cookies } from 'next/headers'
import Link from 'next/link'

interface SearchParamsProps {
  searchParams: {
    page: number
  }
}

export default async function Home({ searchParams }: SearchParamsProps) {
  let { page } = searchParams || 1
  if (!page) page = 1

  const dt = await GetAllBanner(page)
  const data = dt.data as BannerInterface[]
  const { countPage, perPage, totalItems } = dt

  const token = cookies().get('token')?.value
  const authenticated =
    token !== undefined && token.length >= 49 && token.length <= 53

  const business = (await GetBusiness()) as BusinessInterface

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-zinc-800 mb-4">
          Informações da Campanha
        </h2>
        {business ? (
          <>
            <p>
              <strong>Campanha:</strong> {business.campanha}
            </p>
            <p>
              <strong>Cliente:</strong> {business.cliente}
            </p>
            <p>
              <strong>Agência:</strong> {business.agencia}
            </p>
          </>
        ) : (
          <p>
            <strong>Nenhuma campanha ativa no momento.</strong>
          </p>
        )}
      </div>

      {authenticated && (
        <div className="mb-6">
          <Link
            href="/banner/insert"
            className="px-6 py-2 rounded-lg bg-blue-600 border-none text-white transition duration-300 hover:bg-blue-800"
          >
            Inserir Banner
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 bg-yellow-400 border border-yellow-500 rounded-sm"></span>
          <span>Réplica</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 bg-green-400 border border-green-500 rounded-sm"></span>
          <span>Desenvolvimento</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 bg-cyan-400 border border-cyan-500 rounded-sm"></span>
          <span>Adaptação</span>
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
  )
}
