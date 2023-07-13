import { Construct } from 'constructs'
import * as awsAppsync from 'aws-cdk-lib/aws-appsync'
import * as path from 'path'
import { UserPool } from 'aws-cdk-lib/aws-cognito'
import { IRole } from 'aws-cdk-lib/aws-iam'
import { AmplifyGraphqlApi } from '@aws-amplify/graphql-construct-alpha'
import { envNameContext } from '../../cdk.context'

type AppSyncAPIProps = {
	appName: string
	stage: envNameContext
	authenticatedRole: IRole
	unauthenticatedRole: IRole
	userpool: UserPool
}

export function createAmplifyGraphqlApi(
	scope: Construct,
	props: AppSyncAPIProps
) {
	const api = new AmplifyGraphqlApi(
		scope,
		`${props.appName}-API-${props.stage}`,
		{
			apiName: `${props.appName}-API-${props.stage}`,

			schema: awsAppsync.SchemaFile.fromAsset(
				path.join(__dirname, './graphql/schema.graphql')
			),
			authorizationConfig: {
				defaultAuthMode: awsAppsync.AuthorizationType.USER_POOL,
				userPoolConfig: {
					userPool: props.userpool,
				},
				iamConfig: {
					unauthenticatedUserRole: props.unauthenticatedRole,
					authenticatedUserRole: props.authenticatedRole,
				},
			},
		}
	)

	api.resources.cfnGraphqlApi.xrayEnabled = true

	return api
}
