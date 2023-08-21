import { useEffect } from 'react'
import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useRouter } from 'next/router'

export default function Login() {
	const router = useRouter()
	const intendedRoute = (router.query.redirectTo || '/') as string
	const { route } = useAuthenticator((context) => [context.route])

	useEffect(() => {
		if (route === 'authenticated') {
			router.push(intendedRoute)
		}
	}, [router, route, intendedRoute])
	return (
		<View className="auth-wrapper">
			<Authenticator
				signUpAttributes={['email']}
				socialProviders={['google']}
			></Authenticator>
		</View>
	)
}
