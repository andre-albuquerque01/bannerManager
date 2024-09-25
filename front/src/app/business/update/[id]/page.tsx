import { GetOneBusiness } from '@/action/business/getOne'
import { UpdateBusinessComponent } from '@/components/business/updateBusiness'
import { BusinessInterface } from '@/data/type/business'

export default async function UpdateBusiness({
  params,
}: {
  params: { id: string }
}) {
  const data = (await GetOneBusiness(params.id)) as BusinessInterface

  return (
    <div className="flex justify-center items-center h-screen mt-[-80px]">
      <UpdateBusinessComponent data={data} id={params.id} />
    </div>
  )
}
