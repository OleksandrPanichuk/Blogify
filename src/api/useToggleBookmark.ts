'use client'

import { api } from "@/providers"


export const useToggleBookmark = () => {
	return api.bookmarks.toggle.useMutation()
}