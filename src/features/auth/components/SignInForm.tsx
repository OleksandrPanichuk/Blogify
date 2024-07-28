'use client'
import { Routes } from '@/constants'
import { signIn, signInSchema, type SignInInput } from '@/features/auth'
import { useAuth } from '@/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from '@mantine/core'

import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export const SignInForm = () => {
	const form = useForm<SignInInput>({
		mode: 'onBlur',
		resolver: zodResolver(signInSchema),
	})

	const { handleSubmit, control } = form

	const router = useRouter()
	const { setUser } = useAuth()

	const onSubmit = async (values: SignInInput) => {
		try {
			const user = await signIn(values)
			setUser(user)
			router.push('/')
		} catch (error) {
			if (error instanceof Error) {
				notifications.show({
					title: 'Sign in failed',
					message: error.message,
					color: 'red',
					icon: <IconX />,
				})
			}
		}
	}
	return (
		<Container size={420} my={40} w={'100%'}>
			<Title ta='center'>Welcome back!</Title>
			<Text c='dimmed' size='sm' ta='center' mt={5}>
				Do not have an account yet?{' '}
				<Anchor size='sm' component={Link} href={Routes.SIGN_UP}>
					Create account
				</Anchor>
			</Text>

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
					name='email'
					render={({ field, fieldState }) => (
						<TextInput
							label='Email'
							placeholder='example@gmail.com'
							type='email'
							required
							withAsterisk
							error={fieldState.error?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name='password'
					render={({ field, fieldState }) => (
						<PasswordInput
							label='Password'
							placeholder='Your password'
							mt='md'
							required
							withAsterisk
							error={fieldState.error?.message}
							{...field}
						/>
					)}
				/>
				<Group justify='space-between' mt='lg'>
					<Checkbox label='Remember me' />
					<Anchor component={Link} href={Routes.FORGOT_PASSWORD} size='sm'>
						Forgot password?
					</Anchor>
				</Group>
				<Button fullWidth mt='xl' type='submit'>
					Sign in
				</Button>
			</Paper>
		</Container>
	)
}
