export function FormatData(dataISO: string): string {
  function padLeft(value: number): string {
    return value < 10 ? '0' + value : value.toString()
  }

  if (dataISO) {
    const data = new Date(dataISO)

    const dia = padLeft(data.getDate())
    const mes = padLeft(data.getMonth() + 1)
    const ano = data.getFullYear()
    const hora = padLeft(data.getHours())
    const minuto = padLeft(data.getMinutes())

    const dt = new Date()
    if (
      dt.getDate() === data.getDate() &&
      dt.getMonth() === data.getMonth() &&
      dt.getFullYear() === data.getFullYear()
    ) {
      return `${hora}:${minuto}`
    }

    if (
      dt.getMonth() !== data.getMonth() &&
      dt.getFullYear() === data.getFullYear()
    ) {
      return `${hora}:${minuto} - ${dia}/${mes}`
    }

    if (dt.getFullYear() === data.getFullYear()) {
      return `${hora}:${minuto} - ${dia}/${mes}`
    }

    return `${hora}:${minuto} - ${dia}/${mes}/${ano}`
  }
  return ''
}
