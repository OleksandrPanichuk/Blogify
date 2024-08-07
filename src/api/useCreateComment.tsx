'use client'

import { api } from '@/providers'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { TRPCError } from '@trpc/server'

export const useCreateComment = ({onSuccess}:{onSuccess?:() => void} = {}) => {
	const queryClient = useQueryClient()

	return api.comments.create.useMutation({
		onSuccess: (_, { postId }) => {
			onSuccess?.()
			queryClient.invalidateQueries({
				queryKey: [['comments', 'get'], { input: { postId } }],
			})

			notifications.show({
				message: 'Comment created successfully',
				icon: <IconCheck />,
				color: 'green',
			})
		},
		onError: error => {
			if (error instanceof TRPCError) {
				return notifications.show({
					message: error.message,
					icon: <IconX />,
					color: 'red',
				})
			}

			notifications.show({
				message: 'Failed to create comment',
				icon: <IconX />,
				color: 'red',
			})
		},
	})
}
