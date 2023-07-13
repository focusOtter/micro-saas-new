import * as childProcess from 'child_process'
import { App, Stack } from 'aws-cdk-lib'
import { CDKContext } from './cdk.context'

export const getCurrentGitBranch = () => {
	// run a shell command to get the current git branch

	let currentBranch
	try {
		currentBranch = childProcess
			.execSync('git symbolic-ref --short HEAD')
			.toString()
			.trim()
	} catch (e) {
		console.log(
			'Could not determine current branch from git. Trying to get the branch using Amplify AWS_BRANCH environment variable'
		)
	}

	if (!currentBranch) {
		try {
			currentBranch = childProcess
				.execSync('echo $AWS_BRANCH')
				.toString()
				.trim()
		} catch (e) {
			console.log(
				'Could not determine current branch from Amplify AWS_BRANCH environment variable'
			)
		}
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
