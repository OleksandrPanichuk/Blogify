'use client'

import { type TypeTab, usePostsStore } from '@/features/posts'
import { Tabs, TabsList, TabsTab } from '@mantine/core'

export const ContentTabs = () => {
	const { setTab, tab } = usePostsStore(s => ({ tab: s.tab, setTab: s.setTab }))
	return (
		<Tabs value={tab} onChange={tab => tab && setTab(tab as TypeTab)} >
			<TabsList>
				<TabsTab value='general'>For you</TabsTab>
				<TabsTab value='following'>Following</TabsTab>
			</TabsList>
		</Tabs>
	)
}
