'use client'

import { api } from '@/providers'

export const useToggleLike = () => {
	return api.likes.toggle.useMutation()
}
