import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
 BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
 PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";


const C = {
 primary: "#86BC25",
 primaryDark: "#446607",
 primaryLight: "#f0f7e2",
 primaryMid: "#d4edaa",
 bg: "#f5f5f5",
 white: "#ffffff",
 black: "#000000",
 gray50: "#f5f5f5",
 gray100: "#BBBCBC",
 gray200: "#A7A8AA",
 gray400: "#97999B",
 gray600: "#75787B",
 gray800: "#63666A",
};


const customerCare = [
 { cat: "Blogging Websites", incidents: 60, unique: 37 },
 { cat: "Job Websites", incidents: 58, unique: 6 },
 { cat: "Apps/Apks", incidents: 4, unique: 1 },
 { cat: "Suspicious/Similar Domains", incidents: 1, unique: 1 },
];


const catShare = [
 { name: "Blogging Websites", value: 60, color: C.primary },
 { name: "Job Websites", value: 58, color: C.primaryDark },
 { name: "Apps/Apks", value: 4, color: C.primaryLight },
 { name: "Suspicious/Similar Domains", value: 1, color: C.primaryMid },
];


// const catTrend = [{ date: "2026-02-27", incidents: 798, unique: 461 }];
const catTrend = [
 { date: "Jan", incidents: 40, unique: 20 },
 { date: "Feb", incidents: 245, unique: 228 },
 { date: "Mar", incidents: 38, unique: 35 },
 { date: "Apr", incidents: 455, unique: 100 },
 { date: "May", incidents: 48, unique: 42 },
 { date: "Jun", incidents: 798, unique: 461 },
 { date: "Jul", incidents: 720, unique: 380 },
];


const webAppStatus = [
 { cat: "Blogging Websites", reported: 60, unique: 37, closed: 0 },
 { cat: "Job Websites", reported: 58, unique: 6, closed: 0 },
 { cat: "Apps/Apks", reported: 4, unique: 1, closed: 0 },
 { cat: "Suspicious/Similar Domains", reported: 1, unique: 1, closed: 0 },
];


const jobPromotions = [{ name: "Job Websites", value: 58 }];


const TOTAL_INCIDENTS = customerCare.reduce((s, d) => s + d.incidents, 0);
const TOTAL_UNIQUE = customerCare.reduce((s, d) => s + d.unique, 0);


// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const ChartTip = ({ active, payload }) => {
 if (!active || !payload?.length) return null;
 const d = payload[0]?.payload;
 if (!d) return null;
 return (
   <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8, padding: "8px 12px", fontSize: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
     <p style={{ fontWeight: 600, marginBottom: 4, color: C.black }}>{d.cat}</p>
     <p style={{ color: C.primaryDark, margin: "2px 0" }}>Incidents: <strong>{d.incidents}</strong></p>
     <p style={{ color: C.gray600, margin: "2px 0" }}>Unique: <strong>{d.unique}</strong></p>
   </div>
 );
};


// ─── Trend Tooltip ────────────────────────────────────────────────────────────
const TrendTip = ({ active, payload, label }) => {
 if (!active || !payload?.length) return null;
 return (
   <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8, padding: "8px 12px", fontSize: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
     <p style={{ fontWeight: 600, marginBottom: 4, color: C.black }}>{label}</p>
     {payload.map((p) => (
       <p key={p.dataKey} style={{ color: p.dataKey === "incidents" ? C.primaryDark : C.primary, margin: "2px 0" }}>
         {p.dataKey.charAt(0).toUpperCase() + p.dataKey.slice(1)}: <strong>{p.value}</strong>
       </p>
     ))}
   </div>
 );
};


// ─── Dumbbell Chart ───────────────────────────────────────────────────────────
function CustomerCareDumbbellChart() {
 const maxVal = Math.max(...customerCare.map((d) => d.incidents));


 const DumbbellShape = (props) => {
   const { x, y, width, height, incidents, unique } = props;
   if (!width || !height) return null;
   const leftpad = 18;
   const scale = width / incidents;
   const x1 = x + leftpad + unique * scale;
   const x2 = x + leftpad + width;
   const cy = y + height / 2;
   return (
     <g>
       <line x1={x1} y1={cy} x2={x2} y2={cy} stroke="rgba(68,102,7,0.35)" strokeWidth={2.5} />
       <circle cx={x1} cy={cy} r={6} fill={C.gray400} />
       <circle cx={x2} cy={cy} r={6} fill={C.primaryDark} />
       <text x={x1 - 10} y={cy} textAnchor="end" dominantBaseline="middle" fontSize={9} fontWeight={500} fill={C.gray600}>{unique}</text>
       <text x={x2 + 10} y={cy} textAnchor="start" dominantBaseline="middle" fontSize={9} fontWeight={500} fill={C.primaryDark}>{incidents}</text>
     </g>
   );
 };


 return (
   <div style={{ width: "100%" }}>
     <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.gray600, marginBottom: 6, justifyContent: "flex-end" }}>
       <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
         <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.gray400, display: "inline-block" }} />
         Unique
       </span>
       <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
         <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.primaryDark, display: "inline-block" }} />
         Incidents
       </span>
     </div>
     <p style={{ fontSize: 11, marginBottom: 12, color: C.gray600 }}>
       <span style={{ color: C.primaryDark, fontWeight: 700 }}>Total Incidents: {TOTAL_INCIDENTS}</span>
       <span style={{ margin: "0 6px" }}>|</span>
       <span style={{ color: C.gray600, fontWeight: 700 }}>Total Unique: {TOTAL_UNIQUE}</span>
     </p>
     <ResponsiveContainer width="100%" height={220}>
       <BarChart data={customerCare} layout="vertical" margin={{ top: 8, right: 40, bottom: 8, left: 0 }} barCategoryGap="35%">
         <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke={C.gray100} />
         <XAxis type="number" domain={[0, maxVal + 10]} tick={{ fontSize: 10, fill: C.gray400 }} tickLine={false} axisLine={false} tickCount={6} />
         <YAxis type="category" dataKey="cat" width={160} tick={{ fontSize: 11, fill: C.gray600 }} tickLine={false} axisLine={false} />
         <Tooltip
           cursor={false}
           content={({ active, payload }) => {
             if (!active || !payload?.length) return null;
             const d = payload[0]?.payload;
             if (!d) return null;
             return (
               <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
                 <p style={{ fontWeight: 600, marginBottom: 4 }}>{d.cat}</p>
                 <p style={{ color: C.primaryDark, margin: "2px 0" }}>Incidents: <strong>{d.incidents}</strong></p>
                 <p style={{ color: C.gray600, margin: "2px 0" }}>Unique: <strong>{d.unique}</strong></p>
               </div>
             );
           }}
         />
         <Bar
           dataKey="incidents"
           fill="transparent"
           isAnimationActive={false}
           shape={(props) => <DumbbellShape {...props} incidents={props.incidents} unique={props.unique} />}
         />
       </BarChart>
     </ResponsiveContainer>
   </div>
 );
}


// ─── Area Chart Component ─────────────────────────────────────────────────────
function CategoriesTrendChart({ height = 260 }) {
 return (
   <ResponsiveContainer width="100%" height={height}>
     <AreaChart data={catTrend} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
       <defs>
         <linearGradient id="gradIncidents" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stopColor={C.primaryDark} stopOpacity={0.5} />
           <stop offset="100%" stopColor={C.primaryDark} stopOpacity={0.05} />
         </linearGradient>
         <linearGradient id="gradUnique" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stopColor={C.primary} stopOpacity={0.55} />
           <stop offset="100%" stopColor={C.primary} stopOpacity={0.05} />
         </linearGradient>
       </defs>
       <CartesianGrid
         strokeDasharray="4 4"
         stroke={C.gray100}
         vertical={false}
       />
       <XAxis
         dataKey="date"
         tick={{ fontSize: 11, fill: C.gray400 }}
         axisLine={false}
         tickLine={false}
         tickMargin={8}
       />
       <YAxis
         tick={{ fontSize: 11, fill: C.gray400 }}
         axisLine={false}
         tickLine={false}
         width={36}
         tickCount={5}
       />
       <Tooltip content={<TrendTip />} />
       {/* Unique rendered FIRST so it appears behind Incidents */}
       <Area
         type="monotone"
         dataKey="unique"
         stroke={C.primary}
         strokeWidth={2}
         fill="url(#gradUnique)"
         dot={false}
         activeDot={{ r: 5, fill: C.primary, strokeWidth: 0 }}
         name="Unique"
       />
       <Area
         type="monotone"
         dataKey="incidents"
         stroke={C.primaryDark}
         strokeWidth={2}
         fill="url(#gradIncidents)"
         dot={false}
         activeDot={{ r: 5, fill: C.primaryDark, strokeWidth: 0 }}
         name="Incidents"
       />
     </AreaChart>
   </ResponsiveContainer>
 );
}


// ─── Export Helpers ───────────────────────────────────────────────────────────
function exportCSV(data, filename) {
 if (!data?.length) return;
 const headers = Object.keys(data[0]);
 const rows = data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(","));
 const csv = [headers.join(","), ...rows].join("\n");
 const blob = new Blob([csv], { type: "text/csv" });
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url; a.download = `${filename}.csv`; a.click();
 URL.revokeObjectURL(url);
}


function exportPNG(containerRef, filename) {
 const node = containerRef?.current;
 if (!node) return;
 const doExport = () => {
   window.htmlToImage
     .toPng(node, { backgroundColor: "#ffffff", pixelRatio: 2, skipFonts: false })
     .then((dataUrl) => {
       const a = document.createElement("a");
       a.href = dataUrl; a.download = `${filename}.png`; a.click();
     })
     .catch((err) => console.error("Export failed:", err));
 };
 if (window.htmlToImage) {
   doExport();
 } else {
   const existing = document.getElementById("htmltoimage-script");
   if (existing) { existing.addEventListener("load", doExport); return; }
   const script = document.createElement("script");
   script.id = "htmltoimage-script";
   script.src = "https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.js";
   script.onload = doExport;
   script.onerror = () => console.error("Failed to load html-to-image");
   document.head.appendChild(script);
 }
}


// ─── Expand Modal ─────────────────────────────────────────────────────────────
function ExpandModal({ title, onClose, children }) {
 useEffect(() => {
   function handler(e) { if (e.key === "Escape") onClose(); }
   document.addEventListener("keydown", handler);
   return () => document.removeEventListener("keydown", handler);
 }, [onClose]);


 return (
   <div
     className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
     onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
   >
     <div className="flex max-h-[90vh] w-full max-w-5xl flex-col border border-neutral-200 bg-white shadow-2xl">
       <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
         <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
         <button type="button" onClick={onClose} className="flex size-8 items-center justify-center text-neutral-500 hover:bg-neutral-100">
           <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
           </svg>
         </button>
       </div>
       <div className="flex-1 overflow-auto p-6">{children}</div>
     </div>
   </div>
 );
}


// ─── Chart Menu ───────────────────────────────────────────────────────────────
function ChartMenu({ title, csvData, chartRef, onExpand }) {
 const [open, setOpen] = useState(false);
 const ref = useRef(null);


 useEffect(() => {
   function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
   document.addEventListener("mousedown", handler);
   return () => document.removeEventListener("mousedown", handler);
 }, []);


 const menuItems = [
   {
     label: "Export to CSV",
     icon: (<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>),
     action: () => { exportCSV(csvData, title); setOpen(false); },
   },
   {
     label: "Export to PNG",
     icon: (<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>),
     action: () => { exportPNG(chartRef, title); setOpen(false); },
   },
   {
     label: "Expand",
     icon: (<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>),
     action: () => { onExpand(); setOpen(false); },
   },
 ];


 return (
   <div className="relative" ref={ref}>
     <button type="button" onClick={() => setOpen((o) => !o)} className="flex size-8 items-center justify-center border border-neutral-300 bg-white text-neutral-500 hover:border-neutral-400 hover:bg-neutral-50">
       <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
         <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
       </svg>
     </button>
     {open && (
       <div className="absolute right-0 top-full z-20 mt-1 w-44 border border-neutral-200 bg-white py-1 shadow-lg">
         {menuItems.map(({ label, icon, action }) => (
           <button key={label} type="button" onClick={action} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
             <span className="text-neutral-500">{icon}</span>
             {label}
           </button>
         ))}
       </div>
     )}
   </div>
 );
}


// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, badge, badgeBg = C.primary, badgeText = C.white, sub }) {
 return (
   <div style={{ marginBottom: 14 }}>
     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
       <span style={{ fontSize: 14, fontWeight: 700, color: C.black, fontFamily: "'DM Sans', sans-serif" }}>{title}</span>
       {badge && (
         <span style={{ background: badgeBg, color: badgeText, fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20 }}>{badge}</span>
       )}
     </div>
     {sub && <p style={{ fontSize: 11, color: C.gray400, marginTop: 2 }}>{sub}</p>}
   </div>
 );
}


function Card({ children, className = "", cardRef }) {
 return (
   <div ref={cardRef} className={`bg-white px-5 py-2.5 border border-neutral-200 ${className}`}>
     {children}
   </div>
 );
}


function StatusCard({ iconSrc, value, label, children }) {
 const hasIcon = Boolean(iconSrc);
 return (
   <div className="flex h-full min-h-0 flex-col items-center justify-center border border-neutral-200 bg-white p-4 text-center">
     {hasIcon ? <img src={iconSrc} alt="" className="size-6 shrink-0 object-contain" decoding="async" /> : null}
     <p className={`text-3xl font-bold leading-none tracking-tight text-black tabular-nums ${hasIcon ? "mt-3" : ""}`}>{value}</p>
     <p className="mt-1.5 text-xs font-medium leading-snug text-neutral-600">{label}</p>
     {children ? <div className="mt-auto w-full pt-2">{children}</div> : null}
   </div>
 );
}


const RADIAN = Math.PI / 180;
function DonutLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
 if (percent < 0.05) return null;
 const r = innerRadius + (outerRadius - innerRadius) * 0.5;
 const x = cx + r * Math.cos(-midAngle * RADIAN);
 const y = cy + r * Math.sin(-midAngle * RADIAN);
 return (
   <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
     {`${(percent * 100).toFixed(0)}%`}
   </text>
 );
}


// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WebSummary() {
 const [expanded, setExpanded] = useState(null);


 const webAppStatusRef = useRef(null);
 const jobPromotionsRef = useRef(null);
 const categoryShareRef = useRef(null);
 const categoryTrendRef = useRef(null);
 const customerCareRef = useRef(null);
 const offersRef = useRef(null);


 const csvMap = {
   webAppStatus: webAppStatus,
   jobPromotions: jobPromotions,
   categoryShare: catShare.map(({ name, value }) => ({ name, value })),
   categoryTrend: catTrend,
   customerCare: customerCare,
   offers: [],
 };


 const Legend2 = ({ items }) => (
   <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
     {items.map(({ c, l, op = 1 }) => (
       <span key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray600 }}>
         <span style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: op, display: "inline-block" }} />
         {l}
       </span>
     ))}
   </div>
 );


 return (
   <main className="min-h-0 flex-1 overflow-auto bg-neutral-100 p-4 lg:p-4">
     <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
       <div className="flex items-center gap-3">
         <span className="h-8 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
         <h2 className="text-xl font-semibold text-neutral-900">Web/App Summary</h2>
       </div>
     </div>


     {/* ── Status Cards ── */}
     <section className="mb-3 grid gap-3 grid-cols-5">
       <Link to="/web-incidents" className="block transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand/50">
         <StatusCard iconSrc={`${import.meta.env.BASE_URL}status-icons/Incidents.png`} value={123} label="Incidents Reported" />
       </Link>
       <StatusCard iconSrc={`${import.meta.env.BASE_URL}status-icons/underReview.png`} value={123} label="Under Brand Review" />
       <StatusCard iconSrc={`${import.meta.env.BASE_URL}status-icons/takedown.png`} value={0} label="Takedown Initiated" />
       <div className="col-span-2">
         <StatusCard value={0} label="Closed Incidents">
           <div className="grid grid-cols-3 gap-0.5 border-t border-neutral-200 pt-2 text-center">
             {[["0", "Taken down"], ["0", "No action"], ["0", "Recommended to legal"]].map(([v, l]) => (
               <div key={l} className="min-w-0 px-0.5">
                 <p className="text-lg font-semibold tabular-nums text-neutral-900">{v}</p>
                 <p className="mt-0.5 text-xs font-medium leading-tight text-neutral-500">{l}</p>
               </div>
             ))}
           </div>
         </StatusCard>
       </div>
     </section>


     {/* ── Row 1: Web/App Status + Job Promotions ── */}
     <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 14 }}>
       <Card cardRef={webAppStatusRef}>
         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
           <SectionHeader title="Web / App Status" />
           <ChartMenu title="Web App Status" csvData={csvMap.webAppStatus} chartRef={webAppStatusRef} onExpand={() => setExpanded("webAppStatus")} />
         </div>
         <ResponsiveContainer width="100%" height={260}>
           <BarChart data={webAppStatus} margin={{ top: 10, right: 5, bottom: 10, left: 0 }} barGap={10} barCategoryGap="30%">
             <CartesianGrid strokeDasharray="3 3" stroke={C.gray100} vertical={false} />
             <XAxis dataKey="cat" tick={{ fontSize: 11, fill: C.gray400 }} axisLine={false} tickLine={false} tickMargin={16} interval={0} height={60} />
             <YAxis tick={{ fontSize: 11, fill: C.gray400 }} axisLine={false} tickLine={false} width={25} />
             <Tooltip content={<ChartTip />} />
             <Bar dataKey="reported" fill={C.primaryDark} name="Reported Volume" barSize={26} />
             <Bar dataKey="unique" fill={C.primary} name="Unique" barSize={26} />
             <Bar dataKey="closed" fill={C.primaryLight} name="Closed" barSize={26} />
           </BarChart>
         </ResponsiveContainer>
         <Legend2 items={[{ c: C.primaryDark, l: "Reported Volume" }, { c: C.primary, l: "Unique" }, { c: C.primaryLight, l: "Closed" }]} />
       </Card>


       <Card cardRef={jobPromotionsRef} className="flex flex-col items-center">
         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 4 }}>
           <SectionHeader title="Job Promotions" />
           <ChartMenu title="Job Promotions" csvData={csvMap.jobPromotions} chartRef={jobPromotionsRef} onExpand={() => setExpanded("jobPromotions")} />
         </div>
         <div style={{ width: "100%", height: 220 }}>
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie data={[{ value: 58 }]} cx="50%" cy="50%" innerRadius={62} outerRadius={92} startAngle={90} endAngle={-270} dataKey="value">
                 <Cell fill={C.primaryDark} />
               </Pie>
               <text x="50%" y="46%" textAnchor="middle" dominantBaseline="central" fontSize={32} fontWeight={800} fill={C.black}>58</text>
               <text x="50%" y="58%" textAnchor="middle" dominantBaseline="central" fontSize={12} fill={C.gray400}>Total Count</text>
             </PieChart>
           </ResponsiveContainer>
         </div>
         <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 25, width: "100%", alignItems: "center" }}>
           <span style={{ display: "flex", alignItems: "center", gap: 3, color: C.gray600, fontSize: 12 }}>
             <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.primaryDark, display: "inline-block" }} />
             Job Websites: <strong style={{ color: C.black }}>58</strong>
           </span>
         </div>
       </Card>
     </div>


     {/* ── Row 2: Category Share + Categories Trend ── */}
     <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14, marginBottom: 14 }}>


       {/* Category Share */}
       <Card cardRef={categoryShareRef}>
         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
           <SectionHeader title="Category Share" />
           <ChartMenu title="Category Share" csvData={csvMap.categoryShare} chartRef={categoryShareRef} onExpand={() => setExpanded("categoryShare")} />
         </div>
         <div style={{ width: "100%", height: 260 }}>
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie data={catShare} cx="50%" cy="50%" innerRadius={58} outerRadius={88} dataKey="value" labelLine={false} label={DonutLabel}>
                 {catShare.map((e, i) => <Cell key={i} fill={e.color} />)}
               </Pie>
               <text x="50%" y="47%" textAnchor="middle" dominantBaseline="central" fontSize={22} fontWeight={800} fill={C.black}>123</text>
               <text x="50%" y="57%" textAnchor="middle" dominantBaseline="central" fontSize={11} fill={C.gray400}>Total Count</text>
             </PieChart>
           </ResponsiveContainer>
         </div>
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 8px", marginTop: 4 }}>
           {catShare.map((e) => (
             <span key={e.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.gray600 }}>
               <span style={{ width: 9, height: 9, borderRadius: "50%", background: e.color, flexShrink: 0 }} />
               {e.name}: <strong style={{ color: C.black }}>{e.value}</strong>
             </span>
           ))}
         </div>
       </Card>


       {/* Categories Trend — ✅ ONLY ONE card, using AreaChart */}
       <Card cardRef={categoryTrendRef}>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
           <span style={{ fontSize: 14, fontWeight: 700, color: C.black }}>Categories Trend</span>
           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
             <select style={{ fontSize: 11, border: `1px solid ${C.gray200}`, borderRadius: 6, padding: "3px 8px", color: C.gray600, background: C.white, cursor: "pointer" }}>
               <option>Daily</option>
               <option>Weekly</option>
               <option>Monthly</option>
             </select>
             <ChartMenu title="Categories Trend" csvData={csvMap.categoryTrend} chartRef={categoryTrendRef} onExpand={() => setExpanded("categoryTrend")} />
           </div>
         </div>
         <CategoriesTrendChart height={260} />
         <Legend2 items={[{ c: C.primaryDark, op: 0.9, l: "Incidents" }, { c: C.primary, l: "Unique" }]} />
       </Card>
     </div>


     {/* ── Row 3: Customer Care + Offers ── */}
     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
       <Card cardRef={customerCareRef}>
         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
           <SectionHeader title="Customer Care Number" />
           <ChartMenu title="Customer Care Number" csvData={csvMap.customerCare} chartRef={customerCareRef} onExpand={() => setExpanded("customerCare")} />
         </div>
         <CustomerCareDumbbellChart />
       </Card>


       <Card cardRef={offersRef} className="flex flex-col">
         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
           <SectionHeader title="Offers" />
           <ChartMenu title="Offers" csvData={csvMap.offers} chartRef={offersRef} onExpand={() => setExpanded("offers")} />
         </div>
         <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 180 }}>
           <p style={{ fontSize: 13, color: C.gray400, fontStyle: "italic" }}>No Data Found !</p>
         </div>
       </Card>
     </div>


     {/* ── Expand Modals ── */}
     {expanded === "webAppStatus" && (
       <ExpandModal title="Web / App Status" onClose={() => setExpanded(null)}>
         <ResponsiveContainer width="100%" height={380}>
           <BarChart data={webAppStatus} margin={{ top: 10, right: 20, bottom: 80, left: 0 }} barGap={10} barCategoryGap="30%">
             <CartesianGrid strokeDasharray="3 3" stroke={C.gray100} vertical={false} />
             <XAxis dataKey="cat" tick={{ fontSize: 12, fill: C.gray400 }} axisLine={false} tickLine={false} tickMargin={16} interval={0} height={90} />
             <YAxis tick={{ fontSize: 12, fill: C.gray400 }} axisLine={false} tickLine={false} width={30} />
             <Tooltip content={<ChartTip />} />
             <Bar dataKey="reported" fill={C.primaryDark} radius={[6, 6, 0, 0]} name="Reported Volume" barSize={32} />
             <Bar dataKey="unique" fill={C.primary} radius={[6, 6, 0, 0]} name="Unique" barSize={32} />
             <Bar dataKey="closed" fill={C.primaryLight} radius={[6, 6, 0, 0]} name="Closed" barSize={32} />
           </BarChart>
         </ResponsiveContainer>
         <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
           {[{ c: C.primaryDark, l: "Reported Volume" }, { c: C.primary, l: "Unique" }, { c: C.primaryLight, l: "Closed" }].map(({ c, l }) => (
             <span key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray600 }}>
               <span style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} /> {l}
             </span>
           ))}
         </div>
       </ExpandModal>
     )}


     {expanded === "jobPromotions" && (
       <ExpandModal title="Job Promotions" onClose={() => setExpanded(null)}>
         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 360 }}>
           <ResponsiveContainer width={360} height={320}>
             <PieChart>
               <Pie data={[{ value: 58 }]} cx="50%" cy="50%" innerRadius={90} outerRadius={140} startAngle={90} endAngle={-270} dataKey="value">
                 <Cell fill={C.primaryDark} />
               </Pie>
               <text x="50%" y="46%" textAnchor="middle" dominantBaseline="central" fontSize={44} fontWeight={800} fill={C.black}>58</text>
               <text x="50%" y="57%" textAnchor="middle" dominantBaseline="central" fontSize={14} fill={C.gray400}>Total Count</text>
             </PieChart>
           </ResponsiveContainer>
         </div>
         <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 8 }}>
           <span style={{ display: "flex", alignItems: "center", gap: 6, color: C.gray600, fontSize: 13 }}>
             <span style={{ width: 12, height: 12, borderRadius: "50%", background: C.primaryDark, display: "inline-block" }} />
             Job Websites: <strong style={{ color: C.black }}>58</strong>
           </span>
         </div>
       </ExpandModal>
     )}


     {expanded === "categoryShare" && (
       <ExpandModal title="Category Share" onClose={() => setExpanded(null)}>
         <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 48, paddingTop: 24, paddingBottom: 24 }}>
           <ResponsiveContainer width={300} height={300}>
             <PieChart>
               <Pie data={catShare} cx="50%" cy="50%" innerRadius={80} outerRadius={130} dataKey="value" labelLine={false} label={DonutLabel}>
                 {catShare.map((e, i) => <Cell key={i} fill={e.color} />)}
               </Pie>
               <text x="50%" y="47%" textAnchor="middle" dominantBaseline="central" fontSize={32} fontWeight={800} fill={C.black}>123</text>
               <text x="50%" y="57%" textAnchor="middle" dominantBaseline="central" fontSize={13} fill={C.gray400}>Total Count</text>
             </PieChart>
           </ResponsiveContainer>
           <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
             {catShare.map((e) => (
               <li key={e.name} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.gray600 }}>
                 <span style={{ width: 12, height: 12, borderRadius: "50%", background: e.color, flexShrink: 0 }} />
                 <span>{e.name}: <strong style={{ color: C.black }}>{e.value}</strong></span>
               </li>
             ))}
           </ul>
         </div>
       </ExpandModal>
     )}


     {expanded === "categoryTrend" && (
       <ExpandModal title="Categories Trend" onClose={() => setExpanded(null)}>
         <CategoriesTrendChart height={400} />
         <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 12 }}>
           {[{ c: C.primaryDark, l: "Incidents" }, { c: C.primary, l: "Unique" }].map(({ c, l }) => (
             <span key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.gray600 }}>
               <span style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} /> {l}
             </span>
           ))}
         </div>
       </ExpandModal>
     )}


     {expanded === "customerCare" && (
       <ExpandModal title="Customer Care Number" onClose={() => setExpanded(null)}>
         <p style={{ fontSize: 13, marginBottom: 16, color: C.black }}>
           <span style={{ color: C.primary, fontWeight: 700 }}>Total Incidents Count : {TOTAL_INCIDENTS}</span>
           <span style={{ color: C.primary, fontWeight: 700, marginLeft: 10 }}>, Total Unique Count : {TOTAL_UNIQUE}</span>
         </p>
         <CustomerCareDumbbellChart />
       </ExpandModal>
     )}


     {expanded === "offers" && (
       <ExpandModal title="Offers" onClose={() => setExpanded(null)}>
         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
           <p style={{ fontSize: 15, color: C.gray400, fontStyle: "italic" }}>No Data Found !</p>
         </div>
       </ExpandModal>
     )}
   </main>
 );
}

