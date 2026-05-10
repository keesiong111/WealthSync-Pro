import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FinancialData } from '../types';
import { MY_BANKS, SG_BANKS } from '../constants';
import { PiggyBank, Briefcase, Landmark, Percent } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: FinancialData;
  setData: (data: FinancialData) => void;
}

export default function WealthPlanner({ data, setData }: Props) {
  const calculateEPF = () => (data.monthlySalary * data.epfRate) / 100;
  const calculateCPF = () => (data.monthlySalary * data.cpfRate) / 100;

  const handleExpenseChange = (cat: string, val: string) => {
    const num = parseFloat(val) || 0;
    setData({
      ...data,
      expenses: { ...data.expenses, [cat]: num }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Calculators & Settings */}
      <div className="lg:col-span-8 space-y-4">
        <Card className="bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#26262B] pb-6">
            <div>
              <CardTitle className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">Allocation Engine</CardTitle>
              <CardDescription className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Optimizing {data.currency} Inflow</CardDescription>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black italic">
              LIVE CONFIG
            </Badge>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            <div className="space-y-2">
              <Label htmlFor="salary" className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Monthly Gross Revenue</Label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-emerald-500 font-bold text-sm">
                  {data.currency === 'SGD' ? '$' : 'RM'}
                </span>
                <Input 
                  id="salary" 
                  value={data.monthlySalary} 
                  onChange={(e) => setData({...data, monthlySalary: parseFloat(e.target.value) || 0})}
                  className="pl-12 bg-zinc-800 border-zinc-700 h-12 rounded-xl text-zinc-100 font-mono text-lg font-bold focus:ring-emerald-500 transition-all" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="savings" className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Target Efficiency (%)</Label>
              <Input 
                id="savings" 
                type="number" 
                value={data.savingsRate}
                onChange={(e) => setData({...data, savingsRate: parseFloat(e.target.value) || 0})}
                className="bg-zinc-800 border-zinc-700 h-12 rounded-xl text-zinc-100 font-mono text-lg font-bold focus:ring-emerald-500 transition-all"
              />
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-6 bg-zinc-800/30 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex items-center gap-2 mb-2 font-black text-[10px] uppercase tracking-widest text-zinc-500">
                  <Briefcase className="w-3 h-3 text-emerald-500" />
                  Statutory Deductions ({data.currency === 'MYR' ? 'EPF' : 'CPF'})
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-center p-3 bg-black/20 rounded-xl">
                    <p className="text-[8px] text-zinc-500 uppercase font-black">Employee %</p>
                    <p className="text-xl font-mono text-white font-bold">{data.currency === 'MYR' ? data.epfRate : data.cpfRate}%</p>
                  </div>
                  <div className="space-y-2 text-center p-3 bg-black/20 rounded-xl">
                    <p className="text-[8px] text-zinc-500 uppercase font-black">Monthly Flow</p>
                    <p className="text-xl font-mono text-emerald-400 font-bold">
                      {data.currency === 'SGD' ? '$' : 'RM'}
                      {(data.currency === 'MYR' ? calculateEPF() : calculateCPF()).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-zinc-800/30 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex items-center gap-2 mb-2 font-black text-[10px] uppercase tracking-widest text-zinc-500">
                  <PiggyBank className="w-3 h-3 text-blue-500" /> Operational Outflow
                </div>
                <div className="grid grid-cols-2 gap-2 h-[80px] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(data.expenses).map(([cat, val]) => (
                    <div key={cat} className="flex justify-between items-center p-2 bg-black/20 rounded-lg">
                      <p className="text-[10px] uppercase text-zinc-400 font-bold">{cat}</p>
                      <p className="text-[10px] font-mono text-zinc-100 font-bold">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Market & Bank Interest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden p-6">
            <h3 className="text-[10px] font-black uppercase text-zinc-500 mb-6 flex items-center gap-2 tracking-widest">
              <Landmark className="w-4 h-4 text-emerald-500" /> Banking Index (SG)
            </h3>
            <div className="space-y-2">
              {SG_BANKS.map((bank, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-zinc-800/20 hover:bg-zinc-800/50 rounded-2xl transition-all border border-transparent hover:border-zinc-700 group">
                  <div>
                    <p className="text-xs font-black text-white italic">{bank.bank.toUpperCase()}</p>
                    <p className="text-[8px] text-zinc-500 font-bold uppercase">Fixed Deposit Promo</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-400 font-mono tracking-tighter">{bank.fixedDepositRate}%</p>
                    <p className="text-[8px] text-zinc-600 italic">Updated v3.1</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden p-6">
            <h3 className="text-[10px] font-black uppercase text-zinc-500 mb-6 flex items-center gap-2 tracking-widest">
              <Percent className="w-4 h-4 text-emerald-500" /> Yield Index (MY)
            </h3>
            <div className="space-y-2">
              {MY_BANKS.map((bank, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-zinc-800/20 hover:bg-zinc-800/50 rounded-2xl transition-all border border-transparent hover:border-zinc-700 group">
                  <div>
                    <p className="text-xs font-black text-white italic">{bank.bank.toUpperCase()}</p>
                    <p className="text-[8px] text-zinc-500 font-bold uppercase">Savings Base</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-400 font-mono tracking-tighter">{bank.fixedDepositRate}%</p>
                    <p className="text-[8px] text-zinc-600 italic">Promo Sync</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Analytics & Stocks */}
      <div className="lg:col-span-4 space-y-4">
        <Card className="bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden h-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Risk Assets Radar</CardTitle>
            <CardDescription className="text-xs font-bold text-zinc-100">Live Global Indices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-emerald-500 text-black rounded-[1.5rem] shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Composite Equity Value</span>
                <Badge className="bg-black/10 text-black border border-black/10 text-[10px] font-bold">+4.22%</Badge>
              </div>
              <p className="text-3xl font-black italic tracking-tighter">S$ 152,400.00</p>
            </div>

            <div className="space-y-2">
              {[
                { ticker: 'AAPL', name: 'Apple Inc.', val: '189.43', delta: '+1.2%', color: 'text-emerald-400' },
                { ticker: 'MSFT', name: 'Microsoft', val: '420.55', delta: '-0.4%', color: 'text-red-400' },
                { ticker: 'TSLA', name: 'Tesla Corp', val: '178.20', delta: '+2.1%', color: 'text-emerald-400' },
                { ticker: 'NVDA', name: 'Nvidia GPU', val: '890.30', delta: '+5.4%', color: 'text-emerald-400' },
              ].map((stock, i) => (
                <div key={i} className="p-4 bg-zinc-800/30 rounded-2xl flex justify-between items-center border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-xs font-black text-white group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      {stock.ticker[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black italic">{stock.ticker}</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black font-mono tracking-tighter">${stock.val}</p>
                    <p className={`text-[10px] font-black ${stock.color}`}>{stock.delta}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-zinc-800">
               <h3 className="text-[10px] font-black italic uppercase tracking-widest text-zinc-500 mb-6">Velocity Trajectory</h3>
               <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { year: '24', val: 50 },
                    { year: '25', val: 80 },
                    { year: '26', val: 120 },
                    { year: '27', val: 180 },
                  ]}>
                    <Bar dataKey="val" fill="#10B981" radius={[8, 8, 0, 0]} />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} fontSize={10} tick={{ fill: '#71717A', fontWeight: 'bold' }} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#141417', borderRadius: '12px', border: '1px solid #26262B', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} />
                  </BarChart>
                </ResponsiveContainer>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
