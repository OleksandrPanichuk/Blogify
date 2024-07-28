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
		tags: 'You should provide at least one tag'
	},
	invalid: {
		email: 'Invalid email address',
	},
	length: {
		password: 'Password is too short',
		tags: 'Tag is too short',
		title: {
			long: 'Title is too long',
			short: 'Title is too short',
		},
		description: 'Description is too short',
	},
	match: {
		passwords: "Passwords don't match",
	},
} as const
