import { type ClassValue, clsx } from 'clsx'
import { formatDate, formatDistanceToNowStrict } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
	if (typeof window !== 'undefined') return path
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function formatCount(
	count: number,
	{ one, plural }: { one: string; plural: string }
) {
	if (count < 10000) {
		return count === 1 ? `${count} ${one}` : `${count} ${plural}`
	}
	if (count < 1_000_000) {
		return `${Math.floor(count / 1000)} thousand ${plural}`
	}
	return `${Math.floor(count / 1_000_000)} million ${plural}`
}

export function formatRelativeDate(from: Date) {
	const currentDate = new Date()
	if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
		return formatDistanceToNowStrict(from, { addSuffix: true })
	} else {
		if (currentDate.getFullYear() === from.getFullYear()) {
			return formatDate(from, 'MMM d')
		} else {
			return formatDate(from, 'MMM d, yyyy')
		}
	}
}
