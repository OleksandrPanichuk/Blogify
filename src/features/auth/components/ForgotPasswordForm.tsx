'use client'
import { Routes } from '@/constants'
import {
	Anchor,
	Box,
	Button,
	Center,
	Container,
	Group,
	Paper,
	rem,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react'
import { zodResolver } from 'mantine-form-zod-resolver'
import Link from 'next/link'
import { sendResetPasswordLink } from '../api'
import { forgotPasswordSchema } from '../schemas'
import type { ForgotPasswordInput } from '../types'

export function ForgotPasswordForm() {
	const form = useForm<ForgotPasswordInput>({
		validate: zodResolver(forgotPasswordSchema),
		mode: 'uncontrolled',
		validateInputOnBlur: true,
	})

	const onSubmit = async (values: ForgotPasswordInput) => {
		try {
			await sendResetPasswordLink(values.email)
			notifications.show({
				title: 'Check your email',
				message: 'Check your email address for a reset link',
				color: 'green',
				icon: <IconCheck />,
				autoClose: 2000,
			})
		} catch (error) {
			if (error instanceof Error) {
				notifications.show({
					title: 'Reset password failed',
					message: error.message,
					color: 'red',
					icon: <IconX />,
					autoClose: 2000,
				})
			}
		}
	}
	return (
		<Container size={460} my={30}>
			<Title ta='center'>Forgot your password?</Title>
			<Text c='dimmed' fz='sm' ta='center'>
				Enter your email to get a reset link
			</Text>

			<Paper
				component='form'
				onSubmit={form.onSubmit(onSubmit)}
				withBorder
				shadow='md'
				p={30}
				radius='md'
				mt='xl'
			>
				<TextInput
					label='Your email'
					placeholder='example@gmail.com'
					required
					key={form.key('email')}
					{...form.getInputProps('email')}
				/>
				<Group justify='space-between' mt='lg'>
					<Anchor component={Link} href={Routes.SIGN_IN} c='dimmed' size='sm'>
						<Center inline>
							<IconArrowLeft
								style={{ width: rem(12), height: rem(12) }}
								stroke={1.5}
							/>
							<Box ml={5}>Back to the login page</Box>
						</Center>
					</Anchor>
					<Button type='submit'>Reset password</Button>
				</Group>
			</Paper>
		</Container>
	)
}
