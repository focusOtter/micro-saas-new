import * as AWS from 'aws-sdk'
const ssm = new AWS.SSM()

import Stripe from 'stripe'

const docClient = new AWS.DynamoDB.DocumentClient()
import { PostConfirmationConfirmSignUpTriggerEvent } from 'aws-lambda'

exports.handler = async (event: PostConfirmationConfirmSignUpTriggerEvent) => {
	const parameterName = `micro-saas-stripe-key-${process.env.STAGE}`
	try {
		const response = await ssm
			.getParameter({ Name: parameterName, WithDecryption: true })
			.promise()
		const secretValue = response.Parameter?.Value!

		const stripe = new Stripe(secretValue, {
			apiVersion: '2022-11-15',
		})

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
			TableName: process.env.userTableName as string,
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
	} catch (error) {
		console.error(error)
		return {
			statusCode: 500,
			body: 'Error fetching secure secret',
		}
	}
}
