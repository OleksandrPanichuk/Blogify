'use client'
import {
	ResetPasswordInput,
	resetPassword,
	resetPasswordSchema,
} from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, Paper, PasswordInput, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export const ResetPasswordForm = ({ token }: { token: string }) => {
	const form = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema),
		mode: 'onBlur',
	})

	const { control, handleSubmit } = form

	const router = useRouter()

	const onSubmit = async (values: ResetPasswordInput) => {
		try {
			await resetPassword(values, token)
			router.push('/')
		} catch (error) {
			if (error instanceof Error) {
				notifications.show({
					title: 'Failed to reset password',
					message: error.message,
					color: 'red',
					icon: <IconX />,
				})
			}
		}
	}

	return (
		<Container size={420} my={40} w={'100%'}>
			<Title ta='center'>Reset Password</Title>

			<Paper
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				withBorder
				shadow='md'
				p={30}
				mt={30}
				radius='md'
			>
				<Controller
					control={control}
					name='password'
					render={({ field, fieldState }) => (
						<PasswordInput
							label='Password'
							placeholder='Your password'
							required
							mt='md'
							error={fieldState.error?.message}
							{...field}
						/>
					)}
				/>

				<Controller
					control={control}
					name='confirmPassword'
					render={({ field, fieldState }) => (
						<PasswordInput
							label='Password'
							placeholder='Your password'
							required
							mt='md'
							error={fieldState.error?.message}
							{...field}
						/>
					)}
				/>
				<Button fullWidth mt='xl' type='submit'>
					Reset password
				</Button>
			</Paper>
		</Container>
	)
}
