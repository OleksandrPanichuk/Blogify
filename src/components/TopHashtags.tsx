'use client'

import { api } from '@/providers'
import {
	Button,
	Flex,
	List,
	ListItem,
	Paper,
	Skeleton,
	Text,
	Title,
} from '@mantine/core'
import Link from 'next/link'

export const TopHashtags = () => {
	const { data, isLoading } = api.tags.get.useQuery({
		take: 4,
		sortBy: 'count',
		withCount: true,
	})

	if (!isLoading && data?.length === 0) {
		return null
	}

	return (
		<Paper p={12} withBorder>
			<Flex direction={'column'} gap='sm'>
				<Title order={5}>Top hashtags</Title>
				<List w={'100%'} className='flex flex-col gap-2'>
					{isLoading
						? Array(5)
								.fill(0)
								.map((_, index) => (
									<Skeleton h={16} component='li' key={index} width={'70%'} />
								))
						: data?.map(tag => (
								<ListItem key={tag.id}>
									<Flex direction='column'>
										<Text
											component={Link}
											href={`/tags/${tag.id}`}
											className='text-black dark:text-white'
											size='md'
										>
											{tag.name}
										</Text>

										<Text
											component='span'
											className='text-zinc-700 dark:text-zinc-300'
											size='xs'
										>
											{tag._count.posts}{' '}
											{tag._count.posts === 1 ? 'post' : 'posts'}
										</Text>
									</Flex>
								</ListItem>
						  ))}
				</List>
				{!isLoading && (
					<Button variant='transparent' className='hover:underline self-start' component={Link} href='/tags'>
						Show more
					</Button>
				)}
			</Flex>
		</Paper>
	)
}
