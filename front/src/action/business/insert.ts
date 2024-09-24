'use server'

import ApiRoute from '@/data/apiRoute'
import { ApiErrorResponse } from '@/data/type/apiErrorResponse'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function InsertBusiness(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const campanha = request.get('campanha') as string | null
  const cliente = request.get('cliente') as string | null
  const agencia = request.get('agencia') as string | null
  const destaque = request.get('destaque') === 'on' ? 1 : 0
  request.set('destaque', String(destaque))

  try {
    if (!campanha || !agencia || !cliente) {
      throw new Error('Preencha os campos necessários')
    }

    const response = await ApiRoute('/business', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: request,
    })

    const data: ApiErrorResponse = await response.json()

    if (data.errors) {
      const errors = data.errors

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [field, messages] of Object.entries(errors)) {
        messages.forEach((message) => {
          if (message === 'The campanha field is required.') {
            throw new Error('Necessário a campanha')
          } else if (message === 'The cliente field is required.') {
            throw new Error('Necessário o cliente')
          } else if (message === 'The agencia field is required.') {
            throw new Error('Necessário a agência')
          } else if (message === 'Unauthenticated.') redirect('/user/login')
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

  revalidateTag('business')
  redirect('/business')
}
