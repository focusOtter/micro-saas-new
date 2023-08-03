import { listRecipes } from '@/graphql/queries'
import { ListRecipesQueryVariables, Recipe } from '@/graphql/API'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { API } from 'aws-amplify'
import { checkCurrentUser } from './checkCurrentUser'

// methods like these are really just useful on public pages
//  where a user view data is both an auth and unauth state.

// on private pages wrapped with withAuthenticator HOC,
// the `user` is passed as props to the component

export const fetchTravelPostsAuthOrUnAuth = async () => {
	const user = await checkCurrentUser()
	const data = (await API.graphql({
		query: listRecipes,
		// "undefined" will use the default auth strategy ('AMAZON_COGNITO_USER_POOLS')
		authMode: user ? undefined : 'AWS_IAM',
	})) as GraphQLResult<ListRecipesQueryVariables>

	const travelPostsData = data.data?

	return { travelPostsData, user }
}
