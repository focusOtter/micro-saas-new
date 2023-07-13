import { Construct } from 'constructs'
import * as awsCognito from 'aws-cdk-lib/aws-cognito'
import {
	IdentityPool,
	UserPoolAuthenticationProvider,
} from '@aws-cdk/aws-cognito-identitypool-alpha'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { envNameContext } from '../../cdk.context'

type CreateSaasAuth = {
	appName: string
	stage: envNameContext
	addUserPostConfirmation?: NodejsFunction
}

export function createSaasAuth(scope: Construct, props: CreateSaasAuth) {
	const userPool = new awsCognito.UserPool(
		scope,
		`${props.appName}-${props.stage}-userpool`,
		{
			userPoolName: `${props.appName}-${props.stage}-userpool`,
			selfSignUpEnabled: true,
			lambdaTriggers: {
				postConfirmation: props.addUserPostConfirmation,
			},
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

	const userPoolClient = new awsCognito.UserPoolClient(
		scope,
		`${props.appName}-${props.stage}-userpoolClient`,
		{ userPool }
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

	return { userPool, userPoolClient, identityPool }
}
