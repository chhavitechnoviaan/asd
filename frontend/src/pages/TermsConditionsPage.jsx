import { FileText, Users, Briefcase, ShieldCheck, FileWarning, FileEdit } from "lucide-react";
import PolicyPage from "../components/PolicyPage";

const items = [
  {
    icon: FileText,
    title: "Use of Website",
    desc: "By accessing our website, you agree to use it only for lawful purposes and in a way that does not infringe the rights of others.",
  },
  {
    icon: Users,
    title: "Services",
    desc: "We provide logistics and supply chain services based on the information shared by you. We reserve the right to modify or discontinue any service without prior notice.",
  },
  {
    icon: Briefcase,
    title: "User Responsibilities",
    desc: "You agree to provide accurate and complete information while using our services. You are responsible for maintaining the confidentiality of your account and data.",
  },
  {
    icon: ShieldCheck,
    title: "Intellectual Property",
    desc: "All content, logos, and materials on this website are the property of ASD CARGOMATE Pvt. Ltd. and may not be used without permission.",
  },
  {
    icon: FileWarning,
    title: "Limitation of Liability",
    desc: "We are not liable for any indirect, incidental, or consequential damages arising from the use of our website or services.",
  },
  {
    icon: FileEdit,
    title: "Changes to Terms",
    desc: "We may update these terms and conditions at any time. Continued use of the website means you accept the updated terms.",
  },
];

export default function TermsConditionsPage({ onNavigate }) {
  return (
    <PolicyPage
      title="Terms & Conditions"
      subtitle="Please read these terms and conditions carefully before using our website and services."
      items={items}
      lastUpdated="May 16, 2025"
      ctaQuestion="Have questions about our terms? We're here to help you."
      onClose={() => onNavigate("Home")}
    />
  );
}
