import { Navbar } from '@/components/Navbar'
import { withAuthenticator } from '@aws-amplify/ui-react'

const Profile = () => {
	return (
		<>
			<Navbar user={null} />
			<pre>
				<code>{JSON.stringify('THE USER DATA FROM THE DB')}</code>
			</pre>
		</>
	)
}

export default withAuthenticator(Profile)
