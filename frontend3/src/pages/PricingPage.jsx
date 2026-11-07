import { useState } from "react";
import { usePublicPlans } from "../components/PricingPlanss";
import PricingHero from "../components/PricingHero";
import PricingPlans from "../components/PricingPlanss";
import CompareFeaturesTable from "../components/CompareFeaturesTable";
import PricingFAQSection from "../components/PricingFAQSection";
//import CustomSolutionBanner from "../components/CustomSolutionBanner";
import GetStartedModal from "../components/GetStartedModal";
import Footer from "../components/Footer";

export default function PricingPage({ onNavigate }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billing,setBilling]=useState("monthly");
  const pricingState=usePublicPlans();

  return (
    <div>
      <PricingHero />
      <PricingPlans onGetStarted={setSelectedPlan} pricingState={pricingState} billing={billing} onBillingChange={setBilling} />
      <CompareFeaturesTable plans={pricingState.plans} billing={billing} />
      <PricingFAQSection />
      
      <Footer onNavigate={onNavigate} />

      {selectedPlan && (
        <GetStartedModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
