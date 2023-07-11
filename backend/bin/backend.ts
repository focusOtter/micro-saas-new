#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { MicroSaaSStack } from '../lib/app/stack'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils'
import { DeployGitHubRoleStack } from '../lib/deployment/stack'

const app = new cdk.App()
const context: CDKContext = getCDKContext(app)
console.log(context)
new DeployGitHubRoleStack(app, `${context.appName}DeployGitHubRoleStack`, {
	env: {
		account: context.account,
		region: 'us-east-1',
	},
})

// new MicroSaaSStack(app, 'MicroSaaSStack', {
// 	env: { account: context.account, region: context.region },
// })
