'use server'

import ApiRoute from '@/data/apiRoute'
import apiError from '@/data/function/apiErro'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function LoginUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null
  const password = request.get('password') as string | null
  try {
    if (!email || !password) {
      throw new Error('Preenchas os dados!')
    }
    const cookiesStore = cookies()

    const response = await ApiRoute('/login', {
      method: 'POST',
      body: request,
    })

    const data = await response.json()

    if (!response.ok) {
      return { data: null, error: 'Error', ok: false }
    }

    cookiesStore.set('token', data.data.token, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    })
  } catch (error) {
    return apiError(error)
  }

  redirect('/')
}
