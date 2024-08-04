'use client'

import { usePostsContext } from '@/providers'
import type { TypeSortBy } from '@/types'
import {
	Button,
	Combobox,
	ComboboxDropdown,
	ComboboxOption,
	ComboboxOptions,
	ComboboxTarget,
	Group,
	useCombobox,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

const sortByOptions: { value: TypeSortBy; label: string }[] = [
	{
		label: 'Most recent',
		value: 'newest',
	},
	{
		label: 'Most popular',
		value: 'popular',
	},
]

type Props = {
	className?: string
}

export const SortBySelect = ({ className }: Props) => {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	})

	const { setSortBy, sortBy } = usePostsContext()

	const options = sortByOptions.map(option => (
		<ComboboxOption
			key={option.value}
			value={option.value}
			active={option.value === sortBy}
		>
			<Group gap='sm'>
				{option.value === sortBy ? <IconCheck size={12} /> : null}
				<span>{option.label}</span>
			</Group>
		</ComboboxOption>
	))

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={val => {
				setSortBy(val as TypeSortBy)
				combobox.closeDropdown()
			}}
			position='bottom-end'
		>
			<ComboboxTarget>
				<Button
					className={className}
					onClick={() => combobox.toggleDropdown()}
					color='gray'
					variant='subtle'
				>
					Sort By
				</Button>
			</ComboboxTarget>
			<ComboboxDropdown miw={150}>
				<ComboboxOptions>{options}</ComboboxOptions>
			</ComboboxDropdown>
		</Combobox>
	)
}
