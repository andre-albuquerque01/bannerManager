export default function VerificationPassword(password: string) {
  const hasNumber = /\d/
  const hasUpperCase = /[A-Z]/
  const hasLowerCase = /[a-z]/
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>_=+]/
  const hasMinLength = /^.{8,}$/

  if (!hasNumber.test(password))
    throw new Error('Senha precisa ter pelo menos um número.')
  if (!hasUpperCase.test(password))
    throw new Error('Senha precisa ter pelo menos uma letra maiúscula.')
  if (!hasLowerCase.test(password))
    throw new Error('Senha precisa ter pelo menos uma letra minúscula.')
  if (!hasSymbol.test(password))
    throw new Error('Senha precisa ter pelo menos um símbolo.')
  if (!hasMinLength.test(password))
    throw new Error('Senha precisa ter pelo menos 8 caracteres.')
}
