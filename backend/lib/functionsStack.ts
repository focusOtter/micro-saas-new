import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils/generateContext'
import { CfnTable } from 'aws-cdk-lib/aws-dynamodb'
import { createAddUserFunc } from './functions/addUserPostConfirmation/construct'
import { UserPool } from 'aws-cdk-lib/aws-cognito'

type FunctionStackProps = cdk.StackProps & {
	userTable: CfnTable
	userPool: UserPool
}
export class FunctionsStack extends cdk.Stack {
	public readonly postConfFunc: cdk.aws_lambda.Function
	constructor(scope: cdk.App, id: string, props: FunctionStackProps) {
		super(scope, id, props)
		const context: CDKContext = getCDKContext(this)

		const postConfFunc = createAddUserFunc(this, {
			appName: context.appName,
			stage: context.stage,
			userTableArn: props.userTable.attrArn,
			environment: {
				userTableArn: props.userTable.attrArn,
				userTableName: props.userTable.tableName!,
				STAGE: context.stage,
			},
		})

		this.postConfFunc = postConfFunc
	}
}
