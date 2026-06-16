import { Badge } from "@/components/ui/badge";

/** Status pill colouring shared across portal sections. */
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    // good / done
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Acknowledged: "bg-emerald-100 text-emerald-700 border-emerald-200",
    // in progress
    Partial: "bg-amber-100 text-amber-700 border-amber-200",
    "In Transit": "bg-amber-100 text-amber-700 border-amber-200",
    "Awaiting Approval": "bg-amber-100 text-amber-700 border-amber-200",
    Quoted: "bg-amber-100 text-amber-700 border-amber-200",
    "In Production": "bg-amber-100 text-amber-700 border-amber-200",
    "Ready to Ship": "bg-amber-100 text-amber-700 border-amber-200",
    // neutral / new
    Submitted: "bg-sky-100 text-sky-700 border-sky-200",
    Uploaded: "bg-sky-100 text-sky-700 border-sky-200",
    "Order Confirmed": "bg-sky-100 text-sky-700 border-sky-200",
    Pending: "bg-zinc-100 text-zinc-600 border-zinc-200",
    // bad
    Rejected: "bg-red-100 text-red-700 border-red-200",
    Closed: "bg-zinc-100 text-zinc-600 border-zinc-200",
  };
  return (
    <Badge variant="outline" className={`font-medium ${map[status] ?? "bg-zinc-100 text-zinc-600 border-zinc-200"}`}>
      {status}
    </Badge>
  );
}

export function EmptyRow({ message }: { message: string }) {
  return <div className="text-sm text-muted-foreground py-10 text-center">{message}</div>;
}

export function inr(n: number) {
  return `₹ ${n.toLocaleString("en-IN")}`;
}

export function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
