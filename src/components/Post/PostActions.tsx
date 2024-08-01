'use client'

import { useDeletePost } from '@/api'
import { ConfirmModal } from '@/components'
import {
	ActionIcon,
	Menu,
	MenuDivider,
	MenuDropdown,
	MenuItem,
	MenuTarget,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'

type Props = {
	postId: string
}

export const PostActions = ({ postId }: Props) => {
	const [opened, { close, toggle }] = useDisclosure()
	const { isPending, mutate: deletePost } = useDeletePost()

	return (
		<ConfirmModal
			loading={isPending}
			onConfirm={() => deletePost({ id: postId })}
			onModalClose={close}
			onReject={close}
		>
			{({ open: openConfirmModal, opened: isModalOpened }) => (
				<Menu
					opened={opened}
					closeOnClickOutside={!isModalOpened}
					onClose={close}
					position='bottom-end'
				>
					<MenuTarget>
						<ActionIcon onClick={toggle} color='gray' variant='subtle'>
							<IconDotsVertical />
						</ActionIcon>
					</MenuTarget>
					<MenuDropdown miw={150}>
						<MenuItem
							component={Link}
							href={`/posts/${postId}/edit`}
							leftSection={<IconEdit />}
						>
							Edit
						</MenuItem>
						<MenuDivider />
						<MenuItem
							leftSection={<IconTrash />}
							color='red'
							closeMenuOnClick={false}
							onClick={() => {
								openConfirmModal()
							}}
						>
							Delete
						</MenuItem>
					</MenuDropdown>
				</Menu>
			)}
		</ConfirmModal>
	)
}
