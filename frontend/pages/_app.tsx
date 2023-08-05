import '@/styles/globals.css'
import { Authenticator, Button, useAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import { config } from '@/config'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AuthNavbar } from '@/components/AuthNavbar'

Amplify.configure(config)

const MyNavbar = () => {
	const router = useRouter()
	const { route, signOut } = useAuthenticator((context) => [
		context.route,
		context.signOut,
	])
	function logOut() {
		signOut()
		router.push('/login')
	}
	return (
		<nav>
			<Link href="/">Home</Link>
			<Link href="/protected">Protected</Link>
			<Link href="/protected2">Protected 2</Link>

			{route !== 'authenticated' ? (
				<Button onClick={() => router.push('/login')}>Login</Button>
			) : (
				<Button onClick={() => logOut()}>Logout</Button>
			)}
		</nav>
	)
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Authenticator.Provider>
			<AuthNavbar />
			<Component {...pageProps} />
		</Authenticator.Provider>
	)
}
