'use client'

import { useToggleBookmark } from '@/api'
import { GetPostsPost } from '@/server'
import { ActionIcon } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react'
import { useState } from 'react'

type Props = {
	bookmarks: GetPostsPost['bookmarks']
	postId: string
}

export const BookmarkToggle = ({ bookmarks, postId }: Props) => {
	const [bookmarked, setBookmarked] = useState(!!bookmarks.length)

	const { mutate: toggleBookmark } = useToggleBookmark()

	const onClick = () => {
		toggleBookmark({ postId })
		setBookmarked(prev => !prev)
	}

	return (
		<ActionIcon
			onClick={onClick}
			variant='transparent'
			className='transition-all duration-300 active:scale-90 focus:scale-110 text-black dark:text-white hover:text-zinc-950 dark:hover:text-zinc-50'
		>
			{bookmarked ? <IconBookmarkFilled /> : <IconBookmark />}
		</ActionIcon>
	)
}
