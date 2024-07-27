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
import { useMounted } from '@mantine/hooks'
import { IconMoon, IconSun } from '@tabler/icons-react'

export const ColorSchemeSelect = () => {
	const { setColorScheme } = useMantineColorScheme()
	const computedColorScheme = useComputedColorScheme('light')

	const isMounted = useMounted()

	if (!isMounted) {
		return (
			<ActionIcon variant='outline' size={'lg'} color='gray'>
				<IconSun />
			</ActionIcon>
		)
	}

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
