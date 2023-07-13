import { Duration, SecretValue, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as codebuild from 'aws-cdk-lib/aws-codebuild'
import * as amplify from '@aws-cdk/aws-amplify-alpha'
import { CfnApp } from 'aws-cdk-lib/aws-amplify'
import * as iam from 'aws-cdk-lib/aws-iam'

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
	const amplifyDeployCDKRole = new iam.Role(
		scope,
		'allow-amplify-deploy-cdk-role',
		{
			assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
			description: `Role assumed by Amplify Hosting for deploying aws cdk when in ${props.stage} environment`,
			roleName: `${props.repo}-amplify-deploy-from-cdk-${props.stage}`,
			maxSessionDuration: Duration.hours(1),
			inlinePolicies: {
				CdkDeploymentPolicy: new iam.PolicyDocument({
					assignSids: true,
					statements: [
						new iam.PolicyStatement({
							effect: iam.Effect.ALLOW,
							actions: ['sts:AssumeRole'],
							resources: [`arn:aws:iam::${props.account}:role/cdk-*`],
						}),
					],
				}),
			},
		}
	)
	const amplifyApp = new amplify.App(
		scope,
		`${props.appName}-hosting-${props.stage}`,
		{
			appName: props.appName,
			role: amplifyDeployCDKRole,
			sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
				owner: props.ghOwner,
				repository: props.repo,
				oauthToken: SecretValue.secretsManager(props.ghTokenName),
			}),
			autoBranchDeletion: true,
			customRules: [
				{
					source: '/<*>',
					target: '/index.html',
					status: amplify.RedirectStatus.NOT_FOUND_REWRITE,
				},
			],
			environmentVariables: {
				AMPLIFY_MONOREPO_APP_ROOT: 'frontend',
			},
		}
	)

	amplifyApp.addBranch(props.branch, {
		stage: props.branch === 'main' ? 'PRODUCTION' : 'DEVELOPMENT',
		branchName: props.branch,
	})

	//Drop down to L1 to allow new NextJS architecture
	const cfnAmplifyApp = amplifyApp.node.defaultChild as CfnApp
	cfnAmplifyApp.platform = 'WEB_COMPUTE'

	return amplifyApp
}
