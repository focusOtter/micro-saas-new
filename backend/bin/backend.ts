#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils/generateContext'
import { MicroSaaSStack } from '../lib/stack'
import { AmplifyL3Stack } from '../lib/amplifyL3Stack'
import { FunctionsStack } from '../lib/functionsStack'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { UserPoolOperation } from 'aws-cdk-lib/aws-cognito'

const app = new cdk.App()
const context: CDKContext = getCDKContext(app)

const microSaaSStack = new MicroSaaSStack(app, 'MicroSaaSStack', {
	env: { account: context.account, region: context.region },
})

const amplifyStack = new AmplifyL3Stack(app, 'AmplifySaaSStack', {
	env: { account: context.account, region: context.region },
	authenticatedRole: microSaaSStack.authenticatedRole,
	unauthenticatedRole: microSaaSStack.unauthenticatedRole,
	userPool: microSaaSStack.userPool,
})

const functionsStack = new FunctionsStack(app, 'FunctionsStack', {
	env: { account: context.account, region: context.region },
	userPool: microSaaSStack.userPool,
	userTable: amplifyStack.userTable,
})

functionsStack.postConfFunc.addToRolePolicy(
	new PolicyStatement({
		actions: ['dynamodb:PutItem'],
		resources: [amplifyStack.userTable.attrArn],
	})
)

microSaaSStack.userPool.addTrigger(
	UserPoolOperation.POST_CONFIRMATION,
	functionsStack.postConfFunc
)
