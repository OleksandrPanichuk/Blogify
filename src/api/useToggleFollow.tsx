'use client'

import { api } from '@/providers'
import { ToggleFollowInput, ToggleFollowResponse } from '@/server'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { UseTRPCMutationOptions } from '@trpc/react-query/shared'
import { TRPCError } from '@trpc/server'

export const useToggleFollow = (
	options?: UseTRPCMutationOptions<
		ToggleFollowInput,
		unknown,
		ToggleFollowResponse
	>
) => {
	const queryClient = useQueryClient()

	return api.follows.toggle.useMutation({
		...options,
		onSuccess: async ({ type, data }, variables, ctx) => {
			await options?.onSuccess?.({ type, data }, variables, ctx)

			queryClient.removeQueries({
				queryKey: [['posts', 'get']],
			})

			queryClient.invalidateQueries({
				queryKey: [['users', 'get']],
				type: 'all',
			})

			if (type === 'follow') {
				notifications.show({
					message: `You are now following ${data.following.name}`,
					color: 'green',
					icon: <IconCheck />,
				})
			}

			if (type === 'unfollow') {
				notifications.show({
					message: `You have unfollowed ${data.following.name}`,
					color: 'green',
					icon: <IconCheck />,
				})
			}
		},
		onError: async (error, variables, ctx) => {
			await options?.onError?.(error, variables, ctx)

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
