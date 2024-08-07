import {
	UsersSearchResults,
	UsersSearchInput,
	UsersSortBySelect,
} from '@/features/users'
import { Flex } from '@mantine/core'

const UsersPage = () => {
	return (
		<div>
			<Flex className='sm:flex-row flex-col gap-2 '>
				<UsersSearchInput />
				<UsersSortBySelect />
			</Flex>
			<UsersSearchResults />
		</div>
	)
}

export default UsersPage
