import backendOutput from './output.json'

export const config = {
	aws_project_region: backendOutput.MicroSaaSStack.region,
	aws_appsync_graphqlEndpoint: backendOutput.MicroSaaSStack.awsappsyncapiURL,
	aws_appsync_region: backendOutput.MicroSaaSStack.region,
	aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
	Auth: {
		region: backendOutput.MicroSaaSStack.region,
		userPoolId: backendOutput.MicroSaaSStack.userPoolId,
		userPoolWebClientId: backendOutput.MicroSaaSStack.userPoolWebClientId,
		identityPoolId: backendOutput.MicroSaaSStack.identityPoolId,
		oauth: {
			domain: backendOutput.MicroSaaSStack.UserPoolDomainUrl,
			scope: [
				'phone',
				'email',
				'profile',
				'openid',
				'aws.cognito.signin.user.admin',
			],
			redirectSignIn: 'http://localhost:3000/',
			redirectSignOut: 'http://localhost:3000/',
			responseType: 'code',
		},
	},
	Storage: {
		AWSS3: {
			bucket: backendOutput.MicroSaaSStack.bucket,
			region: backendOutput.MicroSaaSStack.region,
		},
	},
}
