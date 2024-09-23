'use server'

import ApiRoute from '@/data/apiRoute'
import { ApiErrorResponse } from '@/data/type/apiErrorResponse'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function UpdateBanner(request: FormData, idBanner: string) {
  const reqBody = Object.fromEntries(request)
  try {
    if (
      !reqBody.title ||
      !reqBody.urlMidia ||
      !reqBody.extensionMidia ||
      !reqBody.tamanho
    ) {
      return 'Preencha os campos necessários'
    }
    const response = await ApiRoute(`/banner/${idBanner}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })
    revalidateTag('banner')

    const data: ApiErrorResponse = await response.json()

    if (data.errors) {
      const errors = data.errors

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [field, messages] of Object.entries(errors)) {
        messages.forEach((message) => {
          if (message === 'The extension midia field is required.') {
            return 'Necessário a extensão'
          } else if (message === 'The url midia field is required.') {
            return 'Necessário a URL da imagem'
          } else if (message === 'The name midia field is required.') {
            return 'Necessário o título'
          } else if (message === 'Unauthenticated.') redirect('/user/login')
        })
      }
    }

    return ''
  } catch (error) {
    return 'Desculpe, ocorreu um erro ao alterar.\n Por favor, tente novamente mais tarde.'
  }
}
