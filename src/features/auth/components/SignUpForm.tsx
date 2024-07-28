'use client'
import { Routes } from '@/constants'
import { SignUpInput, signUp, signUpSchema } from '@/features/auth'
import { useAuth } from '@/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Anchor,
	Button,
	Container,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from '@mantine/core'

import { notifications } from '@mantine/notifications'
import { IconAt, IconX } from '@tabler/icons-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export const SignUpForm = () => {
	const { control, handleSubmit } = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
		mode: 'onBlur',
	})

	const { setUser } = useAuth()

	const router = useRouter()

	const onSubmit = async (values: SignUpInput) => {
		try {
			const user = await signUp(values)
			setUser(user)
			router.push('/')
		} catch (error) {
			if (error instanceof Error) {
				notifications.show({
					title: 'Sign up failed',
					message: error.message,
					color: 'red',
					icon: <IconX />,
				})
			}
		}
	}

	return (
		<Container size={420} my={40} w={'100%'}>
			<Title ta='center'>Sign Up</Title>
			<Text c='dimmed' size='sm' ta='center' mt={5}>
				Already have an account?{' '}
				<Anchor size='sm' component={Link} href={Routes.SIGN_IN}>
					Sign In
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
					name='username'
					render={({ field, fieldState }) => (
						<TextInput
							label='Username'
							leftSection={<IconAt size={16} />}
							placeholder='username'
							mt='md'
							required
							withAsterisk
							error={fieldState.error?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name='email'
					render={({ field, fieldState }) => (
						<TextInput
							label='Email'
							placeholder='example@gmail.com'
							type='email'
							mt='md'
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
				<Button fullWidth mt='xl' type='submit'>
					Create account
				</Button>
			</Paper>
		</Container>
	)
}
