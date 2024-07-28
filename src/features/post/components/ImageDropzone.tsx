'use client'
import { Flex, Group, rem, Text } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { useState } from 'react'

export const ImageDropzone = () => {
	const [file, setFile] = useState<File>()
	return (
		<Flex direction={'column'} gap={4}>
			<Text size='sm'>Preview image(optional)</Text>
			<Dropzone
				onDrop={files => console.log('accepted files', files)}
				onReject={files => console.log('rejected files', files)}
				maxSize={5 * 1024 ** 2}
				accept={IMAGE_MIME_TYPE}
				multiple={false}
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
		</Flex>
	)
}
