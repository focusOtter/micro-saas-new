import '@/styles/globals.css'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import { config } from '@/config'
import { AuthNavbar } from '@/components/AuthNavbar'
import { Footer } from '@/components/Footer'

Amplify.configure(config)

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Authenticator.Provider>
			<AuthNavbar />
			<Component {...pageProps} />
			<Footer />
		</Authenticator.Provider>
	)
}
