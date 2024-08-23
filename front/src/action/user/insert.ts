'use server'

import ApiRoute from '@/data/apiRoute'
import apiError from '@/data/function/apiErro'
import VerificationPassword from '@/data/function/validatePassword'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function InsertUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const name = request.get('name') as string | null
  const email = request.get('email') as string | null
  const password = request.get('password') as string | null
  const passwordConfirmation = request.get('password_confirmation') as
    | string
    | null

  try {
    if (!name || !email || !password || !passwordConfirmation) {
      throw new Error('Preenchas os dados!')
    }
    if (password !== passwordConfirmation) {
      throw new Error('Senha incompativel!')
    }
    VerificationPassword(password)

    const response = await ApiRoute('/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()
    const message =
      data && data.data && typeof data.data.message === 'string'
        ? data.data.message
        : JSON.stringify(data?.data?.message || '')

    if (message && message.includes('The email has already been taken.'))
      throw new Error('E-mail já cadastrado!')
    if (
      message &&
      message.includes('The password field must be at least 8 characters.')
    )
      throw new Error('A senha deve ter ao menos 8 caracters')
    if (
      message &&
      message.includes('The password field must contain at least one symbol.')
    )
      throw new Error('A senha precisa de um caracter especial')
    if (
      message &&
      message.includes(
        'The password field must contain at least one uppercase and one lowercase letter.',
      )
    )
      throw new Error(
        'Senha precisa de ao menos uma letra maisucla e uma minisucla',
      )
    if (
      message &&
      message.includes(
        'The given password has appeared in a data leak. Please choose a different password.',
      )
    )
      throw new Error('Senha fraca.')
  } catch (error) {
    return apiError(error)
  }
  revalidateTag('user')
  redirect('/user/login')
}
