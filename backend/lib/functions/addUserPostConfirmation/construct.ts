import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import path = require('path')
import { envNameContext } from '../../../cdk.context'

import { UserPool } from 'aws-cdk-lib/aws-cognito'

type CreateAddUserFuncProps = {
	appName: string
	stage: envNameContext
	userTableArn: string
	environment: Record<string, string>
}
export const createAddUserFunc = (
	scope: Construct,
	props: CreateAddUserFuncProps
) => {
	const addUserFunc = new NodejsFunction(
		scope,
		`${props.appName}-${props.stage}-addUserFunc`,
		{
			functionName: `${props.appName}-${props.stage}-addUserFunc`,
			runtime: Runtime.NODEJS_16_X,
			handler: 'handler',
			entry: path.join(__dirname, `./main.ts`),
			environment: { ...props.environment },
		}
	)

	return addUserFunc
}
