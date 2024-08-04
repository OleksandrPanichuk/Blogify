'use client'
import { Header, Navigation, TopHashtags, WhoToFollow } from '@/components'
import { useAuth } from '@/providers'
import { AppShell, AppShellMain, Box, Container } from '@mantine/core'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const PlatformLayout = ({ children }: PropsWithChildren) => {
	const { user } = useAuth()

	console.log(user)
	if (!user) {
		return redirect('/sign-in')
	}

	return (
		<AppShell header={{ height: 60 }}>
			<Header />
			<AppShellMain>
				<Box className='bg-zinc-50 dark:bg-zinc-800 min-h-[calc(100vh-60px)]'>
					<Container
						size={1200}
						pt={16}
						className='flex flex-col sm:flex-row items-start gap-4'
						pos='relative'
					>
						<Navigation />
						<div className='flex-1'>{children}</div>
						<Box className='w-1/4 hidden lg:flex flex-col gap-4 sticky top-[76px] right-0'>
							<WhoToFollow />
							<TopHashtags />
						</Box>
					</Container>
				</Box>
			</AppShellMain>
		</AppShell>
	)
}

export default PlatformLayout
