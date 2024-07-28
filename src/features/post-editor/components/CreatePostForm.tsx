'use client'
import { Editor, ImageDropzone, TagsInput } from '@/features/post-editor'
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

import { uploadFile } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'

type FormValues = Omit<CreatePostInput, 'image'> & {
	file?: File
}

export const CreatePostForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(createPostSchema),
		mode: 'onBlur',
	})

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form

	const { mutateAsync: createPost } = api.posts.create.useMutation({})

	const onSubmit = async ({ file, ...values }: FormValues) => {
		const fileToUpload = file ?? form.getValues('file')
		try {
			const url = fileToUpload ? await uploadFile(fileToUpload) : undefined

			await createPost({
				...values,
				image: url,
			})

			notifications.show({
				message: 'Post created successfully',
				icon: <IconCheck />,
				color: 'green',
			})
		} catch (err) {
			notifications.show({
				message: 'Failed to create post',
				icon: <IconX />,
				color: 'red',
			})
		}
	}

	return (
		<Container size={800} w={'100%'} pb={100} mt={24}>
			<Title order={1} mb={24}>
				Create Post
			</Title>
			<Flex
				component={'form'}
				onSubmit={handleSubmit(onSubmit)}
				gap={'1rem'}
				direction={'column'}
				id='post-create-form'
			>
				<ImageDropzone name='file' control={control} disabled={isSubmitting} />
				<Controller
					control={control}
					name='title'
					render={({ field, fieldState }) => (
						<TextInput
							label='Title'
							placeholder={'Post title'}
							withAsterisk={false}
							error={fieldState.error?.message}
							disabled={isSubmitting}
							required
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
							error={fieldState.error?.message}
							disabled={isSubmitting}
							required
							autosize
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
							<Editor
								initialContent={null}
								onChange={field.onChange}
								disabled={isSubmitting}
							/>
						)}
					/>
				</Flex>
				<TagsInput control={control} name='tags' disabled={isSubmitting} />
			</Flex>
		</Container>
	)
}
