import { ContentTabs, Feed, SortBySelect } from '@/components'
import { PostsProvider } from '@/providers'
import { Flex } from '@mantine/core'

const BookmarksPage = () => {
	return (
		<PostsProvider>
			<div>
				<Flex justify='space-between' pos='relative' className='z-10'>
					<ContentTabs />
					<SortBySelect />
					<span className='absolute bottom-0 left-0 w-full h-px border-[#dee2e6] dark:border-[#424242] border -z-10 ' />
				</Flex>
				<Feed bookmarked />
			</div>
		</PostsProvider>
	)
}

export default BookmarksPage
