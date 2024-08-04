import { IconLoader2 } from '@tabler/icons-react'

export const Loader = () => {
	return (
		<div className='w-full flex justify-center pt-4'>
			<IconLoader2 size={40} className='animate-spin' />
		</div>
	)
}
