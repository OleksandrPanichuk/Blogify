'use client'
import { Routes } from '@/constants'
import { SignUpInput, signUp, signUpSchema } from '@/features/auth'
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
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconAt, IconX } from '@tabler/icons-react'
import { zodResolver } from 'mantine-form-zod-resolver'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const SignUpForm = () => {
	const form = useForm<SignUpInput>({
		mode: 'uncontrolled',
		validateInputOnBlur: true,
		validate: zodResolver(signUpSchema),
	})

	const router = useRouter()

	const onSubmit = async (values: SignUpInput) => {
		try {
			const user = await signUp(values)
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
				onSubmit={form.onSubmit(onSubmit)}
				withBorder
				shadow='md'
				p={30}
				mt={30}
				radius='md'
			>
				<TextInput
					label='Username'
					leftSection={<IconAt size={16} />}
					placeholder='username'
					required
					mt='md'
					key={form.key('username')}
					{...form.getInputProps('username')}
				/>
				<TextInput
					label='Email'
					placeholder='example@gmail.com'
					required
					type='email'
					mt='md'
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
				<Button fullWidth mt='xl' type='submit'>
					Create account
				</Button>
			</Paper>
		</Container>
	)
}
