import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AIAssistantCard } from "@/components/dashboard/AIAssistantCard";
import { TotalSaleCard } from "@/components/dashboard/TotalSaleCard";
import { AgeDonutCard } from "@/components/dashboard/AgeDonutCard";
import { CreditRateCard } from "@/components/dashboard/CreditRateCard";
import { RevenueTrendCard } from "@/components/dashboard/RevenueTrendCard";

const Index = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">
        <Header />
        <div className="grid grid-cols-12 gap-5 stagger">
          <div className="col-span-12 lg:col-span-5">
            <AIAssistantCard />
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
            <TotalSaleCard />
            <RevenueTrendCard />
          </div>
          <div className="col-span-12 lg:col-span-2 flex flex-col gap-5">
            <AgeDonutCard />
            <CreditRateCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
