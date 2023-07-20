import * as AWS from 'aws-sdk'
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_...', {
	apiVersion: '2022-11-15',
})

const docClient = new AWS.DynamoDB.DocumentClient()
import { PostConfirmationConfirmSignUpTriggerEvent } from 'aws-lambda'

exports.handler = async (event: PostConfirmationConfirmSignUpTriggerEvent) => {
	const date = new Date()
	const isoDate = date.toISOString()

	const user = event.request.userAttributes

	// Create a Stripe customer
	const customer = await stripe.customers.create({
		email: user.email,
		name: user.name,
	})
	//construct the param
	const params = {
		TableName: process.env.UserTableName as string,
		Item: {
			__typename: 'User',
			id: event.request.userAttributes.sub,
			stripeCustomerId: customer.id,
			createdAt: isoDate, // ex) 2023-02-16T16:07:14.189Z
			updatedAt: isoDate,
			username: event.userName,
			email: event.request.userAttributes.email,
		},
	}

	//try to add to the DB, otherwise throw an error
	try {
		await docClient.put(params).promise()
		return event
	} catch (err) {
		console.log(err)
		return event
	}
}
