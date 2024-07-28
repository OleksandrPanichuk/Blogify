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

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

export const CreatePostForm = () => {
	const form = useForm<CreatePostInput>({
		resolver: zodResolver(createPostSchema),
		mode: 'onBlur',
	})

	const { control, handleSubmit } = form

	const { mutate: createPost } = api.posts.create.useMutation({})

	return (
		<Container size={800} w={'100%'} pb={100}>
			<Title order={1} mb={24}>
				Create Post
			</Title>
			<Flex component={'form'} gap={'1rem'} direction={'column'}>
				<ImageDropzone name='image' control={control} />
				<Controller
					control={control}
					name='title'
					render={({ field, fieldState }) => (
						<TextInput
							label='Title'
							placeholder={'Post title'}
							withAsterisk={false}
							required
							error={fieldState.error?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name='description'
					render={({ field, fieldState }) => (
						<Textarea
							label='Description'
							placeholder='Provide short description of your post'
							minRows={2}
							withAsterisk={false}
							autosize
							required
							error={fieldState.error?.message}
							{...field}
						/>
					)}
				/>
				<Flex direction={'column'} gap={4}>
					<Text size='sm'>Content</Text>
					<Controller
						control={control}
						name='content'
						render={({ field }) => (
							<Editor initialContent={null} onChange={field.onChange} />
						)}
					/>
				</Flex>
			</Flex>
		</Container>
	)
}
