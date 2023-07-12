import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CDKContext } from '../../cdk.context'
import { getCDKContext } from '../../utils'
import { createAmplifyHosting } from './amplify'

export class AmplifyHostingStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)
		const context: CDKContext = getCDKContext(this)

		const amplifyApp = createAmplifyHosting(this, {
			appName: context.appName,
			stage: context.stage,
			branch: context.branchName,
			ghOwner: context.github.username,
			repo: context.github.repo,
			ghTokenName: context.github.tokenName,
		})
	}
}
