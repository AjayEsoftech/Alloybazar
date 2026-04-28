import { ArrowDown, ArrowUp, Clock } from "lucide-react";

type Quote = {
  grade: string;
  price: number;
  change: number;
};

const quotes: Quote[] = [
  { grade: "EN8 Round", price: 78.2, change: 0.4 },
  { grade: "EN19 / 4140", price: 92.5, change: -0.6 },
  { grade: "EN24 / 4340", price: 116.8, change: 1.2 },
  { grade: "EN31 / 52100", price: 105.0, change: 0.0 },
  { grade: "16MnCr5", price: 98.4, change: 0.7 },
  { grade: "20MnCr5", price: 99.9, change: -0.3 },
  { grade: "SAE 8620", price: 104.6, change: 0.9 },
  { grade: "C45 / S45C", price: 76.3, change: 0.2 },
  { grade: "P20 Mould", price: 178.5, change: 1.5 },
  { grade: "H13 Hot Work", price: 285.0, change: -0.4 },
  { grade: "D2 Cold Work", price: 245.3, change: 0.6 },
  { grade: "M2 HSS", price: 980.0, change: -1.1 },
  { grade: "A335 P11", price: 168.0, change: 0.3 },
  { grade: "A335 P22", price: 192.5, change: 0.8 },
  { grade: "A182 F22", price: 215.0, change: -0.2 },
];

const Pill = ({ q }: { q: Quote }) => {
  const up = q.change > 0;
  const flat = q.change === 0;
  const color = flat ? "text-slate-300" : up ? "text-emerald-300" : "text-red-300";
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-r border-white/10">
      <span className="text-[11px] font-medium uppercase tracking-wide text-slate-200">{q.grade}</span>
      <span className="text-[11px] font-semibold text-white tabular-nums">₹{q.price.toFixed(1)}/kg</span>
      <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium tabular-nums ${color}`}>
        {!flat && (up ? <ArrowUp className="h-2.5 w-2.5" /> : <ArrowDown className="h-2.5 w-2.5" />)}
        {flat ? "0.0" : `${q.change > 0 ? "+" : ""}${q.change.toFixed(1)}`}%
      </span>
    </div>
  );
};

const MarketTicker = () => {
  const now = new Date();
  const stamp = `${now.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} • ${now.toLocaleTimeString(
    "en-IN",
    { hour: "2-digit", minute: "2-digit" }
  )} IST`;

  return (
    <div className="bg-slate-950 text-white border-b border-white/10">
      <div className="flex items-stretch overflow-hidden">
        <div className="hidden md:flex items-center gap-2 shrink-0 bg-amber-500/10 border-r border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          Live alloy market
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex w-max ticker-track">
            {[...quotes, ...quotes].map((q, i) => (
              <Pill key={`${q.grade}-${i}`} q={q} />
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 border-l border-white/10 px-4 py-2 text-[11px] text-slate-400">
          <Clock className="h-3 w-3" />
          {stamp}
        </div>
      </div>
      <p className="sr-only">
        Indicative reference rates for selected alloy steel grades. Final pricing depends on size, quantity,
        location and condition.
      </p>
    </div>
  );
};

export default MarketTicker;
