import { Roboto } from 'next/font/google'

export const fontBody = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})
