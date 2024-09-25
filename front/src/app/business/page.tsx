import { GetAllBusiness } from '@/action/business/getAll'
import { CardBusinessComponent } from '@/components/business/table'
import Link from 'next/link'

export default async function Home() {
  const data = await GetAllBusiness()

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-zinc-800">Campanhas</h1>
        <Link
          href="/business/insert"
          className="px-6 py-2 rounded-lg bg-blue-600 border-none text-white transition duration-300 hover:bg-blue-800"
        >
          Inserir campanha
        </Link>
      </div>

      {data && data.length > 0 ? (
        <CardBusinessComponent data={data} />
      ) : (
        <p className="text-center text-zinc-500">Nenhuma empresa encontrada.</p>
      )}
    </div>
  )
}
