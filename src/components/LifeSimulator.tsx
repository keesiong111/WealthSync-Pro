import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FinancialData } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MapPin, Plane, Timer, Milestone, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Props {
  financialData: FinancialData;
}

export default function LifeSimulator({ financialData }: Props) {
  const [currentAge, setCurrentAge] = useState(30);
  const [targetAge, setTargetAge] = useState(40);
  const [targetAmount, setTargetAmount] = useState(1200000);

  const totalInvestmentsOrig = financialData.investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalExpenses = Object.values(financialData.expenses).reduce((a, b) => a + b, 0);
  const monthlySavings = financialData.monthlySalary - totalExpenses;
  const annualSavings = monthlySavings * 12;
  const avgYield = financialData.investments.length > 0 
    ? financialData.investments.reduce((sum, inv) => sum + inv.growthRate, 0) / financialData.investments.length 
    : 7;

  // Generate real projection data
  const projectionData = [];
  let currentWealth = totalInvestmentsOrig;
  const yieldDecimal = avgYield / 100;

  for (let age = currentAge; age <= currentAge + 20; age++) {
    projectionData.push({
      age,
      wealth: Math.round(currentWealth),
      label: age === targetAge ? 'Target Exit' : null
    });
    currentWealth = (currentWealth + annualSavings) * (1 + yieldDecimal);
  }

  const exitWealth = projectionData.find(d => d.age === targetAge)?.wealth || 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Current Age', value: currentAge, icon: Timer, color: 'text-emerald-500', bg: 'bg-emerald-500/10', onChange: (v: number) => setCurrentAge(v) },
          { label: 'Target Exit', value: targetAge, icon: Milestone, color: 'text-blue-500', bg: 'bg-blue-500/10', onChange: (v: number) => setTargetAge(v) },
          { label: 'Exit Goal', value: targetAmount, icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-500/10', isCurrency: true, onChange: (v: number) => setTargetAmount(v) },
          { label: 'Current Base', value: totalInvestmentsOrig, icon: Milestone, color: 'text-orange-500', bg: 'bg-orange-500/10', isCurrency: true },
        ].map((item, i) => (
          <Card key={i} className="bg-[#141417] border-[#26262B] rounded-2xl p-4 shadow-xl">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-grow">
                  <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">{item.label}</p>
                  {item.onChange ? (
                    <Input 
                      type="number" 
                      value={item.value} 
                      onChange={(e) => item.onChange?.(parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none p-0 h-6 text-lg font-black tracking-tighter text-white focus-visible:ring-0"
                    />
                  ) : (
                    <p className="text-lg font-black tracking-tighter text-white">
                      {item.isCurrency ? `${financialData.currency === 'SGD' ? '$' : 'RM'}${item.value.toLocaleString()}` : item.value}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Wealth Chart - Main Bento Card */}
        <Card className="lg:col-span-8 bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden">
          <CardHeader className="flex items-center justify-between border-b border-zinc-800 pb-6">
            <div>
              <CardTitle className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">Asset Velocity Forecast</CardTitle>
              <CardDescription className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Growth projection at {avgYield.toFixed(1)}% Compounded Yield</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-zinc-500 font-black uppercase mb-1">Exit Net Worth</p>
              <p className={`text-xl font-black italic ${exitWealth >= targetAmount ? 'text-emerald-500' : 'text-red-500'}`}>
                {financialData.currency === 'SGD' ? '$' : 'RM'}{exitWealth.toLocaleString()}
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData}>
                  <defs>
                    <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#26262B" />
                  <XAxis 
                    dataKey="age" 
                    axisLine={false} 
                    tickLine={false} 
                    fontSize={10} 
                    tick={{ fill: '#71717A', fontWeight: 'bold' }}
                    tickFormatter={(val) => `AGE ${val}`}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    fontSize={10} 
                    tick={{ fill: '#71717A', fontWeight: 'bold' }}
                    tickFormatter={(val) => `$${val/1000}K`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141417', borderRadius: '16px', border: '1px solid #26262B', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                    formatter={(value: number) => [`S$ ${value.toLocaleString()}`, 'NET WORTH']}
                  />
                  <Area type="monotone" dataKey="wealth" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorWealth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap & Health Indicators */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden p-6">
            <h3 className="text-[10px] font-black uppercase text-zinc-500 mb-6 flex items-center gap-2 tracking-widest">
               TRANSITION PROTOCOL
            </h3>
            <div className="space-y-6">
              {[
                { title: 'Visa Protocol', desc: 'Secure EP or S-Pass. Min S$5k/mo baseline.', status: 'DONE', active: false },
                { title: 'Asset Bridge', desc: 'Convert MYR holdings to SGD optimization.', status: 'SYNCING', active: true },
                { title: 'Housing Node', desc: 'Central vs Hub proximity strategy.', status: 'PENDING', active: false },
                { title: 'Health Grid', desc: 'Integrated Shield Plan deployment.', status: 'PENDING', active: false },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${step.active ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : step.status === 'DONE' ? 'bg-zinc-800 text-emerald-400 border-zinc-700' : 'bg-transparent text-zinc-500 border-zinc-800'}`}>
                      {i + 1}
                    </div>
                    {i < 3 && <div className="w-[1px] h-full bg-zinc-800 my-1" />}
                  </div>
                  <div className="pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                       <h4 className="text-[10px] font-black uppercase italic tracking-tighter text-white">{step.title}</h4>
                       <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${step.status === 'DONE' ? 'bg-emerald-500/10 text-emerald-500' : step.status === 'SYNCING' ? 'bg-blue-500/10 text-blue-500 animate-pulse' : 'bg-zinc-800 text-zinc-500'}`}>
                         {step.status}
                       </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-bold leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-black text-white border-zinc-800 rounded-[2rem] shadow-xl p-6 relative overflow-hidden">
             <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
             <p className="text-[10px] font-black uppercase text-zinc-500 mb-4 tracking-widest flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Live Index: SG
             </p>
             <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mb-1">Operational Cost</p>
                  <p className="text-2xl font-black italic tracking-tighter">S$ 4.2K<span className="text-[10px] opacity-30">/MO</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mb-1">Quality Coeff.</p>
                  <p className="text-2xl font-black italic tracking-tighter text-emerald-400">9.2</p>
                </div>
             </div>
             <div className="mt-6">
               <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                  <span>Resource Distribution</span>
                  <span className="text-zinc-100">Optimized</span>
               </div>
               <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-zinc-900 border border-zinc-800">
                  <div className="h-full bg-emerald-500 w-[50%] transition-all" />
                  <div className="h-full bg-blue-500 w-[20%] transition-all" />
                  <div className="h-full bg-purple-500 w-[15%] transition-all" />
                  <div className="h-full bg-zinc-700 w-[15%] transition-all" />
               </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
