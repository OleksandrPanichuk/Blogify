import {
	TagsSearchInput,
	TagsSearchResults,
	TagsSortBySelect,
} from '@/features/tags'
import { Flex } from '@mantine/core'

const TagsPage = () => {
	return (
		<div>
			<Flex className='sm:flex-row flex-col gap-2 '>
				<TagsSearchInput />
				<TagsSortBySelect />
			</Flex>
			<TagsSearchResults />
		</div>
	)
}

export default TagsPage
