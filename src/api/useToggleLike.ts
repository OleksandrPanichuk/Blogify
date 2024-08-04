'use client'

import { api } from '@/providers'
import { useQueryClient } from '@tanstack/react-query'

export const useToggleLike = () => {
	const queryClient = useQueryClient()

	return api.likes.toggle.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [['posts', 'get']],
				type: 'all',
			})
		},
	})
}
