import * as childProcess from 'child_process'
import { App, Stack } from 'aws-cdk-lib'
import { CDKContext } from './cdk.context'

export const getCurrentGitBranch = () => {
	// run a shell command to get the current git branch

	const currentBranch = childProcess
		.execSync('git symbolic-ref --short HEAD')
		.toString()
		.trim()

	if (!currentBranch) {
		throw new Error('Could not determine current branch')
	}
	return currentBranch
}

export const getCDKContext = (scope: App | Stack) => {
	// get the environments and globals from the cdk.context.json file
	const environments = scope.node.tryGetContext('environments')
	const globals = scope.node.tryGetContext('globals')

	// find the current branch in the environments array
	const context = environments.find(
		(env: any) => env.branchName === getCurrentGitBranch()
	)

	// return the context object with the globals merged in
	return { ...globals, ...context } as CDKContext
}
