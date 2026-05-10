import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Send, Sparkles, RefreshCcw, Quote, Activity, Heart, Zap, Rocket } from 'lucide-react';
import { getFinancialAdvice } from '../services/geminiService';
import { FinancialData, HealthData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';

interface Props {
  financialData: FinancialData;
  healthData: HealthData;
}

export default function SmartAdvisor({ financialData, healthData }: Props) {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const generateAdvice = async () => {
    setLoading(true);
    const result = await getFinancialAdvice({ ...financialData, health: healthData });
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Central Advisor Node - Main Bento */}
      <Card className="md:col-span-8 bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden min-h-[600px] flex flex-col">
        <CardHeader className="border-b border-zinc-800 pb-6 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <BrainCircuit className="w-6 h-6" />
             </div>
             <div>
              <CardTitle className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">Neural Prosperity Advisor</CardTitle>
              <CardDescription className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Optimizing Pathway to S$2.0M @ Age 40</CardDescription>
            </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black italic uppercase">NODE ACTIVE</Badge>
        </CardHeader>
        <CardContent className="pt-8 flex-grow flex flex-col">
          <div className="flex gap-2 mb-8 bg-black/40 p-1 rounded-2xl border border-zinc-800">
            <Input 
              className="bg-transparent border-none text-white placeholder:text-zinc-600 focus-visible:ring-0 h-12 text-sm font-bold pl-4"
              placeholder="QUERY THE NEXUS: 'Optimze relocation strategy'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
               disabled={loading}
               onClick={generateAdvice}
               className="bg-emerald-500 hover:bg-emerald-400 text-black h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
            >
              {loading ? <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full" /> : <><Send className="w-4 h-4" /> COMPUTE</>}
            </button>
          </div>

          <div className="flex-grow bg-zinc-900/30 rounded-[2rem] border border-zinc-800/50 p-6 overflow-y-auto relative custom-scrollbar">
            <AnimatePresence mode="wait">
              {advice ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-invert prose-sm max-w-none font-medium leading-relaxed text-zinc-300"
                >
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-zinc-800 opacity-20" />
                  <Markdown>{advice}</Markdown>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center opacity-30"
                >
                   <Sparkles className="w-12 h-12 mb-4 text-emerald-500" />
                   <p className="uppercase tracking-[0.3em] text-[10px] font-black max-w-[200px]">Waiting for tactical query input node</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Side Status Indicators */}
      <div className="md:col-span-4 space-y-4">
        <Card className="bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden p-6">
          <p className="text-[10px] font-black uppercase text-zinc-500 mb-6 tracking-widest flex items-center gap-2">
             <Rocket className="w-4 h-4 text-emerald-500" /> System Metrics
          </p>
          <div className="space-y-6">
             <div className="p-4 bg-zinc-800/30 border border-zinc-800 rounded-2xl">
                <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Financial Stability Index</p>
                <div className="flex justify-between items-end">
                   <p className="text-2xl font-black italic tracking-tighter text-white">A+</p>
                   <p className="text-[10px] font-bold text-emerald-500 font-mono">+12.4% Trend</p>
                </div>
                <div className="mt-3 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[85%]" />
                </div>
             </div>
             
             <div className="p-4 bg-zinc-800/30 border border-zinc-800 rounded-2xl">
                <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Bio-Nexus Integrity</p>
                <div className="flex justify-between items-end">
                   <p className="text-2xl font-black italic tracking-tighter text-white">94<span className="text-[10px] opacity-30">/100</span></p>
                   <p className="text-[10px] font-bold text-blue-500 font-mono">Tier 1 Elite</p>
                </div>
                <div className="mt-3 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[94%]" />
                </div>
             </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-teal-800 text-black border-none rounded-[2rem] shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden group">
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <CardContent className="p-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Singapore Migration</h4>
            <div className="bg-black/10 rounded-2xl p-4 text-[10px] leading-relaxed font-bold mb-4 backdrop-blur-sm">
              "Asset bridge synchronization recommended before December window for maximum tax efficiency."
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all">
                DOWNLOAD BLUEPRINT
            </button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
           {['Capital Risk', 'Health Node'].map((item, i) => (
             <div key={i} className="bg-[#141417] border border-[#26262B] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-zinc-800 transition-all">
                {i === 0 ? <Zap className="w-5 h-5 text-orange-500" /> : <Activity className="w-5 h-5 text-blue-500" />}
                <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest text-center">{item}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
