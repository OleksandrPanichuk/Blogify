'use client'
import { uploadFile } from '@/server/uploadthing'
import { FileButton } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap'
import { IconUpload, IconX } from '@tabler/icons-react'
import { useCallback } from 'react'

export function UploadImageControl() {
	const { editor } = useRichTextEditorContext()

	const onChange = useCallback(
		async (file: File | null) => {
			try {
				if (!file) {
					notifications.show({
						message: 'Select an image',
					})
					return
				}

				const formData = new FormData()
				formData.append('file', file)
				const url = await uploadFile(formData)
				if (url) {
					editor?.chain().focus().setImage({ src: url }).run()
				}
			} catch (err) {
				console.log('ERROR', err)
				notifications.show({
					message: 'Failed to upload file',
					color: 'red',
					icon: <IconX />,
				})
			}
		},
		[editor]
	)

	return (
		<FileButton accept={'image/*'} multiple={false}  onChange={onChange}>
			{({ onClick }) => (
				<RichTextEditor.Control
					onClick={onClick}
					aria-label='Insert image by uploading it firstly'
					title='Upload image'
				>
					<IconUpload stroke={1.5} size='1rem' />
				</RichTextEditor.Control>
			)}
		</FileButton>
	)
}
