'use client'

import { uploadFile } from '@/lib'
import { api } from '@/providers'
import type { UpdatePostInput } from '@/server'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

type InputType = Omit<UpdatePostInput, 'image'> & {
	image?: File | string | null
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutateAsync, ...state } = api.posts.update.useMutation({
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: [['posts', 'get']],
			})

			queryClient.invalidateQueries({
				queryKey: [['posts', 'getById'], { input: { id: variables.id } }],
			})

			queryClient.invalidateQueries({
				queryKey: [['tags', 'get']],
			})

			notifications.show({
				message: 'Post updated successfully',
				icon: <IconCheck />,
				color: 'green',
			})

			router.push('/posts')
		},
	})

	const updatePost = useCallback(
		async ({ image, ...input }: InputType) => {
			try {
				console.log(image, image instanceof File)
				const url = image instanceof File ? await uploadFile(image) : image

				return await mutateAsync({
					...input,
					image: url,
				})
			} catch (error) {
				notifications.show({
					message: 'Failed to update post',
					icon: <IconX />,
					color: 'red',
				})
				throw error
			}
		},
		[mutateAsync]
	)

	return { ...state, mutateAsync: updatePost }
}
