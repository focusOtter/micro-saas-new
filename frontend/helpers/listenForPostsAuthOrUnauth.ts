import { onTravelPostCreate } from './../src/graphql/subscriptions'
import { OnTravelPostCreateSubscription } from './../src/API'
import { graphqlOperation, GraphQLSubscription } from '@aws-amplify/api'
import { API } from 'aws-amplify'
import { checkCurrentUser } from './checkCurrentUser'

export const listenForPostsAuthOrUnAuth = async () => {
	const user = checkCurrentUser()
	const sub = API.graphql<GraphQLSubscription<OnTravelPostCreateSubscription>>(
		graphqlOperation(onTravelPostCreate)
	).subscribe({
		next: ({ provider, value }) => console.log({ provider, value }),
		error: (error) => console.warn(error),
	})
	return sub
}
