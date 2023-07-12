#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils'
import { DeployGitHubRoleStack } from '../lib/deployment/stack'
import { MicroSaaSStack } from '../lib/app/stack'

const app = new cdk.App()
const context: CDKContext = getCDKContext(app)

new DeployGitHubRoleStack(app, `${context.appName}DeployGitHubRoleStack`, {
	env: {
		account: context.account,
		region: 'us-east-1',
	},
})

// new MicroSaaSStack(app, 'MicroSaaSStack', {
// 	env: { account: context.account, region: context.region },
// })
