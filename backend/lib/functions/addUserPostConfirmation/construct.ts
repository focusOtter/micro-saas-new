import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import path = require('path')
import { envNameContext } from '../../../cdk.context'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'

type CreateAddUserFuncProps = {
	appName: string
	functionName: string
	stage: envNameContext
	userTableArn: string
	environmentVars: {
		USER_TABLE_NAME: string
		STRIPE_SECRET_NAME: string
	}
}
export const createAddUserFunc = (
	scope: Construct,
	props: CreateAddUserFuncProps
) => {
	const addUserFunc = new NodejsFunction(
		scope,
		`${props.appName}-${props.stage}-addUserFunc`,
		{
			functionName: `${props.appName}-${props.stage}-${props.functionName}`,
			runtime: Runtime.NODEJS_16_X,
			handler: 'handler',
			entry: path.join(__dirname, `./main.ts`),
			environment: props.environmentVars,
			bundling: {
				nodeModules: ['stripe'],
			},
		}
	)

	// ALLOW PUT METHOD TO ACCESS USER TABLE
	addUserFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ['dynamodb:PutItem'],
			resources: [props.userTableArn],
		})
	)

	return addUserFunc
}
