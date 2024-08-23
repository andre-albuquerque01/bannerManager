import { InsertBannerComponent } from '@/components/banner/insertBanner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Insert banner',
  },
}

export default function InsertBanner() {
  return (
    <div className="flex justify-center items-center">
      <InsertBannerComponent />
    </div>
  )
}
