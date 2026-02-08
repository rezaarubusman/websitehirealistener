import { useState } from "react";
import { Home, Menu, X, MessagesSquare } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useAuth } from "./stores/useAuth";

const NAV_LINKS = [
  { label: "Home", to: "/", icon: <Home className="h-4 w-4" /> },
];

const Navigationbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-amber-500 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <MessagesSquare className="h-4 w-4 text-primary-foreground" />
            </div>
            Hirealistener
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <p className="text-sm font-medium">{user.name}</p>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Icon Mobile */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-amber-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-3 pb-4 border-t border-amber-600">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-2 px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {/* Auth Buttons Mobile */}
            {user ? (
              <div className="flex flex-col gap-2 px-2">
                <p className="text-sm font-medium">{user.name}</p>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigationbar;
