import { PricingTable } from '@/components/PricingTable'
import { RequireAuth } from '@/components/RequireAuth'
import { useAuthenticator } from '@aws-amplify/ui-react'

function PricingPage() {
	// Display a Stripe Pricing page
	// In dev, they see a confirmation screen.
	// In prod, they are routed to the app
	const { user } = useAuthenticator((context) => [context.user])
	return (
		<RequireAuth>
			<PricingTable user={user} />
		</RequireAuth>
	)
}

export default PricingPage
