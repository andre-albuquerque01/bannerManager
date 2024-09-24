export const ExtractDriveId = (url: string | undefined) => {
  if (url) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }
}
