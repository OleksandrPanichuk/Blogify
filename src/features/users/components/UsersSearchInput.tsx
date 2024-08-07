'use client'

import { useUsersStore } from '@/features/users'
import { TextInput } from '@mantine/core'

export const UsersSearchInput = () => {
	const { searchValue, setSearchValue } = useUsersStore()
	return (
		<TextInput
			value={searchValue}
			onChange={e => setSearchValue(e.target.value)}
			placeholder='Search users with their name or username'
			aria-label='Search users input'
			className='sm:flex-1'
		/>
	)
}
