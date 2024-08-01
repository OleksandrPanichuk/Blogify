'use client'

import {
	Button,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	ModalRoot,
	Text,
	Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLoader2 } from '@tabler/icons-react'

interface IConfirmModalProps {
	title?: string
	description?: string
	loading?: boolean
	onConfirm?: () => void | Promise<void>
	onReject?: () => void | Promise<void>
	onModalClose?:() => void
	children: (props:{open: () => void, opened: boolean}) => JSX.Element 
}

export const ConfirmModal = ({
	children,
	title = 'Are you absolutely sure?',
	description = 'This action cannot be undone',
	loading,
	onConfirm,
	onReject,
	onModalClose,
}: IConfirmModalProps) => {
	const [opened, { close, open }] = useDisclosure()

	const handleReject = async () => {
		await onReject?.()
		close()
	}

	const handleConfirm = async () => {
		await onConfirm?.()
		close()
	}

	const handleClose = () => {
		if (loading) {
			return
		}


		close()
		onModalClose?.()
	}


	return (
		<>
			{children({open, opened})}
			<ModalRoot opened={opened} onClose={handleClose} size='md' centered>
				<ModalOverlay className='z-[1000000]' />
				<ModalContent className='z-[1000000]'>
					<ModalHeader className='flex flex-col items-start relative'>
						<Title order={3}>{title}</Title>
						<Text>{description}</Text>
						<ModalCloseButton className='absolute top-2 right-2' />
					</ModalHeader>
					<ModalBody className='flex flex-col gap-2 sm:flex-row sm:justify-end'>
						<Button variant={'light'} onClick={handleReject} disabled={loading}>
							Cancel
						</Button>
						<Button
							className='rounded-md'
							onClick={handleConfirm}
							disabled={loading}
						>
							{loading ? <IconLoader2 className='animate-spin' /> : 'Confirm'}
						</Button>
					</ModalBody>
				</ModalContent>
			</ModalRoot>
		</>
	)
}
