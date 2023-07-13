# Fullstack MicroSaaS: Primary Backend Resources Notes

So far I've [setup my ci/cd pipeline](./hosting.md). First time in monorepo and it wasn't as smooth as I hoped, but the outcome is better than I imagined possible.

In this section, we'll actually deploy the resources needed for our frontend. Aside from the L3 construct of the API which I've only done once before, this should be fairly straightforward. This is the architecture we're wanting to create:

![arch diagram](./images/archdiagram.drawio.png)

To start, as I often do, I'll focus on auth.

## Cognito

I'm just going to pretty much [copy this file](https://github.com/focusOtter/microsaas-backend/blob/main/lib/cognito/auth.ts) and work from there.

Oh cool..no red squiggles, I'll take it!

This creates a userpool, identity pool and webclient. Amplify libraries need all of these values so I'll make sure that when I add these to my stack that I output those values. Before that, I'll take a moment to make sure all the string and `context` values make sense.

Values look good. One thing I noticed is that this setup accepts a `postConfirmation` trigger. This will trigger a Lambda function that stores a user in a database. I'm going to set this prop as optional for now.

I'm getting ready to output the resource names and I'm noticing something:

My `outputs.json` is going to be a flat file, but the Amplify library config expect the following:

```js
{
	aws_project_region: process.env.NEXT_PUBLIC_region,
	Auth: {
		region: process.env.NEXT_PUBLIC_region,
		userPoolId: process.env.NEXT_PUBLIC_userpoolId,
		userPoolWebClientId: process.env.NEXT_PUBLIC_userPoolWebClientId,
		identityPoolId: process.env.NEXT_PUBLIC_identityPoolId,
	},
	Storage: {
		AWSS3: {
			bucket: process.env.NEXT_PUBLIC_bucket,
			region: process.env.NEXT_PUBLIC_region,
		},
	},
	aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_appSyncURL,
	aws_appsync_region: process.env.NEXT_PUBLIC_region,
	aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
}
```

So on the frontend, I'll have to create a config object based off of this. No biggy.

## S3

Next up is S3. This is another boilerplate option.

> 🗒️ It was at this point that I restructured the backend so that `app` directory was gone and each resource was in it's own folder

The bucket is pretty straightforward. It creates a bucket, a Cloudfront distribution and a policy to provide access. I modified this since we don't need a cloudfront distribution--users can only view their own images. This also meant I updated the policy so that signed in users can only view their own files.

A lot of this convention in policy to conform to the Amplify library.

Next up is the API. I'm really, really excited for this.

I deployed the app.
