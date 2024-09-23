'use server'

import ApiRoute from '@/data/apiRoute'
import { ApiErrorResponse } from '@/data/type/apiErrorResponse'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function InsertBanner(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const title = request.get('title') as string | null
  const extensionMidia = request.get('extensionMidia') as string | null
  const urlMidia = request.get('urlMidia') as string | null
  const tamanho = request.get('tamanho') as string | null

  const fields = ['veiculo', 'dimensao', 'tempo', 'statusBanner', 'tipo']

  fields.forEach((field) => {
    if (request.get(field) === '') {
      request.delete(field)
    }
  })

  try {
    if (!title || !urlMidia || !extensionMidia || !tamanho) {
      throw new Error('Preencha os campos necessários')
    }

    const response = await ApiRoute('/banner', {
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
          if (message === 'The extension midia field is required.') {
            throw new Error('Necessário a extensão')
          } else if (message === 'The url midia field is required.') {
            throw new Error('Necessário a URL da imagem')
          } else if (message === 'The name midia field is required.') {
            throw new Error('Necessário o título')
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

  revalidateTag('banner')
  redirect('/')
}
