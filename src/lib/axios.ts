import baseAxios from 'axios'

export const axios = baseAxios.create({
	baseURL: '/api',
	withCredentials: true,
})
