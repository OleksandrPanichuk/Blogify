import { uploadFileServer } from '@/server/uploadthing'

export async function uploadFile(file: File) {
	const formData = new FormData()
	formData.append('file', file)
	return await uploadFileServer(formData)
}
