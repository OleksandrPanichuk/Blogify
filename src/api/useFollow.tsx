'use client'

import { api } from '@/providers'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { TRPCError } from '@trpc/server'

export const useFollow = () => {
	const queryClient = useQueryClient()

	return api.follows.follow.useMutation({
		onSuccess: data => {
			queryClient.invalidateQueries({
				queryKey: [['users', 'get']],
			})
			queryClient.removeQueries({
				queryKey: [['posts', 'get']],
			})
			notifications.show({
				message: `You are now following ${data.following.name}`,
				color: 'green',
				icon: <IconCheck />,
			})
		},
		onError: error => {
			if (error instanceof TRPCError) {
				return notifications.show({
					message: error.message,
					color: 'red',
					icon: <IconX />,
				})
			}

			notifications.show({
				message: 'Failed to follow user',
				color: 'red',
				icon: <IconX />,
			})
		},
	})
}
