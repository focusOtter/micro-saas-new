import Link from 'next/link'

import { useRouter } from 'next/router'
import { Button, useAuthenticator } from '@aws-amplify/ui-react'

export const AuthNavbar = () => {
	const router = useRouter()
	const { route, signOut, user } = useAuthenticator((context) => [
		context.route,
		context.signOut,
	])
	function logOut() {
		signOut()
		router.push('/login')
	}
	return (
		<div className="navbar bg-yellow-50">
			<div className="flex-1">
				<Link className="btn btn-ghost normal-case text-xl" href={'/'}>
					Otterlicious
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					{user && (
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
							{route !== 'authenticated' ? (
								<Button onClick={() => router.push('/login')}>Login</Button>
							) : (
								<Button onClick={() => logOut()}>Logout</Button>
							)}
						</>
					)}
					<li>{!user && <Link href={'/my-recipes/'}>My Recipes</Link>}</li>
				</ul>
			</div>
		</div>
	)
}
