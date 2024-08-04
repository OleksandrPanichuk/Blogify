export function extractUsername(notification: string) {
	const splited = notification.split('@')
	const before = splited[0].trim()
	const username =  splited[1].split(' ')[0]
	const after = splited[1].split(' ').slice(1).join(' ').trim()

	return {
		before,
		username,
		after,
	}
}
