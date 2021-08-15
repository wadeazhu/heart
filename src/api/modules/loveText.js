import { service } from "./../service"

export function making(blob) {
  const formData = new FormData();
  formData.append("image", blob, 'canvas.png');
  return service.post('/api/video/making', formData, {headers: {
    "Content-Type": "multipart/form-data"
  }})
}
