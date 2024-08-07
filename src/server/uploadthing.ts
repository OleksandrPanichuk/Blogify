'use server'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi({
	apiKey: process.env.UPLOADTHING_SECRET,
})

export async function uploadFileServer(formData: FormData) {
	try {
		const file = formData.get('file') as File | null

		if (!file) {
			throw new Error('File is not provided')
		}

		const response = await utapi.uploadFiles([file])

		if (response?.[0].error) {
			throw response?.[0].error
		}
		const url = response?.[0].data?.url

		return url
	} catch (err) {
		if (err instanceof Error) {
			throw err
		}
		throw new Error('Failed to upload file')
	}
}


// TODO: fix file deletion
export async function deleteFile(url:string) {
	try {
		const key = url.replace('https://utfs.io/t/','')
		console.log(key)
    await utapi.deleteFiles([key]);
	} catch {
		throw new Error('Failed to delete file')
	}
}