import { Construct } from 'constructs'
import * as awsCognito from 'aws-cdk-lib/aws-cognito'
import {
	IdentityPool,
	UserPoolAuthenticationProvider,
} from '@aws-cdk/aws-cognito-identitypool-alpha'

import { envNameContext } from '../../cdk.context'

type CreateSaasAuth = {
	appName: string
	stage: envNameContext
	userPool: awsCognito.UserPool
	userPoolClient: awsCognito.UserPoolClient
}

export function createSaasAuthIdentity(
	scope: Construct,
	props: CreateSaasAuth
) {
	const identityPool = new IdentityPool(
		scope,
		`${props.appName}-${props.stage}-identityPool`,
		{
			identityPoolName: `${props.appName}-${props.stage}IdentityPool`,
			allowUnauthenticatedIdentities: true,
			authenticationProviders: {
				userPools: [
					new UserPoolAuthenticationProvider({
						userPool: props.userPool,
						userPoolClient: props.userPoolClient,
					}),
				],
			},
		}
	)
	return identityPool
}
