'use client'

import { useCreateComment } from '@/api'
import { CreateCommentInput, createCommentSchema } from '@/server'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Textarea } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { usePostStore } from '../store'

type Props = {
	postId: string
}

export const CommentForm = ({ postId }: Props) => {
	const { handleSubmit, control, reset } = useForm<CreateCommentInput>({
		mode: 'onBlur',
		resolver: zodResolver(createCommentSchema),
		defaultValues: {
			postId,
			text: '',
		},
	})

	const incrementCount = usePostStore(s => s.incrementCommentsCount)
	const { mutate: createComment, isPending } = useCreateComment({
		onSuccess: () => {
			incrementCount()
			reset({
				postId,
				text: '',
			})
		},
	})

	const onSubmit = async (values: CreateCommentInput) => createComment(values)

	return (
		<Flex
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
			direction='column'
			gap={8}
		>
			<Controller
				control={control}
				name='text'
				render={({ field }) => (
					<Textarea
						minRows={3}
						placeholder='Leave your comment here'
						disabled={isPending}
						autosize
						{...field}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>
			<Flex justify='flex-end'>
				<Button disabled={isPending} type='submit'>
					Respond
				</Button>
			</Flex>
		</Flex>
	)
}
