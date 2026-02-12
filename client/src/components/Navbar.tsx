import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Live Demo", href: "#demo" },
  { label: "Traction", href: "#traction" },
  { label: "Ask", href: "#ask" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm border-b border-white/20 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="bg-primary p-2 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight font-display",
            isScrolled ? "text-foreground" : "text-white"
          )}>
            ServiceAI
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isScrolled ? "text-muted-foreground" : "text-white/80 hover:text-white"
              )}
            >
              {item.label}
            </button>
          ))}
          <Button 
            onClick={() => scrollToSection("#contact")}
            variant={isScrolled ? "default" : "secondary"}
            className="font-semibold"
          >
            Invest Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu className={isScrolled ? "text-foreground" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 md:hidden shadow-xl animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-left py-2 text-foreground font-medium hover:text-primary"
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => scrollToSection("#contact")} className="w-full">
              Invest Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
