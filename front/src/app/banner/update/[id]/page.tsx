import { GetOneBanner } from '@/action/banner/getOne'
import { UpdateBannerComponent } from '@/components/banner/updateBanner'
import { BannerInterface } from '@/data/type/banner'

export default async function UpdateBanner({
  params,
}: {
  params: { id: string }
}) {
  const data = (await GetOneBanner(params.id)) as BannerInterface

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <UpdateBannerComponent data={data} id={params.id} />
    </div>
  )
}
