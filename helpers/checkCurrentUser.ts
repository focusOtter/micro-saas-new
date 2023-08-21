import { Auth } from 'aws-amplify'
import { AmplifyUser } from '@aws-amplify/ui'

export const checkCurrentUser = async (): Promise<AmplifyUser | null> => {
	let user: AmplifyUser | null = null
	try {
		user = await Auth.currentAuthenticatedUser()
	} catch (e) {
		user = null
	}
	return user
}
