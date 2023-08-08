import Head from 'next/head'
import { Flex, Heading, useAuthenticator } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { listRecipes } from '@/graphql/queries'
import { ListRecipesQuery } from '@/graphql/API'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { BillingPortalLink } from '@/components/BillingPortalLink'
import { Recipe } from '@/graphql/API'
import { RequireAuth } from '@/components/RequireAuth'
import { StorageImage } from '@aws-amplify/ui-react-storage'

const MyRecipes = () => {
	const { user } = useAuthenticator((context) => [context.user])
	console.log(user)
	const [fetchedRecipes, setFetchedRecipes] = useState<
		(Recipe | null)[] | undefined
	>([])

	useEffect(() => {
		async function listRecipesForUser() {
			const res = (await API.graphql({
				query: listRecipes,
			})) as GraphQLResult<ListRecipesQuery>

			console.log(res.data?.listRecipes)
			setFetchedRecipes(res.data?.listRecipes?.items)
		}

		listRecipesForUser()
	}, [])

	return (
		<RequireAuth>
			<Head>
				<title>Otterlicious</title>
				<meta name="description" content="Generated by Otterlicious" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Flex direction={'column'} height={'100vh'} width={'100vw'}>
				<Flex
					justifyContent={'center'}
					alignItems={'center'}
					direction="column"
					flex={1}
				>
					<Heading level={2} textAlign={'center'}>
						Welcome to my recipes
					</Heading>
					{user && user.attributes?.email && (
						<BillingPortalLink email={user.attributes?.email as string} />
					)}

					{fetchedRecipes?.map((fr) => {
						if (fr) {
							return (
								<div key={fr.id} className="card w-96 bg-base-100 shadow-xl">
									<figure>
										<StorageImage
											alt={fr.title}
											imgKey={fr.coverImage}
											accessLevel="protected"
										/>
									</figure>
									<div className="card-body">
										<h2 className="card-title">
											{fr.title}
											<div className="badge badge-secondary">NEW</div>
										</h2>
										<p>{fr.description}</p>
										<div className="card-actions justify-end">
											<div className="badge badge-outline">Demo</div>
										</div>
									</div>
								</div>
							)
						}
					})}
				</Flex>
			</Flex>
		</RequireAuth>
	)
}

export default MyRecipes
