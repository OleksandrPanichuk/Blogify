'use client'

import {
	ActionIcon,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	useComputedColorScheme,
	useMantineColorScheme,
} from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'

export const ColorSchemeSelect = () => {
	const { setColorScheme } = useMantineColorScheme()
	const computedColorScheme = useComputedColorScheme('light')

	return (
		<Menu>
			<MenuTarget>
				<ActionIcon variant='outline' size={'lg'} color='gray'>
					{computedColorScheme === 'light' ? <IconSun /> : <IconMoon />}
				</ActionIcon>
			</MenuTarget>
			<MenuDropdown>
				<MenuItem onClick={() => setColorScheme('auto')}>System</MenuItem>
				<MenuItem onClick={() => setColorScheme('light')}>Light</MenuItem>
				<MenuItem onClick={() => setColorScheme('dark')}>Dark</MenuItem>
			</MenuDropdown>
		</Menu>
	)
}
