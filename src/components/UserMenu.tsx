'use client'

import { signOut } from '@/features/auth'
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
	const { user, setUser } = useAuth()
	return (
		<Menu position='bottom-end'>
			<MenuTarget>
				<Avatar
					src={user!.image}
					alt={user!.name}
					color='initials'
					name={user!.name}
					className='cursor-pointer'
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
					href='/settings'
					leftSection={<IconSettings />}
				>
					Settings
				</MenuItem>
				<MenuDivider />
				<MenuItem
					color='red'
					onClick={async () => {
						await signOut()
						setUser(null)
					}}
					leftSection={<IconLogout />}
				>
					Sign Out
				</MenuItem>
			</MenuDropdown>
		</Menu>
	)
}
