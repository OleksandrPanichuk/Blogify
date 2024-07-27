'use client'
import { useMediaQuery } from '@mantine/hooks'

type VisibilityProps = {
	hide?: boolean
	children: React.ReactNode
	breakpoint: string
}

export function Visibility(props: VisibilityProps) {
	const { hide, children, breakpoint } = props

	const show = useMediaQuery(breakpoint, true)

	const isVisible = hide ? !show : !!show

	const rendered = isVisible ? children : null
	return rendered as React.ReactElement
}
