'use client'

import { uploadFile } from '@/lib'
import { api } from '@/providers'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { TRPCError } from '@trpc/server'
import { useCallback } from 'react'

type InputType = {
	image?: File | string | null
}

export const useUpdateAvatar = () => {
	const { mutateAsync, ...state } = api.users.updateAvatar.useMutation()

	const updateUser = useCallback(
		async ({ image, ...input }: InputType) => {
			try {
				const url = image instanceof File ? await uploadFile(image) : image
				return await mutateAsync({
					...input,
					image: url,
				})
			} catch (error) {
				if (error instanceof TRPCError) {
					notifications.show({
						message: error.message,
						icon: <IconX />,
						color: 'red',
					})
				} else {
					notifications.show({
						message: 'Failed to update user avatar',
						icon: <IconX />,
						color: 'red',
					})
				}
				throw error
			}
		},
		[mutateAsync]
	)

	return { ...state, mutateAsync: updateUser }
}
