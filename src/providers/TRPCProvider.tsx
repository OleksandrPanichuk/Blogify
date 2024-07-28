'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState } from 'react'

import { absoluteUrl } from '@/lib'
import type { AppRouter } from '@/server'
import superJSON from 'superjson'

export const api = createTRPCReact<AppRouter>()

export function TRPCProvider(props: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			})
	)

	const [trpcClient] = useState(() =>
		api.createClient({
			transformer: superJSON,
			links: [
				loggerLink({
					enabled: op =>
						process.env.NODE_ENV === 'development' ||
						(op.direction === 'down' && op.result instanceof Error),
				}),
				unstable_httpBatchStreamLink({
					url: absoluteUrl('/api/trpc'),
				}),
			],
		})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<api.Provider client={trpcClient} queryClient={queryClient}>
				{props.children}
			</api.Provider>
		</QueryClientProvider>
	)
}
