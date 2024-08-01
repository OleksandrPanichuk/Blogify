'use client'

import { api } from '@/providers'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { TRPCError } from '@trpc/server'

export const useDeletePost = () => {
	const queryClient = useQueryClient()

	return api.posts.delete.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [['posts', 'get']],
			})

			queryClient.invalidateQueries({
				queryKey: [['tags', 'get']],
			})

			notifications.show({
				message: 'Post successfully deleted',
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
				message: 'Failed to delete post',
				icon: <IconX />,
				color: 'red',
			})
		},
	})
}
