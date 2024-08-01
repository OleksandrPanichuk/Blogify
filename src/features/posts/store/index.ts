import { create } from 'zustand'

export type TypeTab = 'general' | 'following'

export type TypeSortBy = 'newest' | 'popular'

interface IPostsStore {
	tab: TypeTab
	sortBy: TypeSortBy


	setTab: (tab:TypeTab) => void
	setSortBy:(sortBy:TypeSortBy) => void 
}

export const usePostsStore = create<IPostsStore>(set => ({
	tab:"general",
	sortBy: 'newest',
	setTab:(tab) => set({tab}),
	setSortBy:(sortBy) => set({sortBy})
}))
