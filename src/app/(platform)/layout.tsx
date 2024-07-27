'use client'
import { Header } from '@/components'
import { useAuth } from '@/providers'
import { AppShell, AppShellMain } from '@mantine/core'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const PlatformLayout = ({ children }: PropsWithChildren) => {
	const { user } = useAuth()
	if (!user) {
		return redirect('/sign-in')
	}

	return (
		<AppShell header={{ height: 60 }}>
			<Header />
			<AppShellMain>{children}</AppShellMain>
		</AppShell>
	)
}

export default PlatformLayout
