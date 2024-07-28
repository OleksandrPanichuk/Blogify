'use client'
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap'

import { IconFrame } from '@tabler/icons-react'
import { useCallback } from 'react'


export const IframeControl = () => {
	const { editor } = useRichTextEditorContext()

	const addIframe = useCallback(() => {
		const url = window.prompt('URL')

		if (url) {
			editor?.chain().focus().setIframe({ src: url }).run()
		}
	}, [editor])
	return (
		<RichTextEditor.Control
			onClick={addIframe}
			aria-label='iframe'
			title='Add content with url'
		>
			<IconFrame   stroke={1.5} size="1rem"/>
		</RichTextEditor.Control>
	)
}
