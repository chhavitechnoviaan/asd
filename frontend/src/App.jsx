import { useState } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
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
import DemoLoginPage from "./pages/DemoLoginPage";

// Original dashboard implementations from the supplied asd-frontend 2 project.
import B2BDashboard from "./cargomateDashboard/pages/b2bDashboard/B2BDashboard.jsx";
import UserDashboard from "./cargomateDashboard/pages/userDashboard/UserDashboard.jsx";
import AdminDashboard from "./cargomateDashboard/pages/admin/AdminDashboard.jsx";
import "./cargomateDashboard/dashboard-global.css";

const builtPages = {
  Home: HomePage,
  About: AboutPage,
  Solution: SolutionsPage,
  "AI Module": AIModulesPage,
  Pricing: PricingPage,
  Resources: ResourcesPage,
  "Contact Us": ContactPage,
  "Refund Policy": RefundPolicyPage,
  "Privacy Policy": PrivacyPolicyPage,
  "Terms & Conditions": TermsConditionsPage,
  "Help Center": HelpCenterPage,
};

function AppContent() {
  const [activePage, setActivePage] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();
  const normalizedPath = location.pathname.replace(/\/+$/, "").toLowerCase() || "/";

  if (normalizedPath === "/login" || normalizedPath === "/admin-login" || normalizedPath === "/signup") return <DemoLoginPage />;
   if (normalizedPath === "/b2b-dashboard") return <B2BDashboard />;
  if (normalizedPath === "/user-dashboard") return <UserDashboard />;
  if (normalizedPath === "/admin-dashboard") return <AdminDashboard />;

  const handleNavigate = (page) => {
    setActivePage(page);
    if (location.pathname !== "/") navigate("/");
  };

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/login");

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

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
