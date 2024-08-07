import { ContentTabs, Feed, SortBySelect } from '@/components'
import { PostsProvider } from '@/providers'
import { serverApi } from '@/server'
import { Flex, Text } from '@mantine/core'
import { Tag } from '@prisma/client'
import { notFound } from 'next/navigation'

type Props = {
	params: {
		tagId: string
	}
}

const TagPage = async ({ params }: Props) => {
	let tag: Tag | undefined

	try {
		tag = await serverApi.tags.getById({
			id: params.tagId,
		})
	} catch {
		tag = undefined
	}

	if (!tag) {
		return notFound()
	}

	return (
		<PostsProvider>
			<div>
				<Text mb={16} size='xl'>
					Results for{' '}
					<Text fw={700} component='span'>
						{tag.name}
					</Text>
				</Text>
				<Flex justify='space-between' pos='relative' className='z-10'>
					<ContentTabs />
					<SortBySelect />
					<span className='absolute bottom-0 left-0 w-full h-px border-[#dee2e6] dark:border-[#424242] border -z-10 ' />
				</Flex>
				<Feed tagId={tag.id} />
			</div>
		</PostsProvider>
	)
}

export default TagPage
