import { Button, Flex, Paper } from "@mantine/core"
import { IconBookmark, IconHome, IconNotification } from "@tabler/icons-react"
import Link from "next/link"

export const Navigation = () => {
	return <Paper

	p={12}
	className='lg:w-1/6 w-min gap-2 flex flex-col sticky top-[76px] left-0'
	withBorder
>
	<Button
		component={Link}
		href='/'
		color='gray'
		variant='subtle'
		w={'100%'}
		className='px-[5px] lg:px-2 flex justify-start'
	>
		<Flex
			component='span'
			className='flex justify-start items-center lg:gap-2'
		>
			<IconHome />
			<span className='hidden lg:inline'>Home</span>
		</Flex>
	</Button>
	<Button
		component={Link}
		href='/notifications'
		color='gray'
		variant='subtle'
		w={'100%'}
		className='px-[5px] lg:px-2 flex justify-start'
	>
		<Flex
			component='span'
			className='flex justify-start items-center lg:gap-2'
		>
			<IconNotification />
			<span className='hidden lg:inline'>Notifications</span>
		</Flex>
	</Button>
	<Button
		component={Link}
		href='/bookmarks'
		color='gray'
		variant='subtle'
		w={'100%'}
		className='px-[5px] lg:px-2 flex justify-start'
	>
		<Flex
			component='span'
			className='flex justify-start items-center lg:gap-2'
		>
			<IconBookmark />
			<span className='hidden lg:inline'>Bookmarks</span>
		</Flex>
	</Button>
</Paper>
};
