type BillingPortalProps = {
	email: string
}
export const BillingPortalLink = ({ email }: BillingPortalProps) => {
	return (
		<a
			href={`http://billing.stripe.com/p/login/test_aEU7uZh2VgkMf8A4gg?prefilled_email=${email}`}
			target="_blank"
			rel="noopener noreferrer"
		>
			Billing portal
		</a>
	)
}
