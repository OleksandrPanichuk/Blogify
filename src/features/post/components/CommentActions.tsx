'use client'

import { useDeleteComment } from '@/api'
import { ConfirmModal } from '@/components'
import {
	ActionIcon,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { usePostStore } from '../store'

type Props = {
	commentId: string
	postId: string
}

export const CommentActions = ({ commentId, postId }: Props) => {
	const decrementCount = usePostStore(s => s.decrementCommentsCount)
	const [opened, { close, toggle }] = useDisclosure()
	const { isPending, mutate: deleteComment } = useDeleteComment()

	return (
		<ConfirmModal
			loading={isPending}
			onConfirm={() => deleteComment({ postId, commentId })}
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
