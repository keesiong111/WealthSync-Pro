import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Wallet, Heart, Rocket, Music, LayoutDashboard, BrainCircuit } from 'lucide-react';
import DashboardView from './components/DashboardView';
import WealthPlanner from './components/WealthPlanner';
import LifeSimulator from './components/LifeSimulator';
import HealthHub from './components/HealthHub';
import Integrations from './components/Integrations';
import SmartAdvisor from './components/SmartAdvisor';
import { FinancialData, HealthData } from './types';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [financialData, setFinancialData] = useState<FinancialData>({
    monthlySalary: 5000,
    currency: 'SGD',
    savingsRate: 30,
    epfRate: 11,
    cpfRate: 20,
    investments: [
      { name: 'S&P 500 ETF', amount: 12000, growthRate: 8 },
      { name: 'Fixed Deposit', amount: 5000, growthRate: 3.2 }
    ],
    expenses: {
      Rent: 2000,
      Food: 800,
      Transport: 200,
      Leisure: 500
    }
  });

  const [healthData, setHealthData] = useState<HealthData>({
    weight: 70,
    height: 175,
    dailySteps: 8500,
    caloriesConsumed: 2100,
    waterIntake: 2.5,
    mood: 'Good'
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 font-sans p-4 md:p-6">
      <header className="mb-6 bg-[#141417] p-4 rounded-2xl border border-[#26262B] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight uppercase">WealthSync <span className="text-emerald-500">Pro</span></h1>
            <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Nexus-Grade Planning</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Projected Net Worth</p>
            <p className="text-sm font-mono text-emerald-400 font-bold">$1,248,390.42 <span className="text-[10px] opacity-70">SGD</span></p>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-zinc-800">
            <div className="text-right">
              <p className="text-xs font-bold">John Doe</p>
              <p className="text-[10px] text-emerald-500 font-medium">Standard Plan</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 border border-zinc-600 shadow-inner"></div>
          </div>
        </div>
      </header>

      <main className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141417]/50 p-2 rounded-2xl border border-[#26262B]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="bg-transparent border-none gap-1 p-0">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-xl px-4 py-2 text-xs font-bold transition-all">
                DASHBOARD
              </TabsTrigger>
              <TabsTrigger value="wealth" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-xl px-4 py-2 text-xs font-bold transition-all">
                WEALTH
              </TabsTrigger>
              <TabsTrigger value="life" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-xl px-4 py-2 text-xs font-bold transition-all">
                LIFE GOALS
              </TabsTrigger>
              <TabsTrigger value="health" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-xl px-4 py-2 text-xs font-bold transition-all">
                HEALTH
              </TabsTrigger>
              <TabsTrigger value="integrations" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-xl px-4 py-2 text-xs font-bold transition-all">
                CONNECT
              </TabsTrigger>
              <TabsTrigger value="advisor" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-xl px-4 py-2 text-xs font-bold transition-all flex gap-1 items-center">
                <BrainCircuit className="w-3 h-3" /> ADVISOR
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4 px-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Base Asset</span>
              <select 
                value={financialData.currency} 
                onChange={(e) => setFinancialData({...financialData, currency: e.target.value as 'SGD' | 'MYR'})}
                className="bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-bold p-1 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white outline-none"
              >
                <option value="SGD">SGD (S$)</option>
                <option value="MYR">MYR (RM)</option>
              </select>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {activeTab === 'dashboard' && <DashboardView financialData={financialData} healthData={healthData} />}
            {activeTab === 'wealth' && <WealthPlanner data={financialData} setData={setFinancialData} />}
            {activeTab === 'life' && <LifeSimulator financialData={financialData} />}
            {activeTab === 'health' && <HealthHub data={healthData} setData={setHealthData} />}
            {activeTab === 'integrations' && <Integrations />}
            {activeTab === 'advisor' && <SmartAdvisor financialData={financialData} healthData={healthData} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-12 flex items-center justify-between text-[10px] text-zinc-600 font-medium border-t border-zinc-900 pt-6 px-2">
        <div className="flex gap-8">
          <span className="flex items-center gap-2">SYSTEM STATUS: <span className="text-emerald-500 font-bold">OPERATIONAL</span></span>
          <span className="flex items-center gap-2 font-bold uppercase">Nexus-Sync: <span className="text-zinc-400">12 Active Latency: 24ms</span></span>
        </div>
        <div className="flex gap-6 uppercase tracking-widest font-bold">
          <span>Version 3.0.4 - 2026.05.10</span>
          <span className="text-zinc-400 cursor-pointer hover:text-emerald-500 transition-colors">Documentation</span>
        </div>
      </footer>
    </div>
  );
}
