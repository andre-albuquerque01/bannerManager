export const GetMediaType = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()
  const videoExtensions = ['mp4', 'webm', 'ogg']
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']

  if (videoExtensions.includes(extension || '')) {
    return 'video'
  } else if (imageExtensions.includes(extension || '')) {
    return 'image'
  } else {
    return null
  }
}
