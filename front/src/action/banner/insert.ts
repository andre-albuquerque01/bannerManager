'use server'

import ApiRoute from '@/data/apiRoute'
import apiError from '@/data/function/apiErro'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function InsertBanner(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const nameMidia = request.get('nameMidia') as string | null

  const fields = ['veiculo', 'dimensao', 'looping', 'tempo', 'tipo', 'status']

  fields.forEach((field) => {
    if (request.get(field) === '') {
      request.delete(field)
    }
  })

  try {
    if (!nameMidia) {
      throw new Error('Necessário a imagem')
    }

    const response = await ApiRoute('/banner', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: request,
    })

    const data = await response.json()
    if (data.data && data.data.message === 'The name midia field is required.')
      throw new Error('Necessário a imagem')
  } catch (error) {
    return apiError(error)
  }

  revalidateTag('banner')
  redirect('/')
}
