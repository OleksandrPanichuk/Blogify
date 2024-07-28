'use client'

import { Menu, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap'
import { IconTypography, IconTypographyOff } from '@tabler/icons-react'
import { fonts } from '../fonts'

export const FontFamilyControls = () => {
	const { editor } = useRichTextEditorContext()
	const [isOpen, { open, close }] = useDisclosure()

	const setFontFamily = (fontFamily: string) => {
		editor?.chain().focus().setFontFamily(fontFamily).run()
		close()
	}

	const unsetFontFamily = () => {
		editor?.chain().focus().unsetFontFamily().run()
	}

	return (
		<>
			<Menu onClose={close} opened={isOpen}>
				<MenuTarget>
					<RichTextEditor.Control
						aria-label='select font family'
						title='Font family'
						onClick={open}
					>
						<IconTypography stroke={1.5} size='1rem' />
					</RichTextEditor.Control>
				</MenuTarget>
				<MenuDropdown mah={300} className='overflow-y-auto'>
					{fonts.map(font => (
						<MenuItem
							key={font.value}
							onClick={() => setFontFamily(font.value)}
						>
							{font.label}
						</MenuItem>
					))}
				</MenuDropdown>
			</Menu>
			<RichTextEditor.Control
				onClick={unsetFontFamily}
				aria-label='unset font family'
				title='Unset font family'
			>
				<IconTypographyOff stroke={1.5} size='1rem' />
			</RichTextEditor.Control>
		</>
	)
}
