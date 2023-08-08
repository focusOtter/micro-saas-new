import { Footer } from '@/components/Footer'
import { getRecipe } from '@/graphql/queries'
import { API } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Recipe, GetRecipeQuery } from '@/graphql/API'
import { GraphQLResult } from '@aws-amplify/api'
import { RequireAuth } from '@/components/RequireAuth'

//this page will fetch a recipe and then display it.

const RecipePage = () => {
	const [currRecipe, setCurrRecipe] = useState<null | Recipe>()
	const router = useRouter()

	useEffect(() => {
		const fetchRecipe = async () => {
			const recipeId = router.query.recipeId
			const recipeRes = (await API.graphql({
				query: getRecipe,
				variables: {
					id: recipeId,
				},
			})) as GraphQLResult<GetRecipeQuery>
			if (recipeRes.errors) {
				console.log(recipeRes.errors)
			} else {
				console.log(recipeRes.data?.getRecipe)
			}

			setCurrRecipe(recipeRes.data?.getRecipe)
		}

		fetchRecipe()
	}, [router.query.recipeId])
	return (
		<RequireAuth>
			{currRecipe && (
				<div>
					<h1>{currRecipe.title}</h1>
					<p>{currRecipe.description}</p>
					<div
						dangerouslySetInnerHTML={{ __html: currRecipe.ingredientsText }}
					/>
					<div dangerouslySetInnerHTML={{ __html: currRecipe.stepsText }} />
				</div>
			)}
		</RequireAuth>
	)
}

export default RecipePage
