import { service } from './../service'

export function making (blob, content) {
  const formData = new FormData()
  formData.append('image', blob, `${content}.png`)
  formData.append('content', content)
  return service.post('/api/video/making', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
