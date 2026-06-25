import { Search, ShoppingBag, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../components/ui/navigation-menu";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../components/ui/Logo";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { useCartStore } from "@/features/user-side/cart/store/cart.store";
import { useWishlistStore } from "@/features/user-side/wishlist/store/store.wishlist";
import ConfirmModal from "../components/ConfirmModal";


const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive
      ? "text-primary border-b-2 border-primary font-bold"
      : "text-foreground/70 hover:text-primary"
  }`;

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const items= useCartStore((state)=> state.items)
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal]= useState(false)

useEffect(() => {
  fetchCart();
  fetchWishlist();
}, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successfully");
      setShowConfirmModal(false)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

//const cartCount = items.reduce((total, item) => total + item.quantity, 0);
const cartCount= items.length
  return (
    <header className="w-full px-4 md:px-8 lg:px-15 py-4 md:py-8">
      <div className="flex items-center justify-between bg-secondary px-4 md:px-6 py-3 rounded-full shadow-sm">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              <NavigationMenuItem>
                <NavLink to="/" end className={navLinkClass}>
                  Shop
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink to="/collections" className={navLinkClass}>
                  Collections
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink to="/wishlist" className={navLinkClass}>
                  Wishlist
                </NavLink>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <NavLink to="/offers" className={navLinkClass}>
                  Offers
                </NavLink>
              </NavigationMenuItem> */}

              {/* More */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>More</NavigationMenuTrigger>

                <NavigationMenuContent className="p-3 bg-card border rounded-md shadow-md">
                  <ul className="flex flex-col gap-2 w-40">
                    {/* <li>
                      <NavLink to="/wishlist" className={navLinkClass}>
                        Wishlist
                      </NavLink>
                    </li> */}

                    <li>
                      <NavLink to="/more/wallet" className={navLinkClass}>
                        Wallet
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/more/referral&rewards"
                        className={navLinkClass}
                      >
                        Referral & Rewards
                      </NavLink>
                    </li>

                    {/* <li>
                      <NavLink to="/more/coins" className={navLinkClass}>
                        Coins
                      </NavLink>
                    </li> */}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Account */}
              <NavigationMenuItem>
                {user ? (
                  <>
                    <NavigationMenuTrigger>Account</NavigationMenuTrigger>

                    <NavigationMenuContent className="p-3 bg-card border rounded-md shadow-md">
                      <ul className="flex flex-col gap-2 w-40">
                        <li>
                          <NavLink
                            to="/account/profile"
                            className="hover:text-primary"
                          >
                            Profile
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/account/addresses"
                            className="hover:text-primary"
                          >
                            Saved Address
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/account/order-history"
                            className="hover:text-primary"
                          >
                            Order History
                          </NavLink>
                        </li>

                        {/* <li>
                          <NavLink
                            to="/account/payments"
                            className="hover:text-primary"
                          >
                            Payments
                          </NavLink>
                        </li> */}

                        <li>
                          <button
                            type="button"
                            onClick={() => setShowConfirmModal(true)}
                            className="hover:text-primary"
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer" />

          <button
            onClick={() => navigate("/cart")}
            className="
          relative
        "
          >
            <ShoppingBag
              className="
            h-5
            w-5
            cursor-pointer
          "
            />

            {/* BADGE */}
            {cartCount > 0 && (
              <span
                className="
              absolute
              -right-2
              -top-2

              flex
              h-5
              w-5
              items-center
              justify-center

              rounded-full

              bg-black
              text-[10px]
              font-semibold
              text-white
            "
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-secondary rounded-3xl p-6 shadow-md">
          <div className="flex flex-col gap-5">
            <NavLink
              to="/"
              end
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </NavLink>

            <NavLink
              to="/collections"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </NavLink>
            {/* 
            <NavLink
              to="/offers"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Offers
            </NavLink> */}

            <NavLink
              to="/more/wallet"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Wallet
            </NavLink>
            <NavLink
              to="/more/referral&rewards"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Referral & Rewards
            </NavLink>

            {/* <NavLink
              to="/coins"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Coins
            </NavLink> */}

            <NavLink
              to="/wishlist"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist
            </NavLink>

            {user ? (
              <>
                <NavLink to="/account/profile" className={navLinkClass}>
                  Profile
                </NavLink>

                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="text-left text-sm font-medium hover:text-primary"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            )}

            {/* Mobile Icons */}
            <div className="flex items-center gap-4 pt-2">
              <Search className="w-5 h-5 cursor-pointer" />

              <button
                onClick={() => navigate("/cart")}
                className="
          relative
        "
              >
                <ShoppingBag
                  className="
            h-5
            w-5
            cursor-pointer
          "
                />

                {/* BADGE */}
                {cartCount > 0 && (
                  <span
                    className="
              absolute
              -right-2
              -top-2

              flex
              h-5
              w-5
              items-center
              justify-center

              rounded-full

              bg-black
              text-[10px]
              font-semibold
              text-white
            "
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        title="Are you sure to sign out?"
        description=""
        onConfirm={handleLogout}
      />
    </header>
  );
};

export default Navbar;
