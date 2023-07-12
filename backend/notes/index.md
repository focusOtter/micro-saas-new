# Fullstack MicroSaaS: Backend Notes

This project picks up the process of setting up our project for development as first stated in the [repo notes section](../../notes/index.md).

## Setting Up Multi Region Apps with Context

The first thing I go in any project I'm realtively serious about is setup a `context` file.

In my `backend` directory, I create a `cdk.context.json` file and paste in the following:

```json
{
	"globals": {
		"account": "842537737558",
		"appName": "micro-saas-new",
		"appDescription": "A simple description",
		"github": {
			"username": "focusOtter",
			"repo": "micro-saas-new"
		}
	},
	"environments": [
		{
			"branchName": "main",
			"stage": "prod",
			"region": "us-east-2"
		},
		{
			"branchName": "develop",
			"stage": "dev",
			"region": "us-east-1"
		}
	]
}
```

This will be added to overtime, but this is what I do at a barebones level. Essentially, instead of storing string throughout my app, I store them here. Doing so makes the app more portable and easier to configure.

The `globals` section are project wide values that won't change regardless of the branch/environment that we're on. The `environments` array contains branch specific values.

The idea here is that the values of a specific `branch` environment object are merged with `globals` object, thus creating one flat object.

To clarify that and get intellisense on this context object, I also create an types file:

```ts
//cdk.context.d.ts
export type CDKContext = {
	account: string
	appName: string
	appDescription: string
	stage: envNameContext
	branchName: branchNameContext
	region: string
	github: githubContext
}

export type envNameContext = 'prod' | 'dev'
export type githubContext = { username: string; repo: string }
export type branchNameContext = 'main' | 'develop'
```

> Because the types are referenced in our app, be sure to negate the file to your `backend/.gitignore` file: `!cdk.context.d.ts`

So far I defined the context, but I need to detect the branch and merge the context objects.

To accomplish that I create a `utils.ts` file that does just that:

```ts
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
```

> 🗒️ To touch on a few points: `scope.node.tryGetContext('environments')` is a CDK specific helper that knows how to read the `cdk.context.json` file. Also, if you're getting a red-squiggly on `child_process`, all you have to do is update your `tsconfig.json` file to point to the workspace deps: `"typeRoots": ["../node_modules/@types"]`

Now the app is setup to deploy to multiple regions and all that has to be done is pass the relevant context by doing the following:

```ts
const context: CDKContext = getCDKContext(app)
```

However, before all that is done, I'm going to continue to focus on getting our GitHub pipeline setup with GitHub Actions

## Setting Up GitHub Actions

Instead of deploying locally, we want to keep our project in version control and have GitHub deploy it on our behalf.

In order to do that, the first step is setting GitHub as an OIDC provider in our AWS Account. This involves adding thumbprints, the OIDC URL, and clientIds. The good news is that you don't have to do all that 😄 I created a CDK project that does that for you!

Just head to [this repo](https://github.com/focusOtter/github-aws-oidc-provider-cdk/tree/main), update the account ID in the `bin` directory and then deploy the app (`npx aws-cdk deploy`). Just make sure that AWS account is the same as this one!

> 🗒️ No need to worry about what region you deploy to since AWS OIDC providers and roles are global across an AWS account.

The provider tells AWS to trust GitHub, back in this repo, we can create a role that GitHub can assume. This role will only give permission for this repo. To do that, we'll create a [`DeploymentStack`](https://github.com/focusOtter/single-account-multi-region-cdk-deploy/blob/main/lib/deployment/stack.ts).

This like much of the steps so far, this is boilerplate code. In fact, much of what we've covered so far is in my [Single Account, Multi Region repo](https://github.com/focusOtter/single-account-multi-region-cdk-deploy/tree/main).

Following that repo, will lead you to a point where you have a [GitHub Action](../../.github/workflows/aws.yml) in the root of this workspace (not the `backend` directory) and a [`DeploymentStack`](../bin/backend.ts).

> 🗒️ Note that the GitHub action in this project is slightly different from the repo listed due to this being a workspace.

Assuming you're on the `main` branch, commit and push the branch if needed. Then create a `develop` branch from the `main` branch and push the `develop` branch to GitHub. Verify that this triggers a build.

> 🚨 The previous steps were done beforehand, from this point on, I'm doing this point-in-time. This means the markdown will likely contain more of my thoughts and feelings as I go through this.

<!-- time check: 12:03AM -->

The backend is setup to deploy our resources. At this point I guess, we can do 1 of 2 things:

1. Deploy our Frontend by using the Amplify L2 construct
2. Deploy our actual app resources that will make up our backend.

I feel like I'm still in a CI/CD workflow so I'm gonna stick with this.

Checkout the [hosting.md](./hosting.md) to see this playout, otherwise, for the core backend experience checkout the [main-architecture.md file](./main-architecture.md)
