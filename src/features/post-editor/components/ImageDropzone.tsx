'use client'
import { ActionIcon, Box, Flex, Group, Image, rem, Text } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface IImageDropzoneProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	disabled?: boolean
}

export const ImageDropzone = <T extends FieldValues = FieldValues>({
	control,
	name,
}: IImageDropzoneProps<T>) => {
	const { field } = useController({ control, name })
	const [file, setFile] = useState<File>()

	return (
		<Flex direction={'column'} gap={4}>
			<Text size='sm'>Preview image(optional)</Text>
			{file ? (
				<Box pos={'relative'}>
					<Image
						mih={220}
						w={'100%'}
						src={URL.createObjectURL(file)}
						alt='preview image'
					/>
					<ActionIcon
						className='rounded-full absolute top-4 right-4'
						onClick={() => {
							setFile(undefined)
							field.onChange(undefined)
						}}
						color='red'
					>
						<IconX />
					</ActionIcon>
				</Box>
			) : (
				<Dropzone
					onDrop={files => {
						setFile(files[0])
						field.onChange(files[0])
					}}
					onReject={files => console.log('rejected files', files)}
					maxSize={5 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					ref={field.ref}
					inputProps={{
						name: field.name,
					}}
				>
					<Group
						justify='center'
						gap='xl'
						mih={220}
						style={{ pointerEvents: 'none' }}
					>
						<Dropzone.Accept>
							<IconUpload
								style={{
									width: rem(52),
									height: rem(52),
									color: 'var(--mantine-color-blue-6)',
								}}
								stroke={1.5}
							/>
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX
								style={{
									width: rem(52),
									height: rem(52),
									color: 'var(--mantine-color-red-6)',
								}}
								stroke={1.5}
							/>
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconPhoto
								style={{
									width: rem(52),
									height: rem(52),
									color: 'var(--mantine-color-dimmed)',
								}}
								stroke={1.5}
							/>
						</Dropzone.Idle>

						<div>
							<Text size='xl' inline>
								Drag images here or click to select files
							</Text>
						</div>
					</Group>
				</Dropzone>
			)}
		</Flex>
	)
}
