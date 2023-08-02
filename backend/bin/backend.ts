#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils/generateContext'
import { MicroSaaSStack } from '../lib/stack'

const app = new cdk.App()
const context: CDKContext = getCDKContext(app)

const microSaaSStack = new MicroSaaSStack(app, context.stackName, {
	env: { account: context.account, region: context.region },
})
