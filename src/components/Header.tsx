'use client'
import { CreatePostButton, Logo, SearchField, UserMenu, Visibility } from '@/components'
import { Routes } from '@/constants'
import { useAuth } from '@/providers'
import { AppShellHeader, Container, Flex, Title } from '@mantine/core'
import Link from 'next/link'
import { ColorSchemeSelect } from './ColorSchemeSelect'

export const Header = () => {
	const { user } = useAuth()

	return (
		<AppShellHeader className='border-b border-b-zinc-400 flex items-center'>
			<Container
				size={1200}
				className='flex relative  w-full justify-between items-center'
			>
				<Flex component={Link} href={Routes.ROOT} gap={'sm'} align='center'>
					<Logo />
					<Visibility breakpoint='(min-width: 640px)'>
						<Title order={2} className='hidden sm:block'>
							Blogify
						</Title>
					</Visibility>
				</Flex>
				<Flex gap={'sm'} align={'center'}>
					<CreatePostButton />
					<SearchField />
					<ColorSchemeSelect />
					<UserMenu />
				</Flex>
			</Container>
		</AppShellHeader>
	)
}
