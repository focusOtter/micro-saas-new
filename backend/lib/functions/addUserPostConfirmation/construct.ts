import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as path from 'path'
import { envNameContext } from '../../../cdk.context'
import { PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam'

type CreateAddUserFuncProps = {
	appName: string
	functionName: string
	region: string
	stage: envNameContext
	userTableArn: string
	account: string
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
		`${props.appName}-${props.stage}-${props.functionName}`,
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

	// ALLOW PUT METHOD TO ACCESS USER TABLE and
	// ALLOW GET PARAMETER TO ACCESS STRIPE SECRET
	addUserFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ['dynamodb:PutItem'],
			resources: [props.userTableArn],
		})
	)
	addUserFunc.addToRolePolicy(
		new PolicyStatement({
			actions: ['ssm:GetParameter'],
			resources: [
				`arn:aws:ssm:${props.region}:${props.account}:parameter/${props.environmentVars.STRIPE_SECRET_NAME}`,
			],
		})
	)

	// ALLOW INVOKE METHOD TO COGNITO SERVICE
	const cognitoServicePrincipal = new ServicePrincipal(
		'cognito-idp.amazonaws.com'
	)
	addUserFunc.grantInvoke(cognitoServicePrincipal)

	return addUserFunc
}
