'use client'

import { usePostsContext } from '@/providers'
import { type TypeTab } from '@/types'
import { Tabs, TabsList, TabsTab } from '@mantine/core'

export const ContentTabs = () => {
	const { setType, type } = usePostsContext()
	return (
		<Tabs value={type} onChange={type => type && setType(type as TypeTab)}>
			<TabsList>
				<TabsTab value='general'>For you</TabsTab>
				<TabsTab value='following'>Following</TabsTab>
			</TabsList>
		</Tabs>
	)
}
