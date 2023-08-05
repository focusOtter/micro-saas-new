import { FeatureList } from '@/components/FeatureList'
import { Testimonial } from '@/components/Testimonial'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { useAuthenticator } from '@aws-amplify/ui-react'

function Home() {
	const { route, user } = useAuthenticator((context) => [context.route])
	return (
		<>
			<Hero />
			<FeatureList />
			<Testimonial />
			<Footer />
		</>
	)
}

export default Home
