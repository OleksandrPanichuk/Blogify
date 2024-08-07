'use client'

import { api } from '@/providers'
import type { UpdateUserInput } from '@/server'
import { notifications } from '@mantine/notifications'
import { User } from '@prisma/client'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { TRPCError } from '@trpc/server'

type InputType = UpdateUserInput

export const useUpdateUser = ({
	onSuccess,
}: { onSuccess?: (user: User) => void } = {}) => {
	const queryClient = useQueryClient()

	return api.users.update.useMutation({
		onSuccess: user => {
			onSuccess?.(user)

			queryClient.removeQueries({
				queryKey: [['posts', 'get']],
			})

			queryClient.removeQueries({
				queryKey: [['users', 'get']],
			})

			notifications.show({
				message: 'User updated successfully',
				icon: <IconCheck />,
				color: 'green',
			})
		},
		onError: error => {
			if (error instanceof TRPCError) {
				notifications.show({
					message: error.message,
					icon: <IconX />,
					color: 'red',
				})
			} else {
				notifications.show({
					message: 'Failed to update user',
					icon: <IconX />,
					color: 'red',
				})
			}
		},
	})
}
