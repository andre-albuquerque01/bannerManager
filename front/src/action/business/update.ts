'use server'

import ApiRoute from '@/data/apiRoute'
import { ApiErrorResponse } from '@/data/type/apiErrorResponse'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function UpdateBusiness(request: FormData, idBusiness: string) {
  const destaque = request.get('destaque') === 'on' ? 1 : 0
  request.set('destaque', String(destaque))
  const reqBody = Object.fromEntries(request)
  try {
    if (!reqBody.campanha || !reqBody.cliente || !reqBody.agencia) {
      return 'Preencha os campos necessários'
    }
    const response = await ApiRoute(`/business/${idBusiness}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })
    revalidateTag('business')
    const data: ApiErrorResponse = await response.json()

    if (data.errors) {
      const errors = data.errors

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [field, messages] of Object.entries(errors)) {
        messages.forEach((message) => {
          if (message === 'The campanha field is required.') {
            return 'Necessário a campanha'
          } else if (message === 'The cliente field is required.') {
            return 'Necessário o cliente'
          } else if (message === 'The agencia field is required.') {
            return 'Necessário a agência'
          } else if (message === 'Unauthenticated.') redirect('/user/login')
        })
      }
    }

    return ''
  } catch (error) {
    return 'Desculpe, ocorreu um erro ao alterar.\n Por favor, tente novamente mais tarde.'
  }
}
