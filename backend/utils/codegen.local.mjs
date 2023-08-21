import { execSync } from 'child_process'
import config from '../../frontend/output.json' assert { type: 'json' }

let profile = 'focus-otter-sandbox'

// This script will get the schema from your API and generate the code for your app.
function getSchemaAndGenerateCode(apiId) {
	let command = `
				cd ../ &&\
        aws appsync get-introspection-schema --api-id ${apiId} --format JSON schema.json --profile ${profile} &&\
        npx @aws-amplify/cli codegen && cd ../backend
        `

	try {
		execSync(command)
	} catch (error) {
		console.error(`exec error: ${error}`)
	}
}

// Usage:
const apiId = config.MicroSaaSStack.awsappsyncapiId
getSchemaAndGenerateCode(apiId)
