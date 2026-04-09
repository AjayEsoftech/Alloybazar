import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToHome = (hash?: string) => {
    if (location.pathname !== "/") {
      navigate(`/${hash ?? ""}`);
      return;
    }
    if (hash) {
      window.location.hash = hash.replace(/^#/, "");
    } else {
      window.location.hash = "top";
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center">
            <span className="text-lg font-black text-primary leading-none">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-foreground">Alloybazaar</span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Alloy Steel Marketplace
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <button type="button" onClick={() => goToHome("#about")} className="hover:text-foreground transition-colors">
            About
          </button>
          <button type="button" onClick={() => goToHome("#who")} className="hover:text-foreground transition-colors">
            Who it&apos;s for
          </button>
          <button type="button" onClick={() => goToHome("#benefits")} className="hover:text-foreground transition-colors">
            Key benefits
          </button>
          <button type="button" onClick={() => goToHome("#categories")} className="hover:text-foreground transition-colors">
            Categories
          </button>
          <Link to="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <button type="button" onClick={() => goToHome("#lead")} className="hover:text-foreground transition-colors">
            Register interest
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToHome("#lead")}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
