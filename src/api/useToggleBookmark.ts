'use client'

import { api } from '@/providers'
import { useQueryClient } from '@tanstack/react-query'

export const useToggleBookmark = () => {
	const queryClient = useQueryClient()
	return api.bookmarks.toggle.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [['posts', 'get']],
				type: 'all',
			})
		},
	})
}
