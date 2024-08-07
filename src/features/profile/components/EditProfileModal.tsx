'use client'

import { useUpdateAvatar, useUpdateUser } from '@/api'
import { ImageDropzone } from '@/components'
import { useProfileStore } from '@/features/profile'
import { useAuth } from '@/providers'
import { UpdateUserInput, updateUserSchema } from '@/server'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Modal, TextInput } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
	opened: boolean
	onClose: () => void
}

type FormValues = Omit<UpdateUserInput, 'image'> & {
	file?: File | string | null
}

export const EditProfileModal = ({ onClose, opened }: Props) => {
	const user = useProfileStore(s => s.user)
	const { setUser } = useAuth()
	const updateUserInStore = useProfileStore(s => s.updateUser)
	const {
		handleSubmit,
		control,
		reset,
		getValues,
		formState: { isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(updateUserSchema),
		mode: 'onBlur',
	})

	useEffect(() => {
		if (user) {
			reset({
				name: user.name,
				username: user.username,
				file: user.image,
			})
		}
	}, [user, reset])

	const { mutateAsync: updateUser } = useUpdateUser({
		onSuccess: user => {
			reset({
				name: user.name,
				username: user.username,
			})
			setUser(user)
			updateUserInStore(user)
			onClose()
		},
	})
	const { mutateAsync: updateAvatar } = useUpdateAvatar()

	const onSubmit = async (values: FormValues) => {
		try {
			let image = getValues('file')

			if (user?.image && !image) {
				image = null
			}

			await updateAvatar({
				image,
			})

			await updateUser({
				...values,
			})
		} catch {}
	}

	return (
		<Modal title='Edit profile' opened={opened} onClose={onClose}>
			<form
				className='w-full flex flex-col gap-4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<ImageDropzone
					label='User avatar(optional)'
					name='file'
					control={control}
					defaultValue={user?.image}
					disabled={isSubmitting}
				/>
				<Controller
					control={control}
					name='username'
					render={({ field, fieldState }) => (
						<TextInput
							label='Username'
							placeholder={'username'}
							withAsterisk={false}
							error={fieldState.error?.message}
							leftSection={<IconAt />}
							disabled={isSubmitting}
							required
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name='name'
					render={({ field, fieldState }) => (
						<TextInput
							label='Name'
							placeholder={'Your name'}
							withAsterisk={false}
							error={fieldState.error?.message}
							disabled={isSubmitting}
							required
							{...field}
						/>
					)}
				/>
				<Button type='submit' disabled={isSubmitting}>
					Save
				</Button>
			</form>
		</Modal>
	)
}
