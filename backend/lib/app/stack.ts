import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CDKContext } from '../../cdk.context'
import { getCDKContext } from '../../utils'

export class MicroSaaSStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)
		const context: CDKContext = getCDKContext(this)
	}
}
