import Script from 'next/script'
import { AmplifyUser } from '@aws-amplify/ui'
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'stripe-pricing-table': any
		}
	}
}

type PricingTableProps = {
	user: AmplifyUser | undefined
}

export const PricingTable = ({ user }: PricingTableProps) => {
	return (
		<>
			<Script async src="https://js.stripe.com/v3/pricing-table.js"></Script>

			<stripe-pricing-table
				pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
				publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
				// client-reference-id={`${user.attributes?.sub}__${user.username}`}
				// customer-email={user.attributes?.email}
			></stripe-pricing-table>
		</>
	)
}
