'use server'

import ApiRoute from '@/data/apiRoute'
import apiError from '@/data/function/apiErro'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function UpdateBanner(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const nameMidia = request.get('nameMidia') as string | null
  const idBanner = request.get('idBanner') as string | null
  try {
    if (!nameMidia || !idBanner) throw new Error('Necessário a imagem')

    const response = await ApiRoute(`/banner/update/${idBanner}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })
    const data = await response.json()

    revalidateTag('banner')
    if (data.data && data.data.message === 'The name midia field is required.')
      throw new Error('Necessário a imagem')

    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
