'use client'
import { ColorSchemeSelect } from '@/components/common'
import { Button } from '@mantine/core'
import Link from 'next/link'

const Page = () => {
	return (
		<div>
			<ColorSchemeSelect />
			<Button component={Link} href={'/sign-in'}>
				Sign In
			</Button>
		</div>
	)
}

export default Page
