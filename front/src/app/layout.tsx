import type { Metadata } from 'next'
import './globals.css'
import { fontBody } from './font'
import { HeaderOn } from '@/components/head/navOn'
import { HeaderOff } from '@/components/head/navOff'
import { cookies } from 'next/headers'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export const metadata: Metadata = {
  title: 'Banner app',
  description: 'Show project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = cookies().get('token')?.value
  const authentication =
    token !== undefined && token.length >= 49 && token.length <= 53
  return (
    <html lang="pt-br" className={fontBody.className}>
      <body className="antialiased scroll-smooth">
        {authentication ? <HeaderOn /> : <HeaderOff />}
        <ReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        >
          <div className="max-w-[1200px] mx-auto">{children}</div>
        </ReCaptchaProvider>
      </body>
    </html>
  )
}
