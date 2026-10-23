import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SolutionsPage from "./pages/SolutionsPage";
import AIModulesPage from "./pages/AIModulesPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import PricingPage from "./pages/PricingPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import TradeToolsDashboard from "./pages/TradeToolsDashboard";

const builtPages = {
  Home: HomePage,
  About: AboutPage,
  Solution: SolutionsPage,
  "AI Module": AIModulesPage,
  Pricing : PricingPage,
  Resources : ResourcesPage,
  "Contact Us" : ContactPage,
  "Refund Policy": RefundPolicyPage,
  "Privacy Policy": PrivacyPolicyPage,
  "Terms & Conditions": TermsConditionsPage,
  "Help Center" : HelpCenterPage
};

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const syncPath = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  const normalizedPath = pathname.replace(/\/+$/, "").toLowerCase() || "/";
  if (normalizedPath === "/user-dashboard" || normalizedPath === "/b2b-dashboard") {
    return <TradeToolsDashboard mode={normalizedPath === "/b2b-dashboard" ? "b2b" : "user"} />;
  }

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  const handleLoginClick = () => {
    window.location.href =
      "https://asd-project-frontend-beryl.vercel.app/admin-login";
  };

  const handleSignupClick = () => {
    window.location.href =
      "https://asd-project-frontend-beryl.vercel.app/signup";
  };

  const PageComponent = builtPages[activePage];

  return (
    <div>
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />

      {PageComponent ? (
        <PageComponent onNavigate={handleNavigate} />
      ) : (
        <ComingSoonPage title={activePage} />
      )}
    </div>
  );
}