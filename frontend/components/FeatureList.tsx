import {
	ArrowUpOnSquareIcon as FoodIcon,
	ArrowsPointingOutIcon as PeopleIcon,
	ArrowTopRightOnSquareIcon as RecipeIcon,
} from '@heroicons/react/20/solid'

const createRecipesContent = {
	heading: 'Create delicious recipes',
	subHeading: 'Effortlessly',
	description: '',
	displayImage:
		'https://example.com/img/component-images/recipe-app-screenshot.png',
	features: [
		{
			name: 'Recipe builder',
			description:
				'Our easy-to-use recipe builder lets you create and modify recipes with ease. Simply add your ingredients and instructions, and watch your recipe come to life!',
			icon: RecipeIcon,
		},
		{
			name: 'Image upload',
			description:
				'Upload images of your creations. Our image upload feature makes it easy to share your recipes with the world!',
			icon: FoodIcon,
		},
		{
			name: 'Keep the tradition going with AI',
			description:
				"Our AI will help you keep your recipes alive for generations to come. We use machine learning to help you create new recipes based on your family's favorites!",

			icon: PeopleIcon,
		},
	],
}

type FeatureItemProps = {
	featureContent: {
		heading: string
		subHeading: string
		description: string
		displayImage: string
		features: {
			name: string
			description: string
			icon: any
		}[]
	}
}

const FeatureItem = ({ featureContent }: FeatureItemProps) => {
	return (
		<div className="overflow-hidden py-24 sm:py-32 bg-gradient-to-r from-teal-200 to-teal-500">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
					<div className="lg:pr-8 lg:pt-4">
						<div className="lg:max-w-lg">
							<h2 className="text-base font-semibold leading-7">
								{featureContent.heading}
							</h2>
							<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
								{featureContent.subHeading}
							</p>
							<p className="mt-6 text-lg leading-8 ">
								{featureContent.description}
							</p>
							<dl className="mt-10 max-w-xl space-y-8 text-base leading-7  lg:max-w-none">
								{featureContent.features.map((feature) => (
									<div key={feature.name} className="relative pl-9">
										<dt className="inline font-semibold ">
											<feature.icon
												className="absolute left-1 top-1 h-5 w-5"
												aria-hidden="true"
											/>
											{feature.name}
										</dt>{' '}
										<dd className="inline">{feature.description}</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
					<div className="flex items-center">
						<img
							src="https://res.cloudinary.com/dmqt94fit/image/upload/q_auto/v1682012370/miami-lunch_50_qp1itg.png"
							alt="Product screenshot"
							className=" w-full h-full object-cover rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-auto sm:h-auto md:-ml-4 lg:-ml-0"
							width={1432}
							height={442}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export const FeatureList = () => {
	const featureListContent = [createRecipesContent]
	return (
		<>
			{featureListContent.map((featureContent) => (
				<FeatureItem
					key={featureContent.heading}
					featureContent={featureContent}
				/>
			))}
		</>
	)
}
