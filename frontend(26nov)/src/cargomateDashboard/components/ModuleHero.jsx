import React from "react";
import { BarChart3, ShieldCheck } from "lucide-react";

const subtitles = {
  "AI CargoMate Assistant":"Analyze shipments and turn trade data into actionable decisions.",
  "AI Chatbot":"Ask your intelligent trade assistant questions about logistics and global trade.",
  "HS Code Lookup":"Find product classifications and check duties, taxes and trade rules.",
  "Incentive Checker":"Explore export incentives and eligibility across trade schemes.",
  "Freight Calculator":"Compare freight estimates and plan cost-efficient routes.",
  "Shipment Planning":"Plan shipments with route, documentation and cost insights.",
  "Saved":"Your saved intelligence reports, ready to preview and download.",
  "HS Code Intelligence":"Explore detailed trade flows, HS classifications and product-level market trends.",
  "HS code Intelligence":"Explore global shipment classification data and HS code trends.",
  "Shipment Database":"Search and manage your shipment data with powerful filters.",
  "Risk Analysis":"Analyze trade risks, shipment exposure and compliance challenges.",
  "AI Insights":"Turn complex trade data into clear intelligence and recommendations.",
  "Ai Insight":"Turn complex trade data into clear intelligence and recommendations.",
  "Shipment Operations Hub":"Manage shipment operations, tracking and logistics workflows.",
  "Shipments":"Manage shipment operations, tracking and logistics workflows.",
  "Documents":"Organize shipment documents and monitor document requirements.",
  "Invoice Management":"Track quotations, invoices and trade payments.",
  "Invoices":"Track quotations, invoices and trade payments.",
  "Reports":"Review saved business reports and download branded PDFs.",
  "Shipment Intelligence":"Track international shipment performance and operational insights.",
  "Alert Notifications":"Stay informed about shipment updates and trade alerts.",
  "Notifications":"Stay up to date with the latest notices and account activity.",
  "Help & Support":"Get help with your account and track support requests.",
  "Settings":"Manage your preferences and business account settings.",
  "Subscription":"Review your subscription and available features.",
  "Dashboard":"Monitor the latest trade and shipment activity.",
};

const displayNames = { "Ai Insight":"AI Insights", "HS code Intelligence":"HS Code Intelligence", "Shipments":"Shipment Operations Hub", "Invoices":"Invoice Management", "Alert Notifications":"Notifications" };
export default function ModuleHero({title,role="user"}) {
  const displayName=displayNames[title] || title;
  return <section className="cm-module-hero mt-10" aria-label={`${title} overview`}>
    <div className="cm-module-hero-content">
      <div className="cm-module-eyebrow"><BarChart3 size={13} /> TRADE ANALYTICS <span className="cm-module-status-dot"/> {role==="b2b"?"Business Workspace":"User Workspace"}</div>
      <h1>{displayName}</h1>
      <p>{subtitles[title]||"Explore CargoMate tools, analytics and reports in one place."}</p>
    </div><div className="cm-module-watermark"><ShieldCheck size={134} strokeWidth={1}/></div>
  </section>;
}
