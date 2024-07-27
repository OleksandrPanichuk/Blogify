export const FormErrors = {
	required: {
		email: 'Email is required',
		password: 'Password is required',
		username: 'Username is required',
		name: 'Name is required',
		confirmPassword: 'Confirm password is required',
	},
	invalid: {
		email: 'Invalid email address',
	},
	length: {
		password: 'Password is too short',
	},
	match: {
		passwords: "Passwords don't match",
	},
} as const
