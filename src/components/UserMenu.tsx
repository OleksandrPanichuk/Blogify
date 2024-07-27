'use client'

import { useAuth } from '@/providers'
import {
	Avatar,
	Menu,
	MenuDivider,
	MenuDropdown,
	MenuItem,
	MenuTarget,
} from '@mantine/core'
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react'
import Link from 'next/link'

export const UserMenu = () => {
	const { user } = useAuth()

	// TODO: sign out function
	const signOut = () => {}
	return (
		<Menu position='bottom-end'>
			<MenuTarget>
				<Avatar
					src={user!.image}
					alt={user!.username}
					color='initials'
					name={user!.username}
				/>
			</MenuTarget>
			<MenuDropdown miw={200}>
				<MenuItem
					component={Link}
					href='/profile/me'
					leftSection={<IconUser />}
				>
					Profile
				</MenuItem>
				<MenuItem
					component={Link}
					href='/settigns'
					leftSection={<IconSettings />}
				>
					Settings
				</MenuItem>
				<MenuDivider />
				<MenuItem color='red' onClick={signOut} leftSection={<IconLogout />}>
					Sign Out
				</MenuItem>
			</MenuDropdown>
		</Menu>
	)
}
