import { useAuthenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

type RequireAuthProps = {
	children: ReactNode
}
export function RequireAuth({ children }: RequireAuthProps) {
	const router = useRouter()

	const { route } = useAuthenticator((context) => [context.route])
	console.log(route)
	useEffect(() => {
		if (route !== 'authenticated') {
			router.push('/login?redirectTo=' + router.pathname)
		}
	}, [route, router])

	return children
}
