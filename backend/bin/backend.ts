#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CDKContext } from '../cdk.context'
import { getCDKContext } from '../utils'
import { MicroSaaSStack } from '../lib/app/stack'

const app = new cdk.App()
const context: CDKContext = getCDKContext(app)

const microSaaSStack = new MicroSaaSStack(app, 'MicroSaaSStack', {
	env: { account: context.account, region: context.region },
})
