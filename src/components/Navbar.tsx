
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Soil Report", path: "/soil-report" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-agrihealth-green py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="text-agrihealth-green text-lg font-bold">AH</div>
          </div>
          <span className="text-white text-xl font-bold">AgriHealth</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-white hover:text-agrihealth-cream transition-colors ${
                location.pathname === link.path
                  ? "font-bold border-b-2 border-white"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login">
            <Button className="bg-white text-agrihealth-green hover:bg-agrihealth-cream">
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-agrihealth-green border-t border-agrihealth-green-light mt-4">
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-white hover:text-agrihealth-cream transition-colors ${
                  location.pathname === link.path ? "font-bold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-white text-agrihealth-green hover:bg-agrihealth-cream">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
