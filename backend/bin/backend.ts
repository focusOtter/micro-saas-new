#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils'
import { MicroSaaSStack } from '../lib/app/stack'
import { AmplifyHostingStack } from '../lib/frontendHosting/stack'

const app = new cdk.App()
const context: CDKContext = getCDKContext(app)

const microSaaSStack = new MicroSaaSStack(app, 'MicroSaaSStack', {
	env: { account: context.account, region: context.region },
})

const amplifyApp = new AmplifyHostingStack(app, 'AmplifyHostingStack', {
	env: { account: context.account, region: context.region },
}).addDependency(
	microSaaSStack,
	'When passing environment variables to Amplify Hosting the primary stack needs to always be deployed first'
)
