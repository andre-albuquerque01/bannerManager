'use server'

import ApiRoute from '@/data/apiRoute'

export async function SendEmail(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null

  try {
    if (!email) {
      throw new Error('Preenchas os dados!')
    }
    const response = await ApiRoute('/sendTokenRecover', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    if (data.data.message === 'user not found')
      throw new Error('E-mail não cadastrado!')

    return { data: null, error: '', ok: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Desculpe, ocorreu um erro ao enviar o e-mail.\n Por favor, tente novamente mais tarde.'

    return {
      data: null,
      error: errorMessage,
      ok: false,
    }
  }
}
