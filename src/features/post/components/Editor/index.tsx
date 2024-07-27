'use client'
import { Link, RichTextEditor, getTaskListExtension } from '@mantine/tiptap'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TaskItem from '@tiptap/extension-task-item'
import TipTapTaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import '@mantine/tiptap/styles.css'
import { IconColorPicker } from '@tabler/icons-react'
import styles from './Editor.module.css'
import { InsertImageWithUrlControl, lowlight } from './extensions'

interface EditorProps {
	onChange: (content: string) => void
	initialContent: string | null
}

const useTipTapEditor = (
	content: string | null,
	onChange?: (content: string) => void
) => {
	return useEditor({
		extensions: [
			StarterKit.configure({ codeBlock: false }),
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			TextStyle,
			Color,
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
// TODO: image, mention, placeholder, youtube, fontFamily, table

export const Editor = ({ onChange, initialContent }: EditorProps) => {
	const editor = useTipTapEditor(initialContent, onChange)

	return (
		<RichTextEditor className={styles.editor} editor={editor}>
			<RichTextEditor.Toolbar sticky>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<RichTextEditor.ClearFormatting />
					<RichTextEditor.Highlight />
					<RichTextEditor.CodeBlock />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.H1 />
					<RichTextEditor.H2 />
					<RichTextEditor.H3 />
					<RichTextEditor.H4 />
					<RichTextEditor.H5 />
					<RichTextEditor.H6 />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Blockquote />
					<RichTextEditor.Hr />
					<RichTextEditor.BulletList />
					<RichTextEditor.OrderedList />
					<RichTextEditor.Subscript />
					<RichTextEditor.Superscript />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Link />
					<RichTextEditor.Unlink />
				</RichTextEditor.ControlsGroup>

				<InsertImageWithUrlControl />

				<RichTextEditor.ColorPicker
					colors={[
						'#25262b',
						'#868e96',
						'#fa5252',
						'#e64980',
						'#be4bdb',
						'#7950f2',
						'#4c6ef5',
						'#228be6',
						'#15aabf',
						'#12b886',
						'#40c057',
						'#82c91e',
						'#fab005',
						'#fd7e14',
					]}
				/>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Control interactive={false}>
						<IconColorPicker size={16} />
					</RichTextEditor.Control>
					<RichTextEditor.Color color='#F03E3E' />
					<RichTextEditor.Color color='#7048E8' />
					<RichTextEditor.Color color='#1098AD' />
					<RichTextEditor.Color color='#37B24D' />
					<RichTextEditor.Color color='#F59F00' />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.TaskList />
					<RichTextEditor.TaskListLift />
					<RichTextEditor.TaskListSink />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.AlignLeft />
					<RichTextEditor.AlignCenter />
					<RichTextEditor.AlignJustify />
					<RichTextEditor.AlignRight />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Undo />
					<RichTextEditor.Redo />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.UnsetColor />
			</RichTextEditor.Toolbar>

			<RichTextEditor.Content />
		</RichTextEditor>
	)
}
interface EditorOutputProps {
	content: string
}

export const EditorOutput = ({ content }: EditorOutputProps) => {
	const editor = useTipTapEditor(content)

	return (
		<RichTextEditor
			className={styles.editor}
			editor={editor}
			contentEditable={false}
		>
			<RichTextEditor.Content />
		</RichTextEditor>
	)
}
