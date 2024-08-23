import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Update banner',
  },
}
export default function BannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="max-w-[1200px] mx-auto">{children}</div>
}
