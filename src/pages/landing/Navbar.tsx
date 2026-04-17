import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import rucsLogo from "@/assets/rucs-logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Benefits", href: "#benefits" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={rucsLogo} alt="RUNSMSL" className="h-9 w-9 object-contain" />
          <span className="font-heading text-base sm:text-lg font-bold text-foreground">RUNSMSL</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="gap-1">
              Join <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <img src={rucsLogo} alt="RUNSMSL" className="h-8 w-8 object-contain" />
                  RUNSMSL
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 mt-6">
                {navLinks.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <Link to="/login" onClick={() => setOpen(false)} className="mt-4">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/login" onClick={() => setOpen(false)} className="mt-2">
                  <Button className="w-full gap-1">Join Now <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
