import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils/generateContext'
import { createAmplifyGraphqlApi } from './api/appsync'
import { CfnTable } from 'aws-cdk-lib/aws-dynamodb'

type AmplifyL3StackProps = cdk.StackProps & {
	userPool: cdk.aws_cognito.UserPool
	authenticatedRole: cdk.aws_iam.IRole
	unauthenticatedRole: cdk.aws_iam.IRole
}
export class AmplifyL3Stack extends cdk.Stack {
	public readonly userTable: CfnTable
	constructor(scope: cdk.App, id: string, props: AmplifyL3StackProps) {
		super(scope, id, props)
		const context: CDKContext = getCDKContext(this)

		const amplifyGraphQLAPI = createAmplifyGraphqlApi(this, {
			appName: context.appName,
			stage: context.stage,
			userpool: props.userPool,
			authenticatedRole: props.authenticatedRole,
			unauthenticatedRole: props.unauthenticatedRole,
		})

		const userTable = amplifyGraphQLAPI.resources.cfnTables['UserTable']

		// postConfFunc.addToRolePolicy(
		// 	new cdk.aws_iam.PolicyStatement({
		// 		actions: ['dynamodb:PutItem'],
		// 		resources: [userTable.attrArn],
		// 	})
		// )

		// postConfFunc.addEnvironment('userTableARN', userTable.attrArn)
		// postConfFunc.addEnvironment('userTableName', userTable.tableName!)
		// postConfFunc.addEnvironment('STAGE', context.stage)

		// cognito.userPool.addTrigger(
		// 	UserPoolOperation.POST_CONFIRMATION,
		// 	postConfFunc
		// )

		this.userTable = userTable
	}
}
