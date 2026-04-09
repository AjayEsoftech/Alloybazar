const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div className="flex flex-col md:flex-row gap-8 md:items-start md:justify-between">
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-sky-500/10 border border-sky-500/50 flex items-center justify-center">
                <span className="text-lg font-black text-sky-300 leading-none">A</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight">Alloybazaar</span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Alloy Steel Marketplace
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              A B2B marketplace for alloy steel. Built for industrial procurement: grades, specs, testing, traceability,
              and reliable fulfilment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-100 text-sm">Contact</h3>
              <p className="text-slate-400">
                Email: <a href="mailto:hello@alloybazaar.com">hello@alloybazaar.com</a>
                <br />
                Phone: +91 90000 00000
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-100 text-sm">Connect</h3>
              <div className="flex flex-wrap gap-3 text-slate-400">
                <a href="#" className="hover:text-slate-100 transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-slate-100 transition-colors">
                  Facebook
                </a>
                <a href="#" className="hover:text-slate-100 transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-slate-100 transition-colors">
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Alloybazaar. All rights reserved.</p>
          <p>All trademarks and grades belong to their respective owners.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
