import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils'
import { createAmplifyHosting } from './hosting/amplify'
import { createSaasAuth } from './cognito/auth'
import { createSaasPicsBucket } from './s3/bucket'

export class MicroSaaSStack extends cdk.Stack {
	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props)
		const context: CDKContext = getCDKContext(this)

		const amplifyApp = createAmplifyHosting(this, {
			appName: context.appName,
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

		const bucket = createSaasPicsBucket(this, {
			appName: context.appName,
			stage: context.stage,
			authenticatedRole: cognito.identityPool.authenticatedRole,
		})

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
			value: cognito.identityPool.identityPoolId,
		})
		new cdk.CfnOutput(this, 'bucket', {
			value: bucket.bucketName,
		})
	}
}
