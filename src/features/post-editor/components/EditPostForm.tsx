'use client'
import { Editor, TagsInput } from '@/features/post-editor'
import {
	GetPostByIdWithTagsResponse,
	UpdatePostInput,
	updatePostSchema,
} from '@/server'
import {
	Container,
	Flex,
	Text,
	Textarea,
	TextInput,
	Title,
} from '@mantine/core'

import { useUpdatePost } from '@/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { ImageDropzone } from '@/components'

type FormValues = Omit<UpdatePostInput, 'image'> & {
	file?: File | string | null
}

type Props = {
	defaultData: GetPostByIdWithTagsResponse
}

export const EditPostForm = ({ defaultData }: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(updatePostSchema),
		mode: 'onBlur',
		defaultValues: {
			id: defaultData.id,
			title: defaultData.title,
			description: defaultData.description,
			content: defaultData.content,
			file: defaultData.image,
			tags: defaultData.tags.map(tag => tag.name),
		},
	})

	const { control, handleSubmit } = form

	const { mutateAsync: updatePost, isPending: isSubmitting } = useUpdatePost()

	const onSubmit = (values: FormValues) => {
		let image = form.getValues('file')

		if (defaultData.image && !image) {
			image = null
		}

		updatePost({
			...values,
			image,
		})
	}

	return (
		<Container w={'100%'} pb={100}>
			<Title order={1} mb={24}>
				Edit Post
			</Title>
			<Flex
				component={'form'}
				onSubmit={handleSubmit(onSubmit)}
				gap={'1rem'}
				direction={'column'}
				id='post-edit-form'
			>
				<ImageDropzone
					label='Preview image(optional)'
					name='file'
					control={control}
					disabled={isSubmitting}
					defaultValue={defaultData.image}
				/>
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
								initialContent={defaultData.content}
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
