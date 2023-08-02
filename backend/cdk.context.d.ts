import { type } from 'os'

export type CDKContext = {
	stackName: string
	account: string
	appName: string
	appDescription: string
	frontendRootFolderName: string
	stage: envNameContext
	branchName: branchNameContext
	region: string
	github: githubContext
	functions: functionsContext
}

type functionsContext = {
	postConfirmation: {
		name: string
		stripeSecretName: string
	}
}

export type envNameContext = 'prod' | 'dev'
export type githubContext = {
	username: string
	repo: string
	tokenName: string
}
export type branchNameContext = 'main' | 'develop'
