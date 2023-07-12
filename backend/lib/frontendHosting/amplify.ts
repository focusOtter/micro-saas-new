import { Duration, SecretValue, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as codebuild from 'aws-cdk-lib/aws-codebuild'
import {
	App,
	GitHubSourceCodeProvider,
	RedirectStatus,
} from '@aws-cdk/aws-amplify-alpha'
import { CfnApp } from 'aws-cdk-lib/aws-amplify'
import {
	Effect,
	PolicyDocument,
	PolicyStatement,
	Role,
	ServicePrincipal,
} from 'aws-cdk-lib/aws-iam'

type AmplifyHostingProps = StackProps & {
	appName: string
	account: string
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
	const amplifyDeployCDKRole = new Role(
		scope,
		'allow-amplify-deploy-cdk-role',
		{
			assumedBy: new ServicePrincipal('amplify.amazonaws.com'),
			description:
				'Role assumed by GitHubPrincipal for deploying from CI using aws cdk',
			roleName: `${props.repo}-amplify-deploy-with-cdk`,
			maxSessionDuration: Duration.hours(1),
			inlinePolicies: {
				CdkDeploymentPolicy: new PolicyDocument({
					assignSids: true,
					statements: [
						new PolicyStatement({
							effect: Effect.ALLOW,
							actions: ['sts:AssumeRole'],
							resources: [`arn:aws:iam::${props.account}:role/cdk-*`],
						}),
					],
				}),
			},
		}
	)
	const amplifyApp = new App(scope, `${props.appName}-hosting-${props.stage}`, {
		appName: props.appName,
		role: amplifyDeployCDKRole,
		sourceCodeProvider: new GitHubSourceCodeProvider({
			owner: props.ghOwner,
			repository: props.repo,
			oauthToken: SecretValue.secretsManager(props.ghTokenName),
		}),
		autoBranchDeletion: true,
		customRules: [
			{
				source: '/<*>',
				target: '/index.html',
				status: RedirectStatus.NOT_FOUND_REWRITE,
			},
		],
		environmentVariables: {
			AMPLIFY_MONOREPO_APP_ROOT: 'frontend',
			...props.environmentVariables,
		},
		buildSpec: codebuild.BuildSpec.fromObjectToYaml({
			version: 1,
			applications: [
				{
					backend: {
						phases: {
							preBuild: {
								commands: [],
							},
							build: {
								commands: [
									'cd ..',
									'cd backend',
									'npm ci',
									'npx aws-cdk diff',
									'npx aws-cdk deploy --require-approval never --exclusively MicroSaaSStack AmplifyHostingStack',
								],
							},
						},
					},
					frontend: {
						phases: {
							preBuild: {
								commands: ['cd ../frontend', 'npm ci'],
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
