import Script from 'next/script'

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'stripe-pricing-table': any
		}
	}
}

type PricingTableProps = {
	user: {
		username: string
		attributes: {
			email: string
			sub: string
		}
	}
}

export const PricingTable = ({ user }: PricingTableProps) => {
	return (
		<>
			<Script async src="https://js.stripe.com/v3/pricing-table.js"></Script>

			<stripe-pricing-table
				pricing-table-id={process.env.NEXT_PUBLIC_stripePricingTableID}
				publishable-key={process.env.NEXT_PUBLIC_stripePublishableKey}
				client-reference-id={`${user.attributes.sub}__${user.username}`}
				customer-email={user.attributes.email}
			></stripe-pricing-table>
		</>
	)
}
