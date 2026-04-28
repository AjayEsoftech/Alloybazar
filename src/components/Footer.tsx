import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 space-y-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-md bg-amber-brand text-zinc-950 flex items-center justify-center shadow-md">
                <span className="text-base font-black leading-none">A</span>
              </div>
              <span className="text-[13px] font-bold tracking-[0.18em] text-white uppercase">
                Alloybazaar
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              India&apos;s first technology-driven digital marketplace dedicated to alloy steel — connecting rolling
              mills, suppliers, stockists and end users on a single transparent platform.
            </p>
            <p className="eyebrow pt-2">Powering India&apos;s Alloy Steel Supply Chain</p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="font-semibold text-white text-sm">Platform</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#solutions" className="hover:text-amber-brand transition-colors">Solutions</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-brand transition-colors">How it works</a></li>
              <li><a href="#why" className="hover:text-amber-brand transition-colors">Why us</a></li>
              <li><a href="#about" className="hover:text-amber-brand transition-colors">About</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="font-semibold text-white text-sm">Catalogue</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link to="/category/die-tool-steel" className="hover:text-amber-brand transition-colors">
                  Die &amp; Tool Steel
                </Link>
              </li>
              <li>
                <Link to="/category/high-speed-steel" className="hover:text-amber-brand transition-colors">
                  High-Speed Steel
                </Link>
              </li>
              <li>
                <Link to="/category/engineering-alloy-steel" className="hover:text-amber-brand transition-colors">
                  Alloy Steel Grades
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-amber-brand transition-colors">
                  All products
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <div>
              <h3 className="font-semibold text-white text-sm">Contact</h3>
              <p className="text-sm text-zinc-400 mt-2">
                <a href="mailto:hello@alloybazaar.com" className="hover:text-amber-brand">
                  hello@alloybazaar.com
                </a>
                <br />
                <a href="tel:+919000000000" className="hover:text-amber-brand">
                  +91 90000 00000
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Connect</h3>
              <div className="flex flex-wrap gap-3 text-sm text-zinc-400 mt-2">
                <a href="#" className="hover:text-amber-brand transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-amber-brand transition-colors">Facebook</a>
                <a href="#" className="hover:text-amber-brand transition-colors">Instagram</a>
                <a href="#" className="hover:text-amber-brand transition-colors">X</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Alloybazaar.com. All rights reserved.</p>
          <p>All trademarks and grades belong to their respective owners.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
