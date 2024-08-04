'use client'
import { cn } from '@/lib'
import { api } from '@/providers'
import {
	CheckIcon,
	Combobox,
	Flex,
	Group,
	Pill,
	PillsInput,
	Text,
	useCombobox,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { ChangeEvent, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface ITagInputProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	disabled?: boolean
}

export function TagsInput<T extends FieldValues = FieldValues>({
	control,
	name,
	disabled,
}: ITagInputProps<T>) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
	})

	const { field, fieldState } = useController({ control, name })
	const { value, onChange } = field

	const [search, setSearch] = useState('')
	const [created, setCreated] = useState<string[]>([])

	const [debouncedSearchValue] = useDebouncedValue(search, 500)

	const { data } = api.tags.get.useQuery({
		searchValue: debouncedSearchValue,
		take: 20,
	})
	const tagsFromDB = data?.tags ?? []

	const fullData = [...created, ...tagsFromDB.map(el => el.name)]

	const exactOptionMatch = fullData.some(item => item === search)

	const handleValueSelect = (val: string) => {
		setSearch('')

		if (val === '$create') {
			const getNewValue = (current: string[]): string[] => {
				let newItem: string = search.startsWith('#') ? search : `#${search}`
				newItem = newItem.replace(/\s/g, '-')

				return [...current, newItem]
			}
			setCreated(getNewValue)
			onChange(getNewValue(value ?? []))
		} else {
			onChange(value?.includes(val) ? value : [...(value ?? []), val])
		}
	}

	const handleValueRemove = (val: string) => {
		onChange((value as string[])?.filter(v => v !== val))
	}

	const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		combobox.updateSelectedOptionIndex()
		setSearch(e.currentTarget.value.replace(/\s/g, '-'))
	}

	const values = (value as string[])?.map(item => (
		<Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
			{item}
		</Pill>
	))

	const options = fullData
		.filter(item => item.toLowerCase().includes(search.trim().toLowerCase()))
		.map(item => (
			<Combobox.Option value={item} key={item} active={value?.includes(item)}>
				<Group gap='sm'>
					{value?.includes(item) ? <CheckIcon size={12} /> : null}
					<span>{item.startsWith('#') ? item : `#${item}`}</span>
				</Group>
			</Combobox.Option>
		))

	return (
		<Flex direction={'column'} gap={4}>
			<Text size='sm'>Tags</Text>
			<Combobox
				store={combobox}
				onOptionSubmit={handleValueSelect}
				withinPortal={false}
				disabled={disabled}
			>
				<Combobox.DropdownTarget>
					<PillsInput
						disabled={disabled}
						onClick={() => combobox.openDropdown()}
					>
						<Pill.Group>
							{values}

							<Combobox.EventsTarget>
								<PillsInput.Field
									onFocus={() => combobox.openDropdown()}
									onBlur={() => combobox.closeDropdown()}
									value={search}
									placeholder='Search values'
									onChange={handleSearchValueChange}
									disabled={disabled}
									onKeyDown={event => {
										if (event.key === 'Backspace' && search.length === 0) {
											event.preventDefault()
											handleValueRemove(value?.[value.length - 1])
										}
									}}
								/>
							</Combobox.EventsTarget>
						</Pill.Group>
					</PillsInput>
				</Combobox.DropdownTarget>

				<Combobox.Dropdown
					mah={300}
					className={cn(
						!options.length && !search && 'hidden',
						'overflow-y-auto'
					)}
				>
					<Combobox.Options>
						{options}

						{!exactOptionMatch && search.trim().length > 0 && (
							<Combobox.Option value='$create'>
								+ Create {search.startsWith('#') ? search : '#' + search}
							</Combobox.Option>
						)}

						{exactOptionMatch &&
							search.trim().length > 0 &&
							options.length === 0 && (
								<Combobox.Empty>Nothing found</Combobox.Empty>
							)}
					</Combobox.Options>
				</Combobox.Dropdown>
			</Combobox>
			<Text c='red' size='sm'>
				{fieldState.error?.message}
			</Text>
		</Flex>
	)
}
