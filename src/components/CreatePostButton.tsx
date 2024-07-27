import { ActionIcon, Button, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { Visibility } from './Visibility'

export const CreatePostButton = () => {
	return (
		<>
			<Visibility breakpoint='(min-width: 640px)'>
				<Button
					component={Link}
					href='/posts/create'
					leftSection={<IconPlus />}
					className='hidden sm:block'
				>
					Create post
				</Button>
			</Visibility>
			<Visibility breakpoint='(max-width: 639.98px)'>
				<Tooltip position='bottom' label='Create post'>
					<ActionIcon
						component={Link}
						href={'/posts/create'}
						className='sm:hidden'
						size='lg'
					>
						<IconPlus />
					</ActionIcon>
				</Tooltip>
			</Visibility>
		</>
	)
}
