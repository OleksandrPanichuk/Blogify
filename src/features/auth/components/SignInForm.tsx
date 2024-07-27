'use client'
import { Routes } from '@/constants'
import { signIn, signInSchema, type SignInInput } from '@/features/auth'
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
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { zodResolver } from 'mantine-form-zod-resolver'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const SignInForm = () => {
	const form = useForm<SignInInput>({
		mode: 'uncontrolled',
		validateInputOnBlur: true,
		validate: zodResolver(signInSchema),
	})

	const router = useRouter()

	const onSubmit = async (values: SignInInput) => {
		try {
			await signIn(values)
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
				onSubmit={form.onSubmit(onSubmit)}
				withBorder
				shadow='md'
				p={30}
				mt={30}
				radius='md'
			>
				<TextInput
					label='Email'
					placeholder='example@gmail.com'
					type='email'
					required
					key={form.key('email')}
					{...form.getInputProps('email')}
				/>
				<PasswordInput
					label='Password'
					placeholder='Your password'
					required
					mt='md'
					key={form.key('password')}
					{...form.getInputProps('password')}
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
