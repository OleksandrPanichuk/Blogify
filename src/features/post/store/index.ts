import { create } from 'zustand'

interface IPostStore {
	commentsCount: number
	incrementCommentsCount: () => void
	decrementCommentsCount: () => void
	setCommentsCount: (count: number) => void
}

export const usePostStore = create<IPostStore>(set => ({
	commentsCount: 0,
	incrementCommentsCount: () =>
		set(s => ({ commentsCount: s.commentsCount + 1 })),
	decrementCommentsCount: () =>
		set(s => ({
			commentsCount:
				s.commentsCount > 0 ? s.commentsCount - 1 : s.commentsCount,
		})),
	setCommentsCount: commentsCount => set({ commentsCount }),
}))
