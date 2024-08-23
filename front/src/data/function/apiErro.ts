export default function apiError(error: unknown): {
  ok: false
  error: string
  data: null
} {
  if (error instanceof Error) {
    return { data: null, error: error.message, ok: false }
  }
  return { data: null, error: 'Error', ok: false }
}
