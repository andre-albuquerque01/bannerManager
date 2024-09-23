'use server'

import ApiRoute from '@/data/apiRoute'
import VerificationPassword from '@/data/function/validatePassword'
import { ApiErrorResponse } from '@/data/type/apiErrorResponse'
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

    const response = await ApiRoute('/userStore', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data: ApiErrorResponse = await response.json()

    if (data.errors) {
      const errors = data.errors

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [field, messages] of Object.entries(errors)) {
        messages.forEach((message) => {
          if (message === 'The email has already been taken.') {
            throw new Error('E-mail já cadastrado!')
          } else if (message === 'The email field is required.') {
            throw new Error('O campo email é obrigatório.')
          } else if (message === 'The name field is required.') {
            throw new Error('O campo nome é obrigatório.')
          } else if (message === 'The password field is required.') {
            throw new Error('O campo senha é obrigatório.')
          } else if (
            message === 'The password confirmation field is required.'
          ) {
            throw new Error('O campo repita senha é obrigatório.')
          } else if (
            message === 'The password field must be at least 8 characters.'
          ) {
            throw new Error('A senha deve ter ao menos 8 caracteres.')
          } else if (
            message === 'The password field must contain at least one symbol.'
          ) {
            throw new Error('A senha precisa de um caracter especial.')
          } else if (
            message ===
            'The password field must contain at least one uppercase and one lowercase letter.'
          ) {
            throw new Error(
              'Senha precisa de ao menos uma letra maiúscula e uma minúsculas.',
            )
          } else if (
            message ===
            'The given password has appeared in a data leak. Please choose a different password.'
          ) {
            throw new Error('Senha fraca.')
          }
        })
      }
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Desculpe, ocorreu um erro ao cadastrar.\n Por favor, tente novamente mais tarde.'

    return {
      data: null,
      error: errorMessage,
      ok: false,
    }
  }
  revalidateTag('user')
  redirect('/user/login')
}
