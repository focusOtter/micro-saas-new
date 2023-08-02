# Fullstack MicroSaaS: Customer Solutions Notes

This is picking up from the [main architecture notes](./main-architecture.md).

As mentioned at the end of that section, this project will forgoe the use of managing customer subscriptions via webhooks, and instead use the Stripe API directly via the [`use-stripe-subscription`](https://github.com/clerkinc/use-stripe-subscription) package offered by Clerk.

To accomplish this, I'll update my [original `postConfirmation trigger`](https://github.com/focusOtter/microsaas-backend/blob/main/lib/functions/addUserPostConfirmation/main.ts) to also create a Stripe customer.

I convention I use is to create a `lib/functions` folder and put all of my functions there. So:`lib/functions/addUserPostConfirmation/construct.ts`.

I copied over the files and installed the dependencies. In my previous repo, I had a [`prospective` value.](https://github.com/focusOtter/microsaas-backend/blob/main/lib/functions/addUserPostConfirmation/main.ts#L19). I won't be needing that anymore since my customers will be managed purely by stripe. However, in this file, I will need to create the customer. I'll add the following new pieces:

```diff
+ import Stripe from 'stripe'

+ const stripe = new Stripe('sk_test_...', {
+	apiVersion: '2022-11-15',
+ })
```

```diff
const user = event.request.userAttributes

// Create a Stripe customer
+ const customer = await stripe.customers.create({
+ 	email: user.email,
+ 	name: user.name,
})
//construct the param
const params = {
	TableName: process.env.UserTableName as string,
	Item: {
		__typename: 'User',
		id: event.request.userAttributes.sub,
+ 	stripeCustomerId: customer.id,
		createdAt: isoDate, // ex) 2023-02-16T16:07:14.189Z
		updatedAt: isoDate,
		username: event.userName,
		email: event.request.userAttributes.email,
	},
}
```

> 🗒️ I had to install the Stripe library as a named import, but after realizing I wasn't getting intellisense for it, I tried to install from `@types/stripe`. Turns out that doesn't work (it's just a stub) and that you have to construct the API as shown above to get intellisense.

As for the Stripe secret, I can use Secrets Manager, but honestly that gets expensive when Parameter Store does the trick. I'll create the secret using the AWS CLI. (Assume that anytime I'm using the AWS CLI, I'm using chatGPT-4 to get the command).

```sh
aws ssm put-parameter --name "microsaas-stripe-key-dev" --value "sk_test...." --type "SecureString" --profile focus-otter-sandbox
```

```sh
aws ssm put-parameter --name "microsaas-stripe-key-prod" --value "sk_prod..." --type "SecureString" --profile focus-otter-sandbox
```

I have a decision at this point. Do I create an AWS Lambda Layer so that I have an easy way to get the secret across functions or do I just grab it from the Lambda?

I opt for using a Lambda layer since I have the code to reference from Allen Helton, but have never done it myself.

update: Nope. I tried for 10 minutes and it's not looking fun. I'll forsure have to refactor this once we get to accessing another secret (the open API key).

I added the following and updated my Lambda function appropriately:

```ts
const secureStringParameter =
	StringParameter.fromSecureStringParameterAttributes(
		scope,
		`${props.appName}-${props.env}-SecureStringParameter`,
		{
			parameterName: `microsaas-stripe-key-${props.env}`,
		}
	)

// Access the secure string value
const secureStringValue = secureStringParameter.stringValue
```
