import { Auth } from 'aws-amplify'
import { User } from './types'

export const checkCurrentUser = async (): Promise<User | null> => {
	let user
	try {
		user = await Auth.currentAuthenticatedUser()
	} catch (e) {
		user = null
	}
	return user
}
