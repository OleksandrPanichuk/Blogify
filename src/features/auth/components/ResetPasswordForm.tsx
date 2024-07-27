'use client'
import {
	ResetPasswordInput,
	resetPassword,
	resetPasswordSchema,
} from '@/features/auth'
import { Button, Container, Paper, PasswordInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useRouter } from 'next/navigation'

export const ResetPasswordForm = ({ token }: { token: string }) => {
	const form = useForm<ResetPasswordInput>({
		mode: 'uncontrolled',
		validateInputOnChange: true,
		validateInputOnBlur: true,
		validate: zodResolver(resetPasswordSchema),
	})

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
				onSubmit={form.onSubmit(onSubmit)}
				withBorder
				shadow='md'
				p={30}
				mt={30}
				radius='md'
			>
				<PasswordInput
					label='Password'
					placeholder='Your password'
					required
					mt='md'
					key={form.key('password')}
					{...form.getInputProps('password')}
				/>

				<PasswordInput
					label='Password'
					placeholder='Your password'
					required
					mt='md'
					key={form.key('confirmPassword')}
					{...form.getInputProps('confirmPassword')}
				/>
				<Button fullWidth mt='xl' type='submit'>
					Reset password
				</Button>
			</Paper>
		</Container>
	)
}
