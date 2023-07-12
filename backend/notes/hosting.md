# Fullstack MicroSaaS: Hosting Notes

<!-- time check: 12:06am -->

Alright, it's [been a while](https://github.com/focusOtter/appsync-cdk-full-backend-with-hosting-amplify/tree/main/lib) since I've done this, and needless to say I've gotten better and doing this stuff.

The goal here is to create and deploy a single AWS Amplify project to our `dev` environment. This means our `prod` envioronment (deployed in another region), will contain a completely different AWS Amplify project since Amplify Hosting is a regional service.

I actually like this approach because our `dev` project can be deployed close to me, while my `prod` environment can be deployed closer to my users.

My assumption here is that this will be easier than my previous repo.

## Resource Setup

To get started, in `backend/lib/app` I create `hosting/amplify.ts`. Taking a moment to review my [previous example](https://github.com/focusOtter/appsync-cdk-full-backend-with-hosting-amplify/blob/main/lib/NextjsHostingStack.ts) I should be able to refactor it easily.

I start by copying the entire file over. The goal here is to end up with a `createAmplifyHosting` function that I can call in my `lib/stack.ts` file.

Once copied, it looks like I have to install the (alpha) L2 construct for Amplify.

```sh
# while in my backend directory
npm i @aws-cdk/aws-amplify-alpha
```

So far so good. No weird version issues.

Next up is to create remove any hardcoded strings in favor of `context` values.

Hmm...doing this seems premature. I'm gonna refactor it to a function first...

The core of what I have is:

```ts
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
		})
    //..other stuff
  }}
```

Next I'm going to update the types so that there are no hard coded values:

This is what I ended up with:

```ts
type AmplifyHostingProps = StackProps & {
	appName: string
	stage: string
	branch: string
	ghOwner: string
	repo: string
	ghTokenName: string
	environmentVariables?: { [name: string]: string }
}
```

All the red is gone and it looks good, but there are 3 things that are sticking out to me:

1. **Adding the branch:** Back when I was first was exploring this construct, I remember that the `stage` value is actually an `enum` not a string. It's also a reminder that `new App()` creates the Amplify Hosting app from GitHub but doesn't assign a branch to it...which is weird.

For now I'll add the following:

```ts
amplifyApp.addBranch(props.branch, {
	stage: props.branch === 'main' ? 'PRODUCTION' : 'DEVELOPMENT',
	branchName: props.branch,
})
```

2. **Needing a `ghTokenName`**: This is a secret stored in AWS Secrets Manager. I actually don't know if I have one there already. One sec...Ok, I do with the name `github-token`. I'll make sure I update the `cdk.context.json` file appropriately.

3. **Monorepo support**: I'm in a monorepo. How do I set this? Is it as simple as updating my current build steps? I but that's the case, but I'm going to deploy a sample app in the Amplify Console and click `monorepo` to see what the buildspect looks like.

![buildspec](./images/buildspec.png)

Glad I checked. Looks like there's a `appRoot` value I can set. Sounds straightforward.

Hmmm...spidey sense is tingling...something feels off...

Ah!

![normal buildspec](./images/normal-buildspec.png)

See it? The monorepo buildspec is an array, whereas the normal one is an object.

This is the buildspec I ended up with:

```ts
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
```

It's at this point I'm second guessing my idea of making this a function and not keeping it as a Stack. My reasoning is that this construct will eventually need enviornment variables set. These variables _depend on_ all the other resources being built.

So it'd be easy to have 1 stack depend on another, than 1 resource depend on all the other resources. Dammit...No worries. let's do this.

<!-- timecheck: 1:12am -->

done :)

<!-- timecheck: 1:20 -->

Then in my `bin/backend.ts` file I added a dependency to make sure the main stack is always deploye first

```ts
const microSaaSStack = new MicroSaaSStack(app, 'MicroSaaSStack', {
	env: { account: context.account, region: context.region },
})

new AmplifyHostingStack(app, 'AmplifyHostingStack', {
	env: { account: context.account, region: context.region },
}).addDependency(
	microSaaSStack,
	'When passing environment variables to Amplify Hosting the primary stack needs to always be deployed first'
)
```

Do I have enought to deploy this and test? I dont' have anything in my main stack but that's ok...

Yolo, let's try it.
Oh wait! I have to update my Github action so that it deploys the Hosting stack too

```yml
- name: cdk deploy
		run: cd backend && npx aws-cdk deploy --exclusively MicroSaaSStack AmplifyHostingStack

```

Looks like it failed due to needing manual approval. Easy enough, I'll add the `--no-approve` flag.
