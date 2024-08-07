'use client'

import { useUsersStore } from '@/features/users'
import { GetTagsInput, GetUsersInput } from '@/server'
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

const sortByOptions: {
	value: NonNullable<GetUsersInput['sortBy']>
	label: string
}[] = [
	{
		label: 'Name',
		value: 'name',
	},
	{
		label: 'Followers',
		value: 'followers',
	},
]

export const UsersSortBySelect = () => {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	})

	const { setSortBy, sortBy } = useUsersStore(s => ({
		sortBy: s.sortBy,
		setSortBy: s.setSortBy,
	}))

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
				setSortBy(val as GetUsersInput['sortBy'])
				combobox.closeDropdown()
			}}
			position='bottom-end'
		>
			<ComboboxTarget>
				<Button
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
