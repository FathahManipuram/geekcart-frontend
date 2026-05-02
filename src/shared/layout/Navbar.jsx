import { Search, ShoppingBag, User } from 'lucide-react'
import React from 'react'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from '../components/ui/navigation-menu' 
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { toast } from 'sonner'


const navLinkClass= ({isActive})=>
`text-sm font-medium transition-colors ${
isActive 
	? "text-primary border-b-3 border-primary font-bold"
	: "text-foreground/70 hover:text-primary"
}`;


const Navbar = () => {
	const user = useAuthStore((state)=> state.user)
	const logout= useAuthStore((state)=> state.logout)
	const navigate= useNavigate()

	const handleLogout= ()=>{
		try{
			logout()
			toast.success("Logout successfully")
			navigate("/")
		}catch(err){
			console.log(err)
		}
	}
	console.log("User: ",user)
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

				<NavigationMenuItem className="relative">
					<NavigationMenuTrigger>
						More
					</NavigationMenuTrigger>
					<NavigationMenuContent className="p-3 bg-card border rounded-md shadow-md">
						<ul className='flex flex-col gap-2 w-37.5'>
							<li><NavLink to="/wallet" className={navLinkClass}>Wallet</NavLink></li>
							<li><NavLink to="/coins" className={navLinkClass}>Coins</NavLink></li>
							<li><NavLink to="/wishlist" className={navLinkClass}>My Wishlist</NavLink></li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>
						{user? "Account": "Login"}
					</NavigationMenuTrigger>
					<NavigationMenuContent className="p-3 bg-card border rounded-md shadow-md">
						<ul className='flex flex-col gap-2 w-37.5'>
							{!user && (
								<li><NavLink to="/login" className="hover:text-primary">Login</NavLink></li>
							) }
							<li><NavLink to="/profile" className="hover:text-primary">Profile</NavLink></li>
							<li><NavLink to="/saved-address" className="hover:text-primary">Saved Address</NavLink></li>
							<li><NavLink to="/order-history" className="hover:text-primary">Order History</NavLink></li>
							<li><NavLink to="/payments" className="hover:text-primary">Payments</NavLink></li>
							{user && (
								<li><NavLink onClick={()=> handleLogout()} className="hover:text-primary">Sign Out</NavLink></li>
							)}
							
						</ul>
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
