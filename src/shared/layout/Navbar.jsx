import { Search, ShoppingBag, User } from 'lucide-react'
import React from 'react'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from '../components/ui/navigation-menu' 
import { NavLink } from 'react-router-dom'
import Logo from '../components/ui/Logo'


const navLinkClass= ({isActive})=>{
	isActive 
	? "text-primary border-b-2"
	: "hover:text-primary"
}

const Navbar = () => {
  return (
<header className='w-full px-15 py-8'>
	<div className='flex items-center justify-between bg-secondary px-6 py-3 rounded-full shadow-sm'>
{/* Logo */}
		<Logo/>


{/* Nav */}
		<NavigationMenu>
			<NavigationMenuList className="gap-2">
				<NavigationMenuItem>
					<NavLink to="/" end className={navLinkClass}>Shop</NavLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavLink to="/collections" className={navLinkClass}>Collections</NavLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavLink to="/offers" className={navLinkClass}>Offers</NavLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>
						More
					</NavigationMenuTrigger>
					<NavigationMenuContent className="p-3 bg-card border rounded-md shadow-md">
						<div className='flex flex-col gap-2 w-37.5'>
							<NavLink to="/wallet" className={navLinkClass}>Wallet</NavLink>
							<NavLink to="/coins" className={navLinkClass}>Coins</NavLink>
							<NavLink to="/wishlist" className={navLinkClass}>My Wishlist</NavLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>
						Account
					</NavigationMenuTrigger>
					<NavigationMenuContent className="p-3 bg-card border rounded-md shadow-md">
						<div className='flex flex-col gap-2 w-37.5'>
							<NavLink to="/profile" className="hover:text-primary">Profile</NavLink>
							<NavLink to="/saved-address" className="hover:text-primary">Saved Address</NavLink>
							<NavLink to="/order-history" className="hover:text-primary">Order History</NavLink>
							<NavLink to="/payments" className="hover:text-primary">Payments</NavLink>
							<NavLink to="/logout" className="hover:text-primary">Sign Out</NavLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>

{/* Icons */}
		<div className='flex items-center gap-4'>
			<Search className='w-5 h-5 cursor-pointer'/>
			<ShoppingBag className='w-5 h-5 cursor-pointer'/>
			<User className='w-5 h-5 cursor-pointer'/>
		</div>
	</div>
</header>
  )
}

export default Navbar
