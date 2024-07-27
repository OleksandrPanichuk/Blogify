'use client'
import { ActionIcon, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { Visibility } from './Visibility'

export const SearchField = () => {
	const [isOpen, { open, close }] = useDisclosure()
	const router = useRouter()

	const navigate = () => router.push('/')
	const onOpen = () => {
		open()
		navigate()
	}

	
	return (
		<>
			<Visibility breakpoint='(min-width: 640px)'>
				<TextInput
					placeholder='Search'
					className='hidden sm:block'
					leftSection={<IconSearch />}
					onFocus={navigate}
				/>
			</Visibility>
			<Visibility breakpoint='(max-width: 639.98px)'>
				<ActionIcon
					className='sm:hidden'
					color='gray'
					variant='outline'
					size={'lg'}
					onClick={onOpen}
				>
					<IconSearch />
				</ActionIcon>
				<Modal opened={isOpen} onClose={close} title='Search posts '>
					<TextInput placeholder='Search' leftSection={<IconSearch />} />
				</Modal>
			</Visibility>
		</>
	)
}
