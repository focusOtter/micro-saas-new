import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { PricingTable } from '@/components/PricingTable'
import { withAuthenticator } from '@aws-amplify/ui-react'

type PricingPageProps = {
	user: {
		username: string
		attributes: {
			sub: string
			email: string
		}
	}
}

function PricingPage({ user }: PricingPageProps) {
	// Display a Stripe Pricing page
	// In dev, they see a confirmation screen.
	// In prod, they are routed to the app

	return (
		<>
			<div className="mb-4">
				<Navbar />
			</div>
			<PricingTable user={user} />
			<Footer />
		</>
	)
}

export default withAuthenticator(PricingPage, {
	signUpAttributes: ['email'],
})
