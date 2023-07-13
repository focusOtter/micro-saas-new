import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../../cdk.context'
import { getCDKContext } from '../../utils'
import { createAmplifyHosting } from './amplify'

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

		new cdk.CfnOutput(this, 'AmplifyAppId', {
			value: amplifyApp.appId,
		})
	}
}
