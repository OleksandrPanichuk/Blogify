'use client'

import { useTagsStore } from '@/features/tags'
import { TextInput } from '@mantine/core'
import { IconHash } from '@tabler/icons-react'

export const TagsSearchInput = () => {
	const { searchValue, setSearchValue } = useTagsStore()
	return (
		<TextInput
			value={searchValue}
			onChange={e => setSearchValue(e.target.value)}
			leftSection={<IconHash />}
			placeholder='Search tags'
			aria-label='Search tags input'
			className='sm:flex-1'
		/>
	)
}
