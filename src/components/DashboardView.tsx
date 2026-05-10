import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FinancialData, HealthData } from '../types';
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface Props {
  financialData: FinancialData;
  healthData: HealthData;
}

export default function DashboardView({ financialData, healthData }: Props) {
  const totalExpenses = Object.values(financialData.expenses).reduce((a, b) => a + b, 0);
  const monthlySavings = financialData.monthlySalary - totalExpenses;
  const savingsRateActual = (monthlySavings / financialData.monthlySalary) * 100;
  
  const expenseData = Object.entries(financialData.expenses).map(([name, value]) => ({ name, value }));
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Financial Overview - Main Bento Card */}
      <Card className="md:col-span-8 bg-[#141417] border-[#26262B] rounded-[2rem] overflow-hidden shadow-2xl">
        <CardHeader className="border-b border-[#26262B] pb-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Monthly Asset Flow</p>
              <CardTitle className="text-4xl font-black text-white italic tracking-tighter">
                {financialData.currency === 'SGD' ? '$' : 'RM'}{financialData.monthlySalary.toLocaleString()}
              </CardTitle>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="p-4 bg-zinc-800/30 rounded-[1.5rem] border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Net Savings</p>
              <p className="text-xl font-mono text-emerald-400 font-bold">{financialData.currency === 'SGD' ? '$' : 'RM'}{monthlySavings.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-zinc-800/30 rounded-[1.5rem] border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Outflow</p>
              <p className="text-xl font-mono text-zinc-100 font-bold">{financialData.currency === 'SGD' ? '$' : 'RM'}{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-zinc-800/30 rounded-[1.5rem] border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Eff. Rate</p>
              <p className="text-xl font-mono text-emerald-400 font-bold">{savingsRateActual.toFixed(1)}%</p>
            </div>
            <div className="p-4 bg-zinc-800/30 rounded-[1.5rem] border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Health Purity</p>
              <p className="text-xl font-mono text-blue-400 font-bold">84%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            <div className="h-[250px] bg-zinc-800/20 p-4 rounded-3xl border border-zinc-800/50">
              <h3 className="text-[10px] font-black uppercase text-zinc-500 mb-4 flex items-center gap-2">
                 ALLOCATION MATRIX
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {expenseData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#141417', border: '1px solid #26262B', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center bg-zinc-800/20 p-6 rounded-3xl border border-zinc-800/50">
              <h3 className="text-[10px] font-black uppercase text-zinc-500 mb-6 tracking-widest">
                PORTFOLIO YIELDS
              </h3>
              <div className="space-y-6">
                {financialData.investments.map((inv, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs items-end">
                      <span className="font-bold text-zinc-100 uppercase tracking-tighter">{inv.name}</span>
                      <span className="text-emerald-400 font-mono text-[10px]">+{inv.growthRate}% RELATIVE</span>
                    </div>
                    <Progress value={inv.growthRate * 10} className="h-1 bg-zinc-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side Bento Cards */}
      <div className="md:col-span-4 flex flex-col gap-4">
        <Card className="bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden flex-grow">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black text-zinc-550 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3 h-3 text-emerald-500" /> Biometric Pulse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <div className="flex justify-between items-center bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800">
              <div>
                <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">Kinetic Steps</p>
                <p className="text-lg font-mono text-zinc-100 font-bold">{healthData.dailySteps.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                <Activity className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
            <div className="flex justify-between items-center bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800">
              <div>
                <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">Energy Burn</p>
                <p className="text-lg font-mono text-zinc-100 font-bold">{healthData.caloriesConsumed} <span className="text-[10px] opacity-50 uppercase">kcal</span></p>
              </div>
              <Zap className="w-4 h-4 text-orange-500" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-bold">
              <div className="bg-blue-500/10 text-blue-400 p-3 rounded-xl text-center border border-blue-500/20">
                HYDRATION {healthData.waterIntake}L
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl text-center border border-emerald-500/20">
                STATUS: {healthData.mood.toUpperCase()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-600 to-teal-800 text-black border-none rounded-[2rem] shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <CardHeader className="pb-0">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-70">Projected Milestone</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center py-4">
              <p className="text-4xl font-black mb-1 italic tracking-tighter">10.4 YR</p>
              <p className="text-[10px] font-bold uppercase opacity-80">To Total Independence (Age 40)</p>
            </div>
            <div className="bg-black/10 rounded-xl p-4 text-[10px] leading-relaxed font-medium mb-4 backdrop-blur-sm">
              "System analysis confirms you are 64% ahead of peer-median benchmarks for Singapore migrants."
            </div>
            <button className="w-full bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-all active:scale-95">
              INITIATE OPTIMIZATION
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
