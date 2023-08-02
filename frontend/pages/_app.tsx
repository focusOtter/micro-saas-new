import '@/styles/globals.css'
import { AmplifyProvider } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import backendOutput from '../output.json'

const config = {
	aws_project_region: backendOutput.MicroSaaSStack.region,
	Auth: {
		region: backendOutput.MicroSaaSStack.region,
		userPoolId: backendOutput.MicroSaaSStack.userPoolId,
		userPoolWebClientId: backendOutput.MicroSaaSStack.userPoolWebClientId,
		identityPoolId: backendOutput.MicroSaaSStack.identityPoolId,
	},
	Storage: {
		AWSS3: {
			bucket: backendOutput.MicroSaaSStack.bucket,
			region: backendOutput.MicroSaaSStack.region,
		},
	},
	aws_appsync_graphqlEndpoint: backendOutput.MicroSaaSStack.awsappsyncapiURL,
	aws_appsync_region: backendOutput.MicroSaaSStack.region,
	aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
}

Amplify.configure(config)

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AmplifyProvider>
			<Component {...pageProps} />
		</AmplifyProvider>
	)
}
