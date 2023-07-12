import { SecretValue, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as codebuild from 'aws-cdk-lib/aws-codebuild'
import {
	App,
	GitHubSourceCodeProvider,
	RedirectStatus,
} from '@aws-cdk/aws-amplify-alpha'
import { CfnApp } from 'aws-cdk-lib/aws-amplify'

type AmplifyHostingProps = StackProps & {
	appName: string
	stage: string
	branch: string
	ghOwner: string
	repo: string
	ghTokenName: string
	frontendRootFolderName: string
	environmentVariables?: { [name: string]: string }
}

export function createAmplifyHosting(
	scope: Construct,
	props: AmplifyHostingProps
) {
	const amplifyApp = new App(scope, `${props.appName}-hosting-${props.stage}`, {
		appName: props.appName,
		sourceCodeProvider: new GitHubSourceCodeProvider({
			owner: props.ghOwner,
			repository: props.repo,
			oauthToken: SecretValue.secretsManager(props.ghTokenName),
		}),
		autoBranchDeletion: true,
		customRules: [
			{
				source: '/<*>',
				target: '	/index.html',
				status: RedirectStatus.NOT_FOUND_REWRITE,
			},
		],
		environmentVariables: {
			AMPLIFY_MONOREPO_APP_ROOT: props.frontendRootFolderName,
			...props.environmentVariables,
		},
		buildSpec: codebuild.BuildSpec.fromObjectToYaml({
			version: 1,
			applications: [
				{
					frontend: {
						phases: {
							preBuild: {
								commands: ['npm ci'],
							},
							build: {
								commands: ['npm run build'],
							},
						},
						artifacts: {
							baseDirectory: '.next',
							files: ['**/*'],
						},
						cache: {
							paths: ['node_modules/**/*'],
						},
					},
					appRoot: 'frontend',
				},
			],
		}),
	})

	amplifyApp.addBranch(props.branch, {
		stage: props.branch === 'main' ? 'PRODUCTION' : 'DEVELOPMENT',
		branchName: props.branch,
	})

	//Drop down to L1 to allow new NextJS architecture
	const cfnAmplifyApp = amplifyApp.node.defaultChild as CfnApp
	cfnAmplifyApp.platform = 'WEB_COMPUTE'
}
