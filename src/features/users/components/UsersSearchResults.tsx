'use client'
import { UsersFeed } from '@/components'
import { useUsersStore } from '@/features/users'

export const UsersSearchResults = () => {
	const { searchValue, sortBy } = useUsersStore(s => ({
		searchValue: s.searchValue,
		sortBy: s.sortBy,
	}))
	return <UsersFeed searchValue={searchValue} sortBy={sortBy} />
}
