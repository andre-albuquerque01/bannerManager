'use server'

import ApiRoute from '@/data/apiRoute'
import VerificationPassword from '@/data/function/validatePassword'

interface UpdatePasswordRequestInterface {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export async function RecoverUpdatePassword(
  requestBody: UpdatePasswordRequestInterface,
) {
  try {
    if (
      !requestBody.token ||
      !requestBody.password ||
      !requestBody.password_confirmation
    ) {
      return 'Preencha os dados!'
    }
    if (requestBody.password !== requestBody.password_confirmation) {
      return 'Senhas incompatíveis!'
    }
    VerificationPassword(requestBody.password)

    const response = await ApiRoute(`/resetPassword`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    let text = ''
    switch (data) {
      case data.data.message ===
        'The password field must be at least 8 characters.':
        text = 'A senha deve ter ao menos 8 caracteres'
        break
      case data.data.message ===
        'The password field must contain at least one symbol.':
        text = 'A senha precisa de um caractere especial'
        break
      case data.data.message ===
        'The password field must contain at least one uppercase and one lowercase letter.':
        text = 'A senha precisa de ao menos uma letra maiúscula e uma minúscula'
        break
      case data.data.message ===
        'The given password has appeared in a data leak. Please choose a different password.':
        text = 'Senha fraca.'
        break
      default:
        return ''
    }

    if (!response.ok) {
      return 'Erro ao fazer alteração!'
    }

    return text
  } catch (error) {
    return 'Erro ao fazer alteração!'
  }
}
