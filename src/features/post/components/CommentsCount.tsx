'use client'

import { formatCount } from '@/lib'
import { IconMessage } from '@tabler/icons-react'
import { useEffect } from 'react'
import { usePostStore } from '../store'

type Props = {
	defaultCount: number
}

export const CommentsCount = ({ defaultCount }: Props) => {
	const count = usePostStore(s => s.commentsCount)
	const setCount = usePostStore(s => s.setCommentsCount)

	useEffect(() => {
		setCount(defaultCount)
	}, [defaultCount, setCount])

	return (
		<a href='#comments' className='flex gap-2 items-center'>
			<IconMessage />
			{formatCount(count || defaultCount, {
				one: 'comment',
				plural: 'comments',
			})}
		</a>
	)
}
