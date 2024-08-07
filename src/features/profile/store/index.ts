import { FullUser } from '@/server'
import {TypeProfileTab} from '@/features/profile'
import { create } from 'zustand'

interface IProfileStore {
	user: FullUser | null
	followersCount: number
	incrementFollowersCount: () => void
	decrementFollowersCount: () => void
	initializeStore: (user: FullUser) => void
	updateUser: (data: {
		name: string 
		username: string 
		image: string | null
	}) => void

	tab: TypeProfileTab
	setTab:(tab: TypeProfileTab) => void
}

export const useProfileStore = create<IProfileStore>(set => ({
	user: null,
	initializeStore: user => set({ user, followersCount: user._count.followers }),
	followersCount: 0,
	incrementFollowersCount: () =>
		set(s => ({ followersCount: s.followersCount + 1 })),
	decrementFollowersCount: () =>
		set(s => ({
			followersCount:
				s.followersCount > 0 ? s.followersCount - 1 : s.followersCount,
		})),
	updateUser: ({ name, username, image }) =>
		set(state => {
			if (state.user) {
				return {
					user: {
						...state.user,
						name,
						username,
						image,
					},
				}
			}

			return state
		}),

	tab:'posts',
	setTab:(tab) => set({tab})
}))
