'use client'

import { TypeSortBy, TypeTab } from '@/types'
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from 'react'

interface IPostsContext {
	type: TypeTab
	sortBy: TypeSortBy

	setType: Dispatch<SetStateAction<TypeTab>>
	setSortBy: Dispatch<SetStateAction<TypeSortBy>>
}

const PostsContext = createContext<IPostsContext>({} as IPostsContext)

export const PostsProvider = ({ children }: PropsWithChildren) => {
	const [type, setType] = useState<TypeTab>('general')
	const [sortBy, setSortBy] = useState<TypeSortBy>('newest')

	return (
		<PostsContext.Provider value={{ type, setType, sortBy, setSortBy }}>
			{children}
		</PostsContext.Provider>
	)
}

export const usePostsContext = () => {
	const context = useContext(PostsContext)

	if (!context) {
		throw new Error('usePostsContext must be used within a PostsProvider')
	}
	return context
}
