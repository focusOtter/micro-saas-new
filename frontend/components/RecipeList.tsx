import { Recipe } from '@/src/API'
import { CldImage } from 'next-cloudinary'

export type RecipeListProps = {
	recipes: Recipe[] | []
	handlePostSelect?: (post: Recipe) => void | (() => {})
}
export const RecipeList = ({
	recipes,
	handlePostSelect = () => {},
}: RecipeListProps) => {
	return (
		<main className="flex flex-wrap justify-around">
			{recipes.map((post: Recipe) => {
				return (
					<div
						key={post.id}
						onClick={() => handlePostSelect(post)}
						className="card w-96 bg-base-300 shadow-xl mb-8"
					>
						<figure>
							<CldImage
								className="mask mask-parallelogram"
								crop="fill"
								width="384"
								height="250"
								src={`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER}/public/${post.coverImage}`}
								alt={post.description!}
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title">{post.title}</h2>
							<p>{post.description}</p>
						</div>
					</div>
				)
			})}
		</main>
	)
}
