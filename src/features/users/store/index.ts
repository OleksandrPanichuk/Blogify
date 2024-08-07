import { GetUsersInput } from '@/server'
import { create } from 'zustand'

interface IUsersStore {
	searchValue: string
	setSearchValue: (value: string) => void

	sortBy: GetUsersInput['sortBy']
	setSortBy: (value: GetUsersInput['sortBy']) => void
}

export const useUsersStore = create<IUsersStore>(set => ({
	searchValue: '',
	setSearchValue: searchValue => set({ searchValue }),

	sortBy: 'name',
	setSortBy: sortBy => set({ sortBy }),
}))
