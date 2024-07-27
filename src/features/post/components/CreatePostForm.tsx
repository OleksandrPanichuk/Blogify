'use client'
import { api } from '@/providers'
import { CreatePostInput, createPostSchema } from '@/server'
import { Container, Flex, Textarea, TextInput, Title, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { Editor } from './Editor'

export const CreatePostForm = () => {
	const form = useForm<CreatePostInput>({
		validate: zodResolver(createPostSchema),
		mode: 'uncontrolled',
		validateInputOnBlur: true,
	})

	const {} = form

	const { mutate: createPost } = api.posts.create.useMutation({})

	return (
		<Container size={600} w={'100%'}>
			<Title order={1} mb={24}>
				Create Post
			</Title>
			<Flex component={'form'} gap={'1rem'} direction={'column'}>
				<TextInput
					label='Title'
					placeholder={'Post title'}
					required
					withAsterisk
					key={form.key('title')}
					{...form.getInputProps('title')}
				/>
				<Textarea
					label='Description'
					placeholder='Provide short description of your post'
					minRows={2}
					autosize
					required
					withAsterisk
					key={form.key('description')}
					{...form.getInputProps('description')}
				/>
				<Flex>
					<Text>Content</Text>
					<Editor
						initialContent={null}
						onChange={form.getInputProps('content').onChange}
					/>
				</Flex>
			</Flex>
		</Container>
	)
}
