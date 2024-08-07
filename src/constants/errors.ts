export const FormErrors = {
	required: {
		email: 'Email is required',
		password: 'Password is required',
		username: 'Username is required',
		name: 'Name is required',
		confirmPassword: 'Confirm password is required',
		title: 'Title is required',
		content: 'Content is required',
		description: 'Description is required',
		tags: 'You should provide at least one tag',
		comment: 'Comment is required',
	},
	invalid: {
		email: 'Invalid email address',
		username: 'Username should not contain spaces',
		tags: 'Tag may only contain letters, numbers, _ and -',
	},
	length: {
		password: 'Password is too short',
		tags: 'Tag is too short',
		title: {
			long: 'Title is too long',
			short: 'Title is too short',
		},
		description: 'Description is too short',
		comment: 'Comment is too short',
	},
	match: {
		passwords: "Passwords don't match",
	},
} as const
