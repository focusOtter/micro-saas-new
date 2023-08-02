import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils/generateContext'
import { createAmplifyHosting } from './hosting/amplify'
import { createSaasAuth } from './cognito/auth'
import { createSaasPicsBucket } from './s3/bucket'
import { UserPool } from 'aws-cdk-lib/aws-cognito'
import { createSaasAuthIdentity } from './cognito/identity'

export class MicroSaaSStack extends cdk.Stack {
	public readonly userPool: UserPool
	public readonly authenticatedRole: cdk.aws_iam.IRole
	public readonly unauthenticatedRole: cdk.aws_iam.IRole
	public readonly addUserFunction: cdk.aws_lambda_nodejs.NodejsFunction

	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props)
		const context: CDKContext = getCDKContext(this)

		const amplifyApp = createAmplifyHosting(this, {
			appName: context.appName,
			region: this.region,
			account: context.account,
			stage: context.stage,
			branch: context.branchName,
			ghOwner: context.github.username,
			repo: context.github.repo,
			ghTokenName: context.github.tokenName,
			frontendRootFolderName: context.frontendRootFolderName,
		})

		const cognito = createSaasAuth(this, {
			appName: context.appName,
			stage: context.stage,
		})

		const identityPool = createSaasAuthIdentity(this, {
			appName: context.appName,
			stage: context.stage,
			userPool: cognito.userPool,
			userPoolClient: cognito.userPoolClient,
		})

		const bucket = createSaasPicsBucket(this, {
			appName: context.appName,
			stage: context.stage,
			authenticatedRole: identityPool.authenticatedRole,
		})

		this.userPool = cognito.userPool
		this.authenticatedRole = identityPool.authenticatedRole
		this.unauthenticatedRole = identityPool.unauthenticatedRole

		new cdk.CfnOutput(this, 'region', {
			value: this.region,
		})
		new cdk.CfnOutput(this, 'userPoolId', {
			value: cognito.userPool.userPoolId,
		})
		new cdk.CfnOutput(this, 'userPoolWebClientId', {
			value: cognito.userPoolClient.userPoolClientId,
		})
		new cdk.CfnOutput(this, 'identityPoolId', {
			value: identityPool.identityPoolId,
		})
		new cdk.CfnOutput(this, 'bucket', {
			value: bucket.bucketName,
		})

		new cdk.CfnOutput(this, 'aws_appsync_authenticationType', {
			value: 'AMAZON_COGNITO_USER_POOLS',
		})
	}
}
