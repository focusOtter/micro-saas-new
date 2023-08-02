import { FeatureList } from '@/components/FeatureList'
import { Testimonial } from '@/components/Testimonial'
import { checkCurrentUser } from '@/helpers/checkCurrentUser'
import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'

function Home() {
	const [isAuthPage, setIsAuthPage] = useState<boolean | undefined>()
	useEffect(() => {
		checkCurrentUser().then((user) => {
			setIsAuthPage(user ? true : false)
		})
	}, [])

	return (
		<>
			<Navbar isAuthPage={isAuthPage} />
			<Hero />
			<FeatureList />
			<Testimonial />
			<Footer />
		</>
	)
}

export default Home
