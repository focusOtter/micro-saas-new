// components/Login.js
import { useEffect } from 'react'

import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useRouter } from 'next/router'

export default function Login() {
	const { back } = useRouter()

	const { route } = useAuthenticator((context) => [context.route])

	useEffect(() => {
		if (route === 'authenticated') {
			back()
		}
	}, [route, back])
	return (
		<View className="auth-wrapper">
			<Authenticator></Authenticator>
		</View>
	)
}
