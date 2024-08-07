'use client'

import { ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import { EditProfileModal } from './EditProfileModal'

export const EditProfileButton = () => {
	const [opened, { open, close }] = useDisclosure()
	return (
		<>
			<ActionIcon onClick={open} color='gray' variant='subtle'>
				<IconEdit />
			</ActionIcon>
			<EditProfileModal opened={opened} onClose={close} />
		</>
	)
}
