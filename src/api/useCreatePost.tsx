'use client'

import { uploadFile } from '@/lib'
import { api } from '@/providers'
import { CreatePostInput } from '@/server'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

type InputType = Omit<CreatePostInput, 'image'> & {
	file?: File
}

export const useCreatePost = () => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutateAsync, ...state } = api.posts.create.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [['posts', 'get']],
			})

			queryClient.invalidateQueries({
				queryKey: [['tags', 'get']],
			})

			notifications.show({
				message: 'Post created successfully',
				icon: <IconCheck />,
				color: 'green',
			})

			router.push('/posts')
		},
	})

	const createPost = useCallback(
		async ({ file, ...input }: InputType) => {
			try {
				const url = file ? await uploadFile(file) : undefined

				return await mutateAsync({
					...input,
					image: url,
				})
			} catch (error) {
				notifications.show({
					message: 'Failed to create post',
					icon: <IconX />,
					color: 'red',
				})
				throw error
			}
		},
		[mutateAsync]
	)

	return { ...state, mutateAsync: createPost }
}
