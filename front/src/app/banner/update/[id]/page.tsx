'use client'
import { GetOneBanner } from '@/action/banner/getOne'
import { UpdateBannerComponent } from '@/components/banner/updateBanner'
import { BannerInterface } from '@/data/type/banner'
import { useEffect, useState } from 'react'

export default function UpdateBanner({ params }: { params: { id: string } }) {
  const [data, setData] = useState<BannerInterface>()
  useEffect(() => {
    const handleData = async () => {
      const data = (await GetOneBanner(params.id)) as BannerInterface
      setData(data)
    }
    handleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <UpdateBannerComponent data={data} />
    </div>
  )
}
