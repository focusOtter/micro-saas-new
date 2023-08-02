import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils/generateContext'
import { createAmplifyHosting } from './hosting/amplify'
import { createSaasAuth } from './cognito/auth'
import { createSaasPicsBucket } from './s3/bucket'
import { createAmplifyGraphqlApi } from './api/appsync'
import { createAddUserFunc } from './functions/addUserPostConfirmation/construct'
import { CfnUserPool } from 'aws-cdk-lib/aws-cognito'

export class MicroSaaSStack extends cdk.Stack {
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

		// Get the ARN of the UserTable. Amplify will suffix the word "Table" to the end of a GraphQL model type.
		const userTable = amplifyGraphQLAPI.resources.cfnTables['UserTable']

		const addUserFunc = createAddUserFunc(this, {
			appName: context.appName,
			stage: context.stage,
			userDBARN: userTable.attrArn,
			environmentVars: {
				userDBTableName: userTable.tableName!,
			},
		})

		//! Can't reference the function by reference because it will trigger a circular dependency (auth -> addUserFunc -> amplifyGraphQLAPI -> auth)
		const l1Pool = cognito.userPool.node.defaultChild as CfnUserPool
		l1Pool.lambdaConfig = {
			postConfirmation: `arn:aws:lambda:${this.region}:${this.account}:function:${context.appName}-${context.stage}-addUserFunc`,
		}

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
