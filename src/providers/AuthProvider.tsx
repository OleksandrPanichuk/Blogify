"use client"
import { User } from 'lucia'
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from 'react'

interface IAuthProviderProps {
	initialUser: User | null
}

interface IAuthContext {
	user: User | null
	setUser: Dispatch<SetStateAction<User | null>>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({
	children,
	initialUser,
}: PropsWithChildren<IAuthProviderProps>) => {
	const [user, setUser] = useState<User | null>(initialUser)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
