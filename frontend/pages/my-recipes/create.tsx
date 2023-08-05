import Head from 'next/head'
import { View, withAuthenticator } from '@aws-amplify/ui-react'
import { useState } from 'react'
import { RecipeForm } from '@/components/RecipeForm'
import { Navbar } from '@/components/AuthNavbar'
import { Footer } from '@/components/Footer'
import { RecipeCreateInput } from '@/src/API'
import { API } from 'aws-amplify'
import { createRecipe } from '@/src/graphql/mutations'
import ReactConfetti from 'react-confetti'
import Confetti from 'react-confetti/dist/types/Confetti'

type CreateRecipePageProps = {
	user: any
	signOut: () => void
}
const CreateRecipePage = ({ user }: CreateRecipePageProps) => {
	const [showConfetti, setShowConfetti] = useState(false)

	const handleFormSubmit = async (recipeData: RecipeCreateInput) => {
		console.log(recipeData)
		let res
		try {
			res = await API.graphql({
				query: createRecipe,
				variables: {
					input: recipeData,
				},
			})

			setShowConfetti(true)
		} catch (err) {
			console.log(err)
		}
		console.log(res)
	}

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<View>
				<Navbar isAuthPage />
				<RecipeForm handleFormSubmit={handleFormSubmit} />
			</View>
			{showConfetti && (
				<ReactConfetti
					style={{ pointerEvents: 'none' }}
					numberOfPieces={500}
					recycle={false}
					onConfettiComplete={(confetti) => {
						setShowConfetti(false)
						confetti?.reset()
					}}
				/>
			)}
			<Footer />
		</>
	)
}

export default withAuthenticator(CreateRecipePage)
