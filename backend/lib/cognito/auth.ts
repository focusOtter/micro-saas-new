import { Construct } from 'constructs'
import * as awsCognito from 'aws-cdk-lib/aws-cognito'
import { envNameContext } from '../../cdk.context'

type CreateSaasAuth = {
	appName: string
	stage: envNameContext
}

console.log('testing post confirmation deploy')

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

	const userPoolClient = new awsCognito.UserPoolClient(
		scope,
		`${props.appName}-${props.stage}-userpoolClient`,
		{ userPool }
	)

	const l1Pool = cognito.userPool.node.defaultChild as CfnUserPool
	l1Pool.lambdaConfig = {
		postConfirmation: `arn:aws:lambda:${this.region}:${this.account}:function:${context.appName}-addUserFunc`,
	}

	return { userPool, userPoolClient }
}
