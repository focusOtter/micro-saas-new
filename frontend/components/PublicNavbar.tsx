import Link from 'next/link'

export const PublicNavbar = () => {
	return (
		<div className="navbar bg-yellow-50">
			<div className="flex-1">
				<Link className="btn btn-ghost normal-case text-xl" href={'/'}>
					Otterlicious
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1"></ul>
			</div>
		</div>
	)
}
