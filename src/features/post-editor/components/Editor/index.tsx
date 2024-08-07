'use client'
import { RichTextEditor } from '@mantine/tiptap'
import { IconColorPicker } from '@tabler/icons-react'

import {
	FontFamilyControls,
	fontsClassName,
	IframeControl,
	InsertImageWithUrlControl,
	UploadImageControl,
} from './extensions'

import { useTipTapEditor } from './Editor.hooks'

import { cn } from '@/lib'
import '@mantine/tiptap/styles.css'
import styles from './Editor.module.scss'

interface EditorProps {
	onChange: (content: string) => void
	initialContent: string | null
	disabled?: boolean
}

// TODO:  mention, table

export const Editor = ({ onChange, initialContent, disabled }: EditorProps) => {
	const editor = useTipTapEditor(initialContent, onChange)

	return (
		<RichTextEditor
			className={cn(
				styles.editor,
				fontsClassName,
				disabled && 'pointer-events-none'
			)}
			// @ts-ignore
			editor={editor}
			contentEditable={disabled ? false : undefined}
		>
			<RichTextEditor.Toolbar sticky>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<FontFamilyControls />
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

				<RichTextEditor.ControlsGroup>
					<InsertImageWithUrlControl />
					<IframeControl />
					<UploadImageControl />
				</RichTextEditor.ControlsGroup>

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

			<RichTextEditor.Content mih={200} />
		</RichTextEditor>
	)
}
interface EditorOutputProps {
	content: string
}

export const EditorOutput = ({ content }: EditorOutputProps) => {
	const editor = useTipTapEditor(content)

	// Show skeleton until component is fully mounted
	return (
		<RichTextEditor
			className={cn(styles.editor, fontsClassName, 'pointer-events-none')}
			// @ts-ignore
			editor={editor}
			contentEditable={false}
		>
			<RichTextEditor.Content />
		</RichTextEditor>
	)
}
