import { Construct } from 'constructs'
import * as awsCognito from 'aws-cdk-lib/aws-cognito'
import {
	IdentityPool,
	UserPoolAuthenticationProvider,
} from '@aws-cdk/aws-cognito-identitypool-alpha'
import { envNameContext } from '../../cdk.context'
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'

type CreateSaasAuth = {
	appName: string
	stage: envNameContext
	google: {
		clientSecretName: string
		clientId: string
		callbackUrls: string[]
		logoutUrls: string[]
	}
}

export function createSaasAuth(scope: Construct, props: CreateSaasAuth) {
	const userPool = new awsCognito.UserPool(
		scope,
		`${props.appName}-${props.stage}-userpool`,
		{
			userPoolName: `${props.appName}-${props.stage}-userpool`,
			selfSignUpEnabled: true,
			accountRecovery: awsCognito.AccountRecovery.PHONE_AND_EMAIL,
			userVerification: {
				emailStyle: awsCognito.VerificationEmailStyle.CODE,
			},
			autoVerify: {
				email: true,
			},
			standardAttributes: {
				email: {
					required: true,
					mutable: true,
				},
			},
		}
	)

	// Define a user pool domain that will be used to host the sign in page (google needs this url)
	const userPoolDomain = new awsCognito.UserPoolDomain(
		scope,
		`${props.appName}-${props.stage}-userpooldomain`,
		{
			userPool,
			cognitoDomain: {
				domainPrefix: `${props.appName}-${props.stage}`, // Specify a unique domain prefix
			},
		}
	)

	// create a google identity provider.
	// when users sign up with google, they will be added to the userpool
	const googleSecretValue = Secret.fromSecretNameV2(
		scope,
		`${props.appName}-${props.stage}-googleclientsecret`,
		props.google.clientSecretName
	)

	const googleProvider = new awsCognito.UserPoolIdentityProviderGoogle(
		scope,
		`${props.appName}-${props.stage}-googleprovider`,
		{
			clientId: props.google.clientId,
			clientSecretValue: googleSecretValue.secretValue, // Replace with your Google Client Secret
			scopes: ['openid', 'profile', 'email'],
			attributeMapping: {
				email: awsCognito.ProviderAttribute.GOOGLE_EMAIL,
				givenName: awsCognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
				familyName: awsCognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
				phoneNumber: awsCognito.ProviderAttribute.GOOGLE_PHONE_NUMBERS,
			},
			userPool,
		}
	)

	userPool.registerIdentityProvider(googleProvider)

	const userPoolClient = new awsCognito.UserPoolClient(
		scope,
		`${props.appName}-${props.stage}-userpoolClient`,
		{
			userPool,
			oAuth: {
				flows: {
					authorizationCodeGrant: true,
				},
				callbackUrls: props.google.callbackUrls, // Replace with your actual callback URL
				logoutUrls: props.google.logoutUrls, // Replace with your actual logout URL
			},
		}
	)

	const identityPool = new IdentityPool(
		scope,
		`${props.appName}-${props.stage}-identityPool`,
		{
			identityPoolName: `${props.appName}-${props.stage}IdentityPool`,
			allowUnauthenticatedIdentities: true,
			authenticationProviders: {
				userPools: [
					new UserPoolAuthenticationProvider({
						userPool: userPool,
						userPoolClient: userPoolClient,
					}),
				],
			},
		}
	)

	return { userPool, userPoolClient, identityPool, userPoolDomain }
}
