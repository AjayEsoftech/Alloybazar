import { useCallback, useEffect, useState } from "react";

/**
 * Lightweight localStorage-backed data layer for the Customer Portal demo.
 * Everything the client sees (vendors, enquiries, quotations, POs, payments,
 * dispatches, documents) lives under a single namespaced key so the whole
 * portal can be cleared or seeded in one shot.
 */

const STORAGE_KEY = "alloybazaar.portal.v1";
const EVENT = "alloybazaar:portal-change";

export type ID = string;

export type Vendor = {
  id: ID;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  gstin: string;
  pan: string;
  category: string;
  address: string;
  kycFileName: string;
  customerCode: string; // generated on approval (e.g. AB-CUST-0007)
  creditLimit: number;
  paymentTerms: string;
  status: "Pending" | "Approved";
  createdAt: string;
};

export type Enquiry = {
  id: ID;
  ref: string;
  product: string;
  grade: string;
  quantity: string;
  unit: string;
  notes: string;
  status: "Submitted" | "Quoted" | "Closed";
  createdAt: string;
};

/** Costing breakdown shown on a quotation (BRD: Quotation Generation). */
export type QuoteBreakdown = {
  material: number;
  cutting: number;
  loading: number;
  freight: number;
  insurance: number;
  margin: number;
  gst: number;
};

export type Quotation = {
  id: ID;
  ref: string;
  enquiryRef: string;
  product: string;
  grade: string;
  quantity: string;
  unitPrice: number;
  total: number;
  breakdown?: QuoteBreakdown;
  leadTime?: string;
  validTill: string;
  status: "Awaiting Approval" | "Approved" | "Rejected";
  createdAt: string;
};

export type PurchaseOrder = {
  id: ID;
  poNumber: string;
  quotationRef: string;
  fileName: string;
  fileType: string;
  fileData: string; // base64 data URL
  amount: number;
  status: "Uploaded" | "Acknowledged";
  createdAt: string;
};

export type SalesOrder = {
  id: ID;
  ref: string;
  poNumber: string;
  quotationRef: string;
  product: string;
  amount: number;
  status: "Awaiting Approval" | "Approved" | "Rejected";
  createdAt: string;
};

export type Payment = {
  id: ID;
  ref: string;
  poNumber: string;
  amount: number;
  paid: number;
  method: "Bank Transfer" | "Cheque" | "UPI" | "LC";
  status: "Pending" | "Partial" | "Paid";
  date: string;
};

export type DispatchStage = "Order Confirmed" | "In Production" | "Ready to Ship" | "In Transit" | "Delivered";

export type Dispatch = {
  id: ID;
  ref: string;
  poNumber: string;
  product: string;
  carrier: string;
  trackingNo: string;
  stage: DispatchStage;
  eta: string;
  updatedAt: string;
};

export type DocType = "PI" | "Receipt" | "Invoice" | "E-Way" | "LR";

export type PortalDocument = {
  id: ID;
  type: DocType;
  number: string;
  relatedTo: string;
  party: string;
  amount?: number;
  date: string;
};

export type PortalData = {
  vendors: Vendor[];
  enquiries: Enquiry[];
  quotations: Quotation[];
  purchaseOrders: PurchaseOrder[];
  salesOrders: SalesOrder[];
  payments: Payment[];
  dispatches: Dispatch[];
  documents: PortalDocument[];
};

const emptyData: PortalData = {
  vendors: [],
  enquiries: [],
  quotations: [],
  purchaseOrders: [],
  salesOrders: [],
  payments: [],
  dispatches: [],
  documents: [],
};

export const uid = (prefix = "id"): ID =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;

function read(): PortalData {
  if (typeof window === "undefined") return emptyData;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyData;
    return { ...emptyData, ...(JSON.parse(raw) as PortalData) };
  } catch {
    return emptyData;
  }
}

function write(data: PortalData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Read-only snapshot for one-off reads (e.g. building reference numbers). */
export const getPortalData = read;

/**
 * React hook that subscribes to the portal store. Returns the current data and
 * an `update` helper that mutates a draft and persists + broadcasts the change.
 */
export function usePortalData() {
  const [data, setData] = useState<PortalData>(read);

  useEffect(() => {
    const sync = () => setData(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((mutator: (draft: PortalData) => void) => {
    const next = read();
    mutator(next);
    write(next);
    setData(next);
  }, []);

  const reset = useCallback(() => {
    write({ ...emptyData });
    setData(read());
  }, []);

  const seed = useCallback(() => {
    write(buildSeed());
    setData(read());
  }, []);

  return { data, update, reset, seed };
}

/** Sequential, human-readable reference numbers (AB-ENQ-0007 etc.). */
export function nextRef(prefix: string, count: number): string {
  return `AB-${prefix}-${String(count + 1).padStart(4, "0")}`;
}

/**
 * The full customer status flow from the BRD. The portal derives the current
 * stage from the data the customer has generated, rather than storing it.
 */
export const CUSTOMER_STATUS_FLOW = [
  "Registered",
  "Approved",
  "Enquiry Received",
  "Quotation Sent",
  "Quotation Approved",
  "PO Received",
  "PI Generated",
  "Payment Received",
  "SO Approved",
  "Production/Processing",
  "Dispatch Ready",
  "Dispatched",
  "Delivered",
  "Closed",
] as const;

export type CustomerStatus = (typeof CUSTOMER_STATUS_FLOW)[number];

/** Derive how far along the BRD journey the customer currently is. */
export function computeCustomerStatus(data: PortalData): { index: number; stage: CustomerStatus | "Not started" } {
  let idx = -1;
  const bump = (i: number, when: boolean) => {
    if (when && i > idx) idx = i;
  };
  bump(0, data.vendors.length > 0);
  bump(1, data.vendors.some((v) => v.status === "Approved"));
  bump(2, data.enquiries.length > 0);
  bump(3, data.quotations.length > 0);
  bump(4, data.quotations.some((q) => q.status === "Approved"));
  bump(5, data.purchaseOrders.length > 0);
  bump(6, data.documents.some((d) => d.type === "PI"));
  bump(7, data.payments.some((p) => p.status === "Paid"));
  bump(8, data.salesOrders.some((s) => s.status === "Approved"));
  const atStage = (s: DispatchStage) => data.dispatches.some((d) => d.stage === s);
  bump(9, atStage("In Production"));
  bump(10, atStage("Ready to Ship"));
  bump(11, atStage("In Transit"));
  bump(12, atStage("Delivered"));
  const allDelivered = data.dispatches.length > 0 && data.dispatches.every((d) => d.stage === "Delivered");
  const allPaid = data.payments.length > 0 && data.payments.every((p) => p.status === "Paid");
  bump(13, allDelivered && allPaid);
  return { index: idx, stage: idx >= 0 ? CUSTOMER_STATUS_FLOW[idx] : "Not started" };
}

const today = () => new Date().toISOString();
const daysFromNow = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

/**
 * Demo data so a client opening a fresh browser sees a populated portal that is
 * mid-journey: an approved customer with a quotation awaiting their approval.
 * From here the presenter can drive the rest of the BRD flow live — approve the
 * quote, upload a PO, pay, approve the SO and track dispatch to delivery.
 */
export function buildSeed(): PortalData {
  return {
    vendors: [
      {
        id: uid("ven"),
        company: "Meridian Steel Traders",
        contactName: "Rajesh Kumar",
        email: "rajesh@meridiansteel.in",
        phone: "+91 98200 11223",
        gstin: "27ABCDE1234F1Z5",
        pan: "ABCDE1234F",
        category: "Alloy Steel Bars",
        address: "Plot 14, MIDC Industrial Area, Pune, MH 411019",
        kycFileName: "meridian-kyc-gst-pan.pdf",
        customerCode: "AB-CUST-0001",
        creditLimit: 5000000,
        paymentTerms: "30 days credit",
        status: "Approved",
        createdAt: daysFromNow(-22),
      },
    ],
    enquiries: [
      {
        id: uid("enq"),
        ref: "AB-ENQ-0001",
        product: "EN8 Round Bar",
        grade: "EN8 / 080M40",
        quantity: "12",
        unit: "MT",
        notes: "Diameter 60mm, bright finish preferred.",
        status: "Quoted",
        createdAt: daysFromNow(-9),
      },
    ],
    quotations: [
      {
        id: uid("quo"),
        ref: "AB-QTN-0001",
        enquiryRef: "AB-ENQ-0001",
        product: "EN8 Round Bar",
        grade: "EN8 / 080M40",
        quantity: "12 MT",
        unitPrice: 82500,
        total: 990000,
        breakdown: {
          material: 720000,
          cutting: 42000,
          loading: 12000,
          freight: 36000,
          insurance: 9000,
          margin: 60000,
          gst: 111000,
        },
        leadTime: "10–12 working days",
        validTill: daysFromNow(7),
        status: "Awaiting Approval",
        createdAt: daysFromNow(-6),
      },
    ],
    purchaseOrders: [],
    salesOrders: [],
    payments: [],
    dispatches: [],
    documents: [],
  };
}

/** Build a printable HTML document and trigger a browser download. */
export function downloadDocument(doc: PortalDocument) {
  const titleMap: Record<DocType, string> = {
    PI: "Proforma Invoice",
    Receipt: "Payment Receipt",
    Invoice: "Tax Invoice",
    "E-Way": "E-Way Bill",
    LR: "Lorry Receipt (LR)",
  };
  const formattedDate = new Date(doc.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const amountRow =
    doc.amount != null
      ? `<tr><td>Amount</td><td style="text-align:right">₹ ${doc.amount.toLocaleString("en-IN")}</td></tr>`
      : "";

  const html = `<!doctype html><html><head><meta charset="utf-8"/>
<title>${titleMap[doc.type]} ${doc.number}</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;color:#18181b;margin:0;padding:40px;background:#fff}
  .wrap{max-width:720px;margin:0 auto;border:1px solid #e4e4e7;border-radius:10px;overflow:hidden}
  .head{background:#18181b;color:#fff;padding:24px 28px;display:flex;justify-content:space-between;align-items:center}
  .brand{font-weight:800;letter-spacing:.18em;text-transform:uppercase;font-size:14px}
  .badge{background:#f5b301;color:#18181b;padding:4px 12px;border-radius:999px;font-weight:700;font-size:12px}
  .body{padding:28px}
  h1{font-size:20px;margin:0 0 4px}
  .muted{color:#71717a;font-size:13px}
  table{width:100%;border-collapse:collapse;margin-top:20px;font-size:14px}
  td{padding:10px 0;border-bottom:1px solid #f4f4f5}
  td:first-child{color:#71717a}
  .total{font-weight:800;font-size:16px}
  .foot{padding:18px 28px;background:#fafafa;color:#71717a;font-size:12px;border-top:1px solid #e4e4e7}
</style></head><body>
<div class="wrap">
  <div class="head"><span class="brand">Alloybazaar</span><span class="badge">${doc.type}</span></div>
  <div class="body">
    <h1>${titleMap[doc.type]}</h1>
    <div class="muted">Document No. ${doc.number}</div>
    <table>
      <tr><td>Party</td><td style="text-align:right">${doc.party}</td></tr>
      <tr><td>Reference</td><td style="text-align:right">${doc.relatedTo}</td></tr>
      <tr><td>Issue Date</td><td style="text-align:right">${formattedDate}</td></tr>
      ${amountRow}
    </table>
  </div>
  <div class="foot">This is a system-generated document from the Alloybazaar Customer Portal demo.</div>
</div>
</body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${doc.type}-${doc.number}.html`.replace(/\s+/g, "_");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
