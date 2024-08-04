import { GetTagsInput } from '@/server'
import { create } from 'zustand'

interface ITagsStore {
	searchValue: string
	setSearchValue: (value: string) => void

	sortBy: GetTagsInput['sortBy']
	setSortBy: (value: GetTagsInput['sortBy']) => void
}

export const useTagsStore = create<ITagsStore>(set => ({
	searchValue: '',
	setSearchValue: searchValue => set({ searchValue }),

	sortBy: 'name',
	setSortBy: sortBy => set({ sortBy }),
}))
