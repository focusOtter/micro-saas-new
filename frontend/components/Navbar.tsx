import Link from 'next/link'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'

type NavBarProps = {
	isAuthPage?: boolean
}

export const Navbar = ({ isAuthPage }: NavBarProps) => {
	const router = useRouter()
	return (
		<div className="navbar bg-yellow-50">
			<div className="flex-1">
				<Link className="btn btn-ghost normal-case text-xl" href={'/'}>
					Otterlicious
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					{isAuthPage && (
						<>
							<li>
								<Link href={'/my-recipes/'}>My Recipes</Link>
							</li>
							<li>
								<Link href={'/my-recipes/create'}>Create Recipe</Link>
							</li>
							<li>
								<Link href="/profile" className="justify-between">
									Profile
								</Link>
							</li>
							<li>
								<button
									onClick={() =>
										Auth.signOut().then(() => {
											if (router.pathname !== '/') {
												router.push('/')
											} else {
												window.location.reload()
											}
										})
									}
								>
									Logout
								</button>
							</li>
						</>
					)}
					<li>
						{!isAuthPage && <Link href={'/my-recipes/'}>My Recipes</Link>}
					</li>
				</ul>
			</div>
		</div>
	)
}
