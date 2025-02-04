'use client'
import { Routes } from '@/constants'
import { ActionIcon, Button, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Visibility } from './Visibility'

export const CreatePostButton = () => {
	const router = useRouter()
	const pathname = usePathname()
	const { postId } = useParams()

	const isCreatePage = pathname.includes(Routes.CREATE_POST)
	const isEditPage = pathname.includes(Routes.EDIT_POST(postId as string))
	const isCreateOrEditPage = isCreatePage || isEditPage

	const navigateToCreate = () => router.push(Routes.CREATE_POST)

	const formId = isCreatePage
		? 'post-create-form'
		: isEditPage
		? 'post-edit-form'
		: undefined

	const type = isCreateOrEditPage ? 'submit' : 'button'

	const label = isEditPage ? 'Save changes' : 'Create post'

	return (
		<>
			<Visibility breakpoint='(min-width: 640px)'>
				<Button
					leftSection={<IconPlus />}
					className='hidden sm:block'
					onClick={!isCreateOrEditPage ? navigateToCreate : undefined}
					form={formId}
					type={type}
				>
					{label}
				</Button>
			</Visibility>
			<Visibility breakpoint='(max-width: 639.98px)'>
				<Tooltip position='bottom' label={label}>
					<ActionIcon
						className='sm:hidden'
						size='lg'
						onClick={isCreateOrEditPage ? navigateToCreate : undefined}
						form={formId}
						type={type}
					>
						<IconPlus />
					</ActionIcon>
				</Tooltip>
			</Visibility>
		</>
	)
}
