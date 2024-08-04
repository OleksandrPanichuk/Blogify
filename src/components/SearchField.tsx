'use client'
import { Routes } from '@/constants'
import { ActionIcon, Box, TextInput, Transition } from '@mantine/core'
import {
	useClickOutside,
	useDebouncedValue,
	useDisclosure,
} from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Visibility } from './Visibility'

export const SearchField = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const [opened, { close, open }] = useDisclosure()
	const [value, setValue] = useState<string>(searchParams.get('q') ?? '')
	const [debouncedSearchValue] = useDebouncedValue(value, 500)

	const clickOutsideRef = useClickOutside(close)

	useEffect(() => {
		setValue('')
	},[pathname])

	useEffect(() => {
		if (
			debouncedSearchValue &&
			debouncedSearchValue !== searchParams.get('q')
		) {
			return router.push(
				`${
					 pathname
				}?q=${debouncedSearchValue}`
			)
		}

		if (!debouncedSearchValue && searchParams.get('q')) {
			router.push(pathname)
		}
	}, [debouncedSearchValue, searchParams, router, pathname])


	const onFocus = () => {
		if(pathname === Routes.NOTIFICATIONS || pathname === Routes.TAGS) {
			router.push(Routes.POSTS)
		}
	}

	return (
		<>
			<Visibility breakpoint='(min-width: 640px)'>
				<TextInput
					placeholder='Search'
					className='hidden sm:block'
					leftSection={<IconSearch />}
					value={value}
					onChange={e => setValue(e.target.value)}
					onFocus={onFocus}
				/>
			</Visibility>
			<Visibility breakpoint='(max-width: 639.98px)'>
				<ActionIcon
					className='sm:hidden'
					color='gray'
					variant='outline'
					size={'lg'}
					onClick={open}
				>
					<IconSearch />
				</ActionIcon>
				<Transition
					mounted={opened}
					transition={'fade-down'}
					duration={400}
					timingFunction='ease'
				>
					{styles => (
						<Box
							ref={clickOutsideRef}
							pos='absolute'
							top={0}
							left={0}
							w={'100%'}
							h={60}
						>
							<TextInput
								style={styles}
								placeholder='Search'
								className='hidden sm:block'
								leftSection={<IconSearch />}
								value={value}
								onChange={e => setValue(e.target.value)}
								onFocus={onFocus}
							/>
						</Box>
					)}
				</Transition>
			</Visibility>
		</>
	)
}
