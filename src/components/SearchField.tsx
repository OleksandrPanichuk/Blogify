'use client'
import { ActionIcon, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Visibility } from './Visibility'

export const SearchField = () => {
	const router = useRouter()

	const [value, setValue] = useState('')

	const [debouncedValue] = useDebouncedValue(value, 500)

	useEffect(() => {
		if (debouncedValue) {
			router.push(`/search?q=${debouncedValue}`)
		}
	}, [debouncedValue, router])

	return (
		<>
			<Visibility breakpoint='(min-width: 640px)'>
				<TextInput
					placeholder='Search'
					className='hidden sm:block'
					leftSection={<IconSearch />}
				/>
			</Visibility>
			<Visibility breakpoint='(max-width: 639.98px)'>
				<ActionIcon
					className='sm:hidden'
					color='gray'
					variant='outline'
					size={'lg'}
					component={Link}
					href='/search'
				>
					<IconSearch />
				</ActionIcon>
			</Visibility>
		</>
	)
}
