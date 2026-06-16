import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  FileText,
  CheckCircle2,
  Upload,
  Wallet,
  Truck,
  Download,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  usePortalData,
  uid,
  nextRef,
  downloadDocument,
  type DispatchStage,
  type DocType,
} from "@/lib/portalStorage";
import { StatusBadge, EmptyRow, inr, shortDate } from "@/components/portal/portalUi";

const DISPATCH_STAGES: DispatchStage[] = [
  "Order Confirmed",
  "In Production",
  "Ready to Ship",
  "In Transit",
  "Delivered",
];

/* ------------------------------------------------------------------ */
/* 1. Vendor registration                                              */
/* ------------------------------------------------------------------ */
function VendorSection() {
  const { data, update } = usePortalData();
  const { toast } = useToast();
  const blank = { company: "", contactName: "", email: "", phone: "", gstin: "", category: "", address: "" };
  const [form, setForm] = useState(blank);

  const set = (k: keyof typeof blank) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.email) {
      toast({ title: "Missing details", description: "Company name and email are required.", variant: "destructive" });
      return;
    }
    update((d) => {
      d.vendors.unshift({ id: uid("ven"), ...form, status: "Pending", createdAt: new Date().toISOString() });
    });
    setForm(blank);
    toast({ title: "Registration submitted", description: `${form.company} is pending approval.` });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Register as a vendor</CardTitle>
          <CardDescription>Submit your company profile for onboarding.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Company name *</Label>
              <Input value={form.company} onChange={set("company")} placeholder="Meridian Steel Traders" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Contact person</Label>
                <Input value={form.contactName} onChange={set("contactName")} placeholder="Rajesh Kumar" />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input value={form.phone} onChange={set("phone")} placeholder="+91 98200 11223" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email *</Label>
              <Input type="email" value={form.email} onChange={set("email")} placeholder="sales@company.in" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>GSTIN</Label>
                <Input value={form.gstin} onChange={set("gstin")} placeholder="27ABCDE1234F1Z5" />
              </div>
              <div className="space-y-1.5">
                <Label>Product category</Label>
                <Input value={form.category} onChange={set("category")} placeholder="Alloy Steel Bars" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Textarea value={form.address} onChange={set("address")} rows={2} placeholder="Plant / office address" />
            </div>
            <Button type="submit" className="w-full">Submit registration</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Registered vendors</CardTitle>
          <CardDescription>{data.vendors.length} vendor(s) on file.</CardDescription>
        </CardHeader>
        <CardContent>
          {data.vendors.length === 0 ? (
            <EmptyRow message="No vendors registered yet." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.vendors.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <div className="font-medium">{v.company}</div>
                      <div className="text-xs text-muted-foreground">{v.email}</div>
                    </TableCell>
                    <TableCell className="text-sm">{v.contactName || "—"}</TableCell>
                    <TableCell className="text-sm">{v.category || "—"}</TableCell>
                    <TableCell><StatusBadge status={v.status} /></TableCell>
                    <TableCell className="text-right">
                      {v.status === "Pending" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => update((d) => {
                            const t = d.vendors.find((x) => x.id === v.id);
                            if (t) t.status = "Approved";
                          })}
                        >
                          Approve
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Enquiry submission                                               */
/* ------------------------------------------------------------------ */
function EnquirySection() {
  const { data, update } = usePortalData();
  const { toast } = useToast();
  const blank = { product: "", grade: "", quantity: "", unit: "MT", notes: "" };
  const [form, setForm] = useState(blank);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product || !form.quantity) {
      toast({ title: "Missing details", description: "Product and quantity are required.", variant: "destructive" });
      return;
    }
    update((d) => {
      d.enquiries.unshift({
        id: uid("enq"),
        ref: nextRef("ENQ", d.enquiries.length),
        ...form,
        status: "Submitted",
        createdAt: new Date().toISOString(),
      });
    });
    setForm(blank);
    toast({ title: "Enquiry submitted", description: "Our team will revert with a quotation shortly." });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>New enquiry</CardTitle>
          <CardDescription>Tell us what you need and we'll quote.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Product *</Label>
              <Input value={form.product} onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))} placeholder="EN8 Round Bar" />
            </div>
            <div className="space-y-1.5">
              <Label>Grade / spec</Label>
              <Input value={form.grade} onChange={(e) => setForm((f) => ({ ...f, grade: e.target.value }))} placeholder="EN8 / 080M40" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Quantity *</Label>
                <Input value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} placeholder="12" />
              </div>
              <div className="space-y-1.5">
                <Label>Unit</Label>
                <Select value={form.unit} onValueChange={(v) => setForm((f) => ({ ...f, unit: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["MT", "KG", "Pcs", "Mtr"].map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} rows={2} placeholder="Dimensions, finish, delivery location…" />
            </div>
            <Button type="submit" className="w-full">Submit enquiry</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>My enquiries</CardTitle>
          <CardDescription>{data.enquiries.length} enquiry(ies).</CardDescription>
        </CardHeader>
        <CardContent>
          {data.enquiries.length === 0 ? (
            <EmptyRow message="No enquiries submitted yet." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ref</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.enquiries.map((en) => (
                  <TableRow key={en.id}>
                    <TableCell className="font-mono text-xs">{en.ref}</TableCell>
                    <TableCell>
                      <div className="font-medium">{en.product}</div>
                      <div className="text-xs text-muted-foreground">{en.grade || "—"}</div>
                    </TableCell>
                    <TableCell className="text-sm">{en.quantity} {en.unit}</TableCell>
                    <TableCell><StatusBadge status={en.status} /></TableCell>
                    <TableCell className="text-right">
                      {en.status === "Submitted" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => update((d) => {
                            const t = d.enquiries.find((x) => x.id === en.id);
                            if (!t) return;
                            t.status = "Quoted";
                            const price = 80000 + Math.round((en.ref.length * 137) % 9000);
                            const qty = parseFloat(en.quantity) || 1;
                            d.quotations.unshift({
                              id: uid("quo"),
                              ref: nextRef("QTN", d.quotations.length),
                              enquiryRef: en.ref,
                              product: en.product,
                              grade: en.grade,
                              quantity: `${en.quantity} ${en.unit}`,
                              unitPrice: price,
                              total: price * qty,
                              validTill: new Date(Date.now() + 7 * 864e5).toISOString(),
                              status: "Awaiting Approval",
                              createdAt: new Date().toISOString(),
                            });
                          })}
                        >
                          Generate quote
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">{en.status}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Quotation approval                                               */
/* ------------------------------------------------------------------ */
function QuotationSection() {
  const { data, update } = usePortalData();
  const { toast } = useToast();

  const decide = (id: string, approve: boolean) => {
    update((d) => {
      const q = d.quotations.find((x) => x.id === id);
      if (!q) return;
      q.status = approve ? "Approved" : "Rejected";
      if (approve) {
        // Approving a quote spins up a Proforma Invoice document automatically.
        d.documents.unshift({
          id: uid("doc"),
          type: "PI",
          number: `PI-2026-${String(1000 + d.documents.length).slice(-4)}`,
          relatedTo: q.ref,
          party: data.vendors[0]?.company ?? "Customer",
          amount: q.total,
          date: new Date().toISOString(),
        });
      }
    });
    toast({ title: approve ? "Quotation approved" : "Quotation rejected", description: approve ? "A Proforma Invoice has been generated." : undefined });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quotations</CardTitle>
        <CardDescription>Review and approve quotations issued against your enquiries.</CardDescription>
      </CardHeader>
      <CardContent>
        {data.quotations.length === 0 ? (
          <EmptyRow message="No quotations yet. Generate one from the Enquiries tab." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ref</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Unit price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Valid till</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.quotations.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-mono text-xs">{q.ref}</TableCell>
                  <TableCell>
                    <div className="font-medium">{q.product}</div>
                    <div className="text-xs text-muted-foreground">from {q.enquiryRef}</div>
                  </TableCell>
                  <TableCell className="text-sm">{q.quantity}</TableCell>
                  <TableCell className="text-right text-sm">{inr(q.unitPrice)}</TableCell>
                  <TableCell className="text-right font-medium">{inr(q.total)}</TableCell>
                  <TableCell className="text-sm">{shortDate(q.validTill)}</TableCell>
                  <TableCell><StatusBadge status={q.status} /></TableCell>
                  <TableCell className="text-right">
                    {q.status === "Awaiting Approval" ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" onClick={() => decide(q.id, true)}>Approve</Button>
                        <Button size="sm" variant="outline" onClick={() => decide(q.id, false)}>Reject</Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* 4. PO upload                                                        */
/* ------------------------------------------------------------------ */
function PoSection() {
  const { data, update } = usePortalData();
  const { toast } = useToast();
  const approved = data.quotations.filter((q) => q.status === "Approved");
  const [poNumber, setPoNumber] = useState("");
  const [quotationRef, setQuotationRef] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poNumber || !file) {
      toast({ title: "Missing details", description: "PO number and a file are required.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const linked = data.quotations.find((q) => q.ref === quotationRef);
      update((d) => {
        d.purchaseOrders.unshift({
          id: uid("po"),
          poNumber,
          quotationRef: quotationRef || "—",
          fileName: file.name,
          fileType: file.type || "file",
          fileData: String(reader.result),
          amount: linked?.total ?? 0,
          status: "Uploaded",
          createdAt: new Date().toISOString(),
        });
        // PO upload kicks off payment + dispatch tracking automatically.
        if (linked) {
          d.payments.unshift({
            id: uid("pay"),
            ref: nextRef("PAY", d.payments.length),
            poNumber,
            amount: linked.total,
            paid: 0,
            method: "Bank Transfer",
            status: "Pending",
            date: new Date().toISOString(),
          });
          d.dispatches.unshift({
            id: uid("dis"),
            ref: nextRef("DSP", d.dispatches.length),
            poNumber,
            product: `${linked.product} — ${linked.quantity}`,
            carrier: "To be assigned",
            trackingNo: "—",
            stage: "Order Confirmed",
            eta: new Date(Date.now() + 10 * 864e5).toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      });
      setPoNumber("");
      setQuotationRef("");
      setFile(null);
      toast({ title: "PO uploaded", description: "Payment & dispatch tracking has been initiated." });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Upload Purchase Order</CardTitle>
          <CardDescription>Attach your PO against an approved quotation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <div className="space-y-1.5">
              <Label>PO number *</Label>
              <Input value={poNumber} onChange={(e) => setPoNumber(e.target.value)} placeholder="PO-44021" />
            </div>
            <div className="space-y-1.5">
              <Label>Against quotation</Label>
              <Select value={quotationRef} onValueChange={setQuotationRef}>
                <SelectTrigger>
                  <SelectValue placeholder={approved.length ? "Select a quotation" : "No approved quotations"} />
                </SelectTrigger>
                <SelectContent>
                  {approved.map((q) => (
                    <SelectItem key={q.id} value={q.ref}>{q.ref} — {q.product} ({inr(q.total)})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>PO file *</Label>
              <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              {file && <p className="text-xs text-muted-foreground">{file.name}</p>}
            </div>
            <Button type="submit" className="w-full">Upload PO</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Uploaded POs</CardTitle>
          <CardDescription>{data.purchaseOrders.length} purchase order(s).</CardDescription>
        </CardHeader>
        <CardContent>
          {data.purchaseOrders.length === 0 ? (
            <EmptyRow message="No purchase orders uploaded yet." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO No.</TableHead>
                  <TableHead>Quotation</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.purchaseOrders.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-medium">{po.poNumber}</TableCell>
                    <TableCell className="font-mono text-xs">{po.quotationRef}</TableCell>
                    <TableCell>
                      <a href={po.fileData} download={po.fileName} className="text-primary hover:underline text-sm inline-flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" /> {po.fileName}
                      </a>
                    </TableCell>
                    <TableCell className="text-right text-sm">{po.amount ? inr(po.amount) : "—"}</TableCell>
                    <TableCell><StatusBadge status={po.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Payment tracking                                                 */
/* ------------------------------------------------------------------ */
function PaymentSection() {
  const { data, update } = usePortalData();
  const { toast } = useToast();

  const totals = useMemo(() => {
    const billed = data.payments.reduce((s, p) => s + p.amount, 0);
    const paid = data.payments.reduce((s, p) => s + p.paid, 0);
    return { billed, paid, due: billed - paid };
  }, [data.payments]);

  const recordPayment = (id: string, full: boolean) => {
    update((d) => {
      const p = d.payments.find((x) => x.id === id);
      if (!p) return;
      const add = full ? p.amount - p.paid : Math.round(p.amount * 0.3);
      p.paid = Math.min(p.amount, p.paid + add);
      p.status = p.paid >= p.amount ? "Paid" : p.paid > 0 ? "Partial" : "Pending";
      p.date = new Date().toISOString();
      if (p.status === "Paid") {
        d.documents.unshift({
          id: uid("doc"),
          type: "Receipt",
          number: `RCPT-2026-${String(2000 + d.documents.length).slice(-4)}`,
          relatedTo: p.poNumber,
          party: d.vendors[0]?.company ?? "Customer",
          amount: p.amount,
          date: new Date().toISOString(),
        });
      }
    });
    toast({ title: "Payment recorded" });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total billed", value: totals.billed },
          { label: "Received", value: totals.paid },
          { label: "Outstanding", value: totals.due },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">{s.label}</div>
              <div className="text-2xl font-semibold mt-1">{inr(s.value)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>Track invoices and record collections.</CardDescription>
        </CardHeader>
        <CardContent>
          {data.payments.length === 0 ? (
            <EmptyRow message="No payments yet. Upload a PO to start tracking." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ref</TableHead>
                  <TableHead>PO No.</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[180px]">Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.payments.map((p) => {
                  const pct = p.amount ? Math.round((p.paid / p.amount) * 100) : 0;
                  return (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-xs">{p.ref}</TableCell>
                      <TableCell className="text-sm">{p.poNumber}</TableCell>
                      <TableCell className="text-right text-sm">{inr(p.amount)}</TableCell>
                      <TableCell>
                        <Progress value={pct} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">{inr(p.paid)} ({pct}%)</div>
                      </TableCell>
                      <TableCell><StatusBadge status={p.status} /></TableCell>
                      <TableCell className="text-right">
                        {p.status !== "Paid" ? (
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => recordPayment(p.id, false)}>+30%</Button>
                            <Button size="sm" onClick={() => recordPayment(p.id, true)}>Mark paid</Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Settled</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Dispatch tracking                                                */
/* ------------------------------------------------------------------ */
function DispatchSection() {
  const { data, update } = usePortalData();
  const { toast } = useToast();

  const advance = (id: string) => {
    update((d) => {
      const dis = d.dispatches.find((x) => x.id === id);
      if (!dis) return;
      const i = DISPATCH_STAGES.indexOf(dis.stage);
      if (i < DISPATCH_STAGES.length - 1) {
        dis.stage = DISPATCH_STAGES[i + 1];
        dis.updatedAt = new Date().toISOString();
        if (dis.stage === "In Transit") {
          dis.carrier = "BlueDart Surface";
          dis.trackingNo = `BD${Math.abs(dis.id.length * 778231).toString().slice(0, 10)}`;
          // Generate an LR + E-Way bill when goods move.
          d.documents.unshift({
            id: uid("doc"),
            type: "LR",
            number: `LR-${String(5000 + d.documents.length).slice(-4)}`,
            relatedTo: dis.poNumber,
            party: d.vendors[0]?.company ?? "Customer",
            date: new Date().toISOString(),
          });
        }
      }
    });
    toast({ title: "Dispatch updated" });
  };

  return (
    <div className="space-y-4">
      {data.dispatches.length === 0 ? (
        <Card><CardContent className="pt-6"><EmptyRow message="No shipments yet. Upload a PO to begin dispatch tracking." /></CardContent></Card>
      ) : (
        data.dispatches.map((dis) => {
          const idx = DISPATCH_STAGES.indexOf(dis.stage);
          return (
            <Card key={dis.id}>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">{dis.product}</CardTitle>
                    <CardDescription>
                      {dis.ref} · PO {dis.poNumber} · {dis.carrier}
                      {dis.trackingNo !== "—" && <> · <span className="font-mono">{dis.trackingNo}</span></>}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={dis.stage} />
                    {dis.stage !== "Delivered" && (
                      <Button size="sm" onClick={() => advance(dis.id)}>Advance →</Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-1">
                  {DISPATCH_STAGES.map((stage, i) => (
                    <div key={stage} className="flex-1 flex flex-col items-center text-center">
                      <div className="flex items-center w-full">
                        <div className={`h-1 flex-1 ${i === 0 ? "bg-transparent" : i <= idx ? "bg-primary" : "bg-muted"}`} />
                        <div className={`h-3.5 w-3.5 rounded-full shrink-0 ${i <= idx ? "bg-primary" : "bg-muted border border-border"}`} />
                        <div className={`h-1 flex-1 ${i === DISPATCH_STAGES.length - 1 ? "bg-transparent" : i < idx ? "bg-primary" : "bg-muted"}`} />
                      </div>
                      <span className={`text-[11px] mt-1.5 ${i <= idx ? "text-foreground font-medium" : "text-muted-foreground"}`}>{stage}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  ETA {shortDate(dis.eta)} · updated {shortDate(dis.updatedAt)}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Document download                                                */
/* ------------------------------------------------------------------ */
function DocumentSection() {
  const { data } = usePortalData();
  const types: DocType[] = ["PI", "Receipt", "Invoice", "E-Way", "LR"];
  const [filter, setFilter] = useState<DocType | "All">("All");
  const docs = filter === "All" ? data.documents : data.documents.filter((d) => d.type === filter);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Download PI, Receipt, Invoice, E-Way bill and LR.</CardDescription>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(["All", ...types] as const).map((t) => (
              <Button key={t} size="sm" variant={filter === t ? "default" : "outline"} onClick={() => setFilter(t)}>
                {t}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {docs.length === 0 ? (
          <EmptyRow message="No documents available. Approve a quote, record payments or dispatch goods to generate documents." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Related to</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell><StatusBadge status={doc.type} /></TableCell>
                  <TableCell className="font-mono text-xs">{doc.number}</TableCell>
                  <TableCell className="text-sm">{doc.relatedTo}</TableCell>
                  <TableCell className="text-right text-sm">{doc.amount != null ? inr(doc.amount) : "—"}</TableCell>
                  <TableCell className="text-sm">{shortDate(doc.date)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => downloadDocument(doc)}>
                      <Download className="h-3.5 w-3.5 mr-1" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Portal shell                                                        */
/* ------------------------------------------------------------------ */
const TABS = [
  { value: "vendor", label: "Vendor", icon: Building2, el: <VendorSection /> },
  { value: "enquiry", label: "Enquiry", icon: FileText, el: <EnquirySection /> },
  { value: "quotation", label: "Quotation", icon: CheckCircle2, el: <QuotationSection /> },
  { value: "po", label: "PO Upload", icon: Upload, el: <PoSection /> },
  { value: "payment", label: "Payments", icon: Wallet, el: <PaymentSection /> },
  { value: "dispatch", label: "Dispatch", icon: Truck, el: <DispatchSection /> },
  { value: "documents", label: "Documents", icon: Download, el: <DocumentSection /> },
];

const PortalPage = () => {
  const { reset, seed } = usePortalData();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-zinc-950 text-white">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="text-sm text-zinc-400">
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
                  <span className="mx-2">/</span>
                  <span className="text-white">Customer Portal</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Customer Portal</h1>
                <p className="text-sm md:text-base text-zinc-400">
                  Manage your end-to-end procurement — from vendor onboarding and enquiries to quotations,
                  purchase orders, payments, dispatch and documents. All in one place.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent text-white border-zinc-700 hover:bg-white/10"
                  onClick={() => { seed(); toast({ title: "Demo data loaded" }); }}>
                  <Sparkles className="h-3.5 w-3.5 mr-1" /> Load demo data
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent text-white border-zinc-700 hover:bg-white/10"
                  onClick={() => { reset(); toast({ title: "Portal cleared" }); }}>
                  <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10">
          <div className="max-w-7xl mx-auto px-4">
            <Tabs defaultValue="vendor">
              <TabsList className="flex flex-wrap h-auto justify-start gap-1 bg-muted/60 p-1">
                {TABS.map((t) => (
                  <TabsTrigger key={t.value} value={t.value} className="gap-1.5 data-[state=active]:bg-background">
                    <t.icon className="h-4 w-4" />
                    <span>{t.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {TABS.map((t) => (
                <TabsContent key={t.value} value={t.value} className="mt-6">
                  {t.el}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortalPage;
