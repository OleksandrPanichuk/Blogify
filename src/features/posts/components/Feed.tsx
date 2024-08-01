'use client'

import { Post } from '@/components'
import { api } from '@/providers'
import { Fragment, useCallback, useRef } from 'react'
import { usePostsStore } from '../store'

export const Feed = () => {
	const tab = usePostsStore(s => s.tab)
	const sortBy = usePostsStore(s => s.sortBy)

	const observer = useRef<IntersectionObserver>()
	const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
		api.posts.get.useInfiniteQuery(
			{
				sortBy,
				type: tab,
				take: 1,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			}
		)

	const lastElementRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLoading) return

			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasNextPage && !isFetching) {
					fetchNextPage()
				}
			})

			if (node) observer.current.observe(node)
		},
		[fetchNextPage, hasNextPage, isFetching, isLoading]
	)

	if (!data?.pages?.[0].posts.length && isLoading) {
		return <div>Loading...</div>
	}

	if (!data?.pages?.[0].posts.length) {
		return <div>Nothing found</div>
	}

	return (
		<div className='flex flex-col mt-4 gap-4'>
			{data.pages.map((page, i) => (
				<Fragment key={i}>
					{page.posts.map(post => (
						<Post key={post.id} data={post} ref={lastElementRef} />
					))}
				</Fragment>
			))}
		</div>
	)
}
