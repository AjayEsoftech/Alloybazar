import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goToHome = (hash?: string) => {
    setOpen(false);
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

  const navItems: { label: string; hash?: string; to?: string }[] = [
    { label: "Solutions", hash: "#solutions" },
    { label: "Industries", hash: "#industries" },
    { label: "Catalogue", to: "/products" },
    { label: "About", hash: "#about" },
    { label: "Contact", hash: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0 group" aria-label="Alloybazaar home">
            <div className="h-8 w-8 rounded-md bg-amber-brand text-zinc-950 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-base font-black leading-none">A</span>
            </div>
            <span className="hidden sm:inline text-[13px] font-bold tracking-[0.18em] text-white uppercase">
              Alloybazaar
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 ml-8 text-[13px] text-zinc-300">
            {navItems.map((item) =>
              item.to ? (
                <Link key={item.label} to={item.to} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => goToHome(item.hash)}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          <div className="flex-1" />

          <button
            type="button"
            onClick={() => goToHome("#contact")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-brand text-amber-brand bg-transparent px-4 py-2 text-[13px] font-semibold hover:bg-amber-brand hover:text-zinc-950 transition-colors"
          >
            Get Early Access
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-md text-white p-2 hover:bg-white/10"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-zinc-800 py-3 text-sm text-zinc-200">
            <div className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => goToHome(item.hash)}
                    className="text-left rounded-md px-3 py-2 hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </button>
                )
              )}
              <button
                type="button"
                onClick={() => goToHome("#contact")}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-brand text-zinc-950 px-4 py-2.5 font-semibold"
              >
                Get Early Access
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
