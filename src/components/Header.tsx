'use client'
import { CreatePostButton, Logo, SearchField, UserMenu, Visibility } from '@/components'
import { useAuth } from '@/providers'
import { AppShellHeader, Avatar, Container, Flex, Title } from '@mantine/core'
import { ColorSchemeSelect } from './ColorSchemeSelect'
import Link from 'next/link'

export const Header = () => {
	const { user } = useAuth()

	return (
		<AppShellHeader className='border-b border-b-zinc-400 flex items-center'>
			<Container
				size={1200}
				className='flex  w-full justify-between items-center'
			>
				<Flex component={Link} href="/" gap={'sm'} align='center'>
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
