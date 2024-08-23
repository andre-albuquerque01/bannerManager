import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Banner app',
  description: 'Show project',
}

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="max-w-[1200px] mx-auto">{children}</div>
}
