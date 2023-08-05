import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/AuthNavbar'
import { PricingTable } from '@/components/PricingTable'
import { Authenticator } from '@aws-amplify/ui-react'

function PricingPage() {
	// Display a Stripe Pricing page
	// In dev, they see a confirmation screen.
	// In prod, they are routed to the app

	return (
		<>
			<div className="mb-4">
				<Navbar />
			</div>
			<Authenticator socialProviders={['google']} signUpAttributes={['email']}>
				{({ user, signOut }) => {
					if (user) {
						console.log('user', user)

						//
						return <PricingTable user={user} />
					}
					return <></>
				}}
			</Authenticator>
			<Footer />
		</>
	)
}

export default PricingPage
