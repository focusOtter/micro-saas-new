import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils/generateContext'
import { createAmplifyHosting } from './hosting/amplify'
import { createSaasAuth } from './cognito/auth'
import { createSaasPicsBucket } from './s3/bucket'
import { createAmplifyGraphqlApi } from './api/appsync'

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

		const amplifyGraphQLAPI = createAmplifyGraphqlApi(this, {
			appName: context.appName,
			stage: context.stage,
			userpool: cognito.userPool,
			authenticatedRole: cognito.identityPool.authenticatedRole,
			unauthenticatedRole: cognito.identityPool.unauthenticatedRole,
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
		new cdk.CfnOutput(this, 'aws_appsync_graphqlEndpoint', {
			value: amplifyGraphQLAPI.resources.cfnGraphqlApi.attrGraphQlUrl,
		})
		new cdk.CfnOutput(this, 'aws_appsync_apiId', {
			value: amplifyGraphQLAPI.resources.cfnGraphqlApi.attrApiId,
		})
		new cdk.CfnOutput(this, 'aws_appsync_authenticationType', {
			value: 'AMAZON_COGNITO_USER_POOLS',
		})
	}
}
