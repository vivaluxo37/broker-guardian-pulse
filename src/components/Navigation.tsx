import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navItems = [
  { 
    name: "Best Brokers", 
    href: "#brokers", 
    isRoute: false,
    submenu: [
      { name: "Best Online Brokers", href: "#best-online-brokers" },
      { name: "Best CFD Brokers", href: "#best-cfd-brokers" },
      { name: "Best Forex Brokers", href: "#best-forex-brokers" },
      { name: "Best Stock Brokers", href: "#best-stock-brokers" },
      { name: "Best Crypto Brokers", href: "#best-crypto-brokers" },
      { name: "Best Day Trading Brokers", href: "#best-day-trading-brokers" },
      { name: "Best Options Brokers", href: "#best-options-brokers" },
      { name: "Best Futures Brokers", href: "#best-futures-brokers" },
      { name: "Low Cost Brokers", href: "#low-cost-brokers" },
      { name: "Commission Free Brokers", href: "#commission-free-brokers" }
    ]
  },
  { 
    name: "Broker Reviews", 
    href: "#reviews", 
    isRoute: false,
    submenu: [
      { name: "Interactive Brokers Review", href: "#interactive-brokers-review" },
      { name: "XTB Review", href: "#xtb-review" },
      { name: "IC Markets Review", href: "#ic-markets-review" },
      { name: "eToro Review", href: "#etoro-review" },
      { name: "Plus500 Review", href: "#plus500-review" },
      { name: "IG Review", href: "#ig-review" },
      { name: "Capital.com Review", href: "#capital-com-review" },
      { name: "Pepperstone Review", href: "#pepperstone-review" },
      { name: "OANDA Review", href: "#oanda-review" },
      { name: "All Broker Reviews", href: "#all-broker-reviews" }
    ]
  },
  { name: "Scam Shield", href: "/scam-broker-shield", isRoute: true },
  { 
    name: "Tools", 
    href: "#tools", 
    isRoute: false,
    submenu: [
      { name: "Broker Comparison Tool", href: "#broker-comparison" },
      { name: "Broker Finder", href: "#broker-finder" },
      { name: "Trading Fee Calculator", href: "#fee-calculator" },
      { name: "Forex Calculator", href: "#forex-calculator" },
      { name: "Pip Calculator", href: "#pip-calculator" },
      { name: "Margin Calculator", href: "#margin-calculator" },
      { name: "Currency Converter", href: "#currency-converter" },
      { name: "Economic Calendar", href: "#economic-calendar" }
    ]
  },
  { 
    name: "For Beginners", 
    href: "#beginners", 
    isRoute: false,
    submenu: [
      { name: "How to Start Trading", href: "#how-to-start-trading" },
      { name: "How to Choose a Broker", href: "#how-to-choose-broker" },
      { name: "Trading for Beginners", href: "#trading-for-beginners" },
      { name: "Forex Trading Basics", href: "#forex-trading-basics" },
      { name: "Stock Trading Basics", href: "#stock-trading-basics" },
      { name: "CFD Trading Guide", href: "#cfd-trading-guide" },
      { name: "Investment Strategies", href: "#investment-strategies" },
      { name: "Risk Management", href: "#risk-management" },
      { name: "Trading Psychology", href: "#trading-psychology" },
      { name: "Trading Glossary", href: "#trading-glossary" }
    ]
  },
  { 
    name: "About", 
    href: "#about", 
    isRoute: false,
    submenu: [
      { name: "About BROKERANALYSIS", href: "#about-us" },
      { name: "Our Methodology", href: "#our-methodology" },
      { name: "Our Team", href: "#our-team" },
      { name: "Awards & Recognition", href: "#awards" },
      { name: "Press & Media", href: "#press-media" },
      { name: "Contact Us", href: "#contact-us" },
      { name: "Careers", href: "#careers" },
      { name: "Partners", href: "#partners" },
      { name: "Privacy Policy", href: "#privacy-policy" },
      { name: "Terms of Service", href: "#terms-of-service" }
    ]
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (item: { href: string; isRoute: boolean }) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(item.href);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-elegant"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center group">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
              BROKERANALYSIS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                            {item.submenu.map((subItem) => (
                              <NavigationMenuLink
                                key={subItem.name}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                                onClick={() => handleNavigation({ href: subItem.href, isRoute: false })}
                              >
                                <div className="text-sm font-medium leading-none">{subItem.name}</div>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/20 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                        onClick={() => handleNavigation(item)}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              🇵🇭 PH
            </Button>
            <Button variant="premium" size="sm" onClick={() => handleNavigation({ href: "#match", isRoute: false })}>
              Match Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-elegant animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className="flex items-center justify-between w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-accent/20 rounded-lg transition-colors"
                  >
                    {item.name}
                    {item.submenu && <ChevronDown className="h-4 w-4" />}
                  </button>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavigation({ href: subItem.href, isRoute: false })}
                          className="block w-full text-left px-4 py-2 text-sm text-foreground/60 hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <Button variant="outline" size="sm">
                  🇵🇭 Philippines
                </Button>
                <Button variant="premium" onClick={() => handleNavigation({ href: "#match", isRoute: false })}>
                  Match Me
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}