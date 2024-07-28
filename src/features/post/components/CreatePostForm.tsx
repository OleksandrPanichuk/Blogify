'use client'
import { Editor, ImageDropzone } from '@/features/post'
import { api } from '@/providers'
import { CreatePostInput, createPostSchema } from '@/server'
import {
	Container,
	Flex,
	Text,
	Textarea,
	TextInput,
	Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'

export const CreatePostForm = () => {
	const form = useForm<Omit<CreatePostInput, 'file'>>({
		validate: zodResolver(createPostSchema),
		mode: 'uncontrolled',
		validateInputOnBlur: true,
	})

	const {} = form

	const { mutate: createPost } = api.posts.create.useMutation({})

	return (
		<Container size={800} w={'100%'} pb={100}>
			<Title order={1} mb={24}>
				Create Post
			</Title>
			<Flex component={'form'} gap={'1rem'} direction={'column'}>
				<ImageDropzone />
				<TextInput
					label='Title'
					placeholder={'Post title'}
					withAsterisk={false}
					required
					key={form.key('title')}
					{...form.getInputProps('title')}
				/>
				<Textarea
					label='Description'
					placeholder='Provide short description of your post'
					minRows={2}
					withAsterisk={false}
					autosize
					required
					key={form.key('description')}
					{...form.getInputProps('description')}
				/>
				<Flex direction={'column'} gap={4}>
					<Text size='sm'>Content</Text>
					<Editor
						initialContent={null}
						onChange={form.getInputProps('content').onChange}
					/>
				</Flex>
			</Flex>
		</Container>
	)
}
