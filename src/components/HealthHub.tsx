import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HealthData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Apple, Utensils, Droplets, Dumbbell, Scale, Ruler, BrainCircuit } from 'lucide-react';

interface Props {
  data: HealthData;
  setData: (data: HealthData) => void;
}

export default function HealthHub({ data, setData }: Props) {
  const bmi = (data.weight / (data.height / 100) ** 2).toFixed(1);
  
  const getBMICategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
    if (val < 25) return { label: 'Normal', color: 'text-emerald-400', bg: 'bg-emerald-400/10' };
    if (val < 30) return { label: 'Overweight', color: 'text-orange-400', bg: 'bg-orange-400/10' };
    return { label: 'Obese', color: 'text-red-400', bg: 'bg-red-400/10' };
  };

  const bmiInfo = getBMICategory(parseFloat(bmi));

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Physical Stats - Main Bento Card */}
      <Card className="md:col-span-8 bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden">
        <CardHeader className="border-b border-zinc-800 pb-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">Bio-Architecture Monitor</CardTitle>
            <CardDescription className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Optimizing Longevity for Retirement @ 40</CardDescription>
          </div>
          <div className="flex gap-2">
             <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] font-black italic">SYNCED</Badge>
             <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black italic">OPTIMAL</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-zinc-800/30 rounded-3xl border border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                   <Scale className="w-3 h-3 text-emerald-500" /> Current Mass
                </p>
                <div className="flex items-end gap-2">
                  <Input 
                    type="number"
                    value={data.weight}
                    onChange={(e) => setData({ ...data, weight: parseFloat(e.target.value) || 0 })}
                    className="bg-transparent border-none p-0 h-8 text-3xl font-black italic tracking-tighter text-white focus-visible:ring-0 w-20"
                  />
                  <span className="text-[10px] font-bold text-zinc-500 pb-1">KG</span>
                </div>
              </div>
              <div className="p-6 bg-zinc-800/30 rounded-3xl border border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                   <Ruler className="w-3 h-3 text-blue-500" /> Zenith Alt.
                </p>
                <div className="flex items-end gap-2">
                  <Input 
                    type="number"
                    value={data.height}
                    onChange={(e) => setData({ ...data, height: parseFloat(e.target.value) || 0 })}
                    className="bg-transparent border-none p-0 h-8 text-3xl font-black italic tracking-tighter text-white focus-visible:ring-0 w-24"
                  />
                  <span className="text-[10px] font-bold text-zinc-500 pb-1">CM</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-800/30 rounded-[2.5rem] border border-zinc-800 text-center relative overflow-hidden">
               <div className={`absolute top-0 right-0 p-3 ${bmiInfo.bg} ${bmiInfo.color} text-[8px] font-black uppercase tracking-widest rounded-bl-xl`}>
                 {bmiInfo.label}
               </div>
               <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Composite BMI Node</p>
               <p className="text-6xl font-black italic tracking-tighter text-white mb-2">{bmi}</p>
               <div className="flex justify-center gap-1 mt-4">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className={`h-1 w-8 rounded-full ${i === 2 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
                 ))}
               </div>
            </div>
          </div>

          <div className="space-y-6 bg-black/20 p-6 rounded-3xl border border-zinc-800/50">
            <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
               <Utensils className="w-3 h-3 text-orange-500" /> Nutrient Inflow
            </h3>
            <div className="space-y-4">
               {[
                 { label: 'CALORIES', current: data.caloriesConsumed, target: 2500, color: 'bg-orange-500', field: 'caloriesConsumed' },
                 { label: 'HYDRATION', current: data.waterIntake, target: 3.5, color: 'bg-blue-500', field: 'waterIntake' },
               ].map((item, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black text-zinc-500 uppercase tracking-widest items-center">
                       <span>{item.label}</span>
                       <div className="flex items-center gap-1">
                        <Input 
                          type="number"
                          value={item.current}
                          onChange={(e) => setData({ ...data, [item.field]: parseFloat(e.target.value) || 0 })}
                          className="bg-transparent border-none p-0 h-4 w-10 text-right text-zinc-100 font-mono font-bold focus-visible:ring-0 text-[10px]"
                        />
                        <span className="text-zinc-500">/ {item.target}</span>
                       </div>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                       <div className={`h-full ${item.color} transition-all`} style={{ width: `${Math.min(100, (item.current / item.target) * 100)}%` }} />
                    </div>
                 </div>
               ))}
               <div className="p-4 bg-zinc-800/30 rounded-xl border border-zinc-800">
                  <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Daily Step Goal</p>
                  <Input 
                    type="number"
                    value={data.dailySteps}
                    onChange={(e) => setData({ ...data, dailySteps: parseFloat(e.target.value) || 0 })}
                    className="bg-transparent border-none p-0 h-6 text-xl font-black italic tracking-tighter text-emerald-500 focus-visible:ring-0"
                  />
               </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3 mt-8">
               <div className="p-4 bg-zinc-800/30 rounded-2xl flex items-center justify-between border border-zinc-800 group hover:border-emerald-500/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Apple className="w-4 h-4 text-red-500" />
                    <span className="text-[10px] font-black text-white italic tracking-tighter uppercase whitespace-nowrap">Nutrient Density</span>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-black">HIGH</Badge>
               </div>
               <div className="p-4 bg-zinc-800/30 rounded-2xl flex items-center justify-between border border-zinc-800 group hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-black text-white italic tracking-tighter uppercase whitespace-nowrap">Hydration Level</span>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[8px] font-black">OPTIMAL</Badge>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side Bento Cards */}
      <div className="md:col-span-4 space-y-4">
        <Card className="bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden p-6 h-full flex flex-col">
          <CardHeader className="pb-4 px-0">
            <CardTitle className="text-[10px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
               <Apple className="w-4 h-4 text-emerald-500" /> Regional Fuel Strategist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow px-0">
             <div className="space-y-3">
                {[
                  { time: 'BREAKFAST', meal: 'Oats & Scrambled Eggs', cal: 350 },
                  { time: 'LUNCH', meal: 'Chicken Rice (Less Oil)', cal: 550 },
                  { time: 'DINNER', meal: 'Grilled Salmon & Salad', cal: 450 },
                ].map((item, i) => (
                  <div key={i} className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800 hover:bg-zinc-800/60 transition-all group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">{item.time}</span>
                      <span className="text-[10px] font-black text-emerald-500 italic tracking-tighter">+{item.cal} KCAL</span>
                    </div>
                    <p className="text-xs font-black text-white italic tracking-tighter group-hover:text-emerald-400 transition-colors">{item.meal.toUpperCase()}</p>
                  </div>
                ))}
             </div>
             
             <div className="mt-6 bg-emerald-500 text-black p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
                <p className="text-[10px] font-black mb-2 flex items-center gap-2 uppercase italic tracking-widest">
                   <BrainCircuit className="w-3 h-3" /> SG OPTIMIZATION TIP
                </p>
                <p className="text-xs font-black leading-relaxed italic tracking-tight">"Switch to Kopi-C Kosong in Singapore to save ~120 calories daily compared to Kopi."</p>
             </div>
             
             <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white py-4 mt-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                SYNC WITH MYFITNESSPAL
             </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
