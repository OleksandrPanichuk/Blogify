import { getTaskListExtension, Link } from '@mantine/tiptap'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TaskItem from '@tiptap/extension-task-item'
import TipTapTaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Iframe, lowlight } from './extensions'

export const useTipTapEditor = (
	content: string | null,
	onChange?: (content: string) => void
) => {
	return useEditor({
		extensions: [
			StarterKit.configure({ codeBlock: false }),
			Underline,
			// @ts-ignore
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Placeholder.configure({ placeholder: 'What do you wanna share?' }),
			TextStyle,
			Color,
			Iframe,
			FontFamily,
			CodeBlockLowlight.configure({ lowlight }),
			getTaskListExtension(TipTapTaskList),
			Image,
			TaskItem.configure({
				nested: true,
				HTMLAttributes: {
					class: 'test-item',
				},
			}),
		],
		content: content ? JSON.parse(content) : {},
		onUpdate: props => {
			onChange?.(JSON.stringify(props.editor.getJSON()))
		},
	})
}
