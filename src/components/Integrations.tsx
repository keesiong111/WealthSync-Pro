import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music, Play, ExternalLink, MessageSquare, Twitter, Instagram, SkipBack, SkipForward, Music2, Share2, Youtube, Globe, Volume2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Integrations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Music Streaming - Main Bento */}
      <Card className="md:col-span-8 bg-[#141417] border-[#26262B] rounded-[2rem] shadow-xl overflow-hidden">
        <CardHeader className="border-b border-zinc-800 pb-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">Acoustic Synapse</CardTitle>
            <CardDescription className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Cognitive Audio Integration</CardDescription>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black italic">CONNECTED</Badge>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-48 h-48 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl shadow-2xl p-6 flex flex-col justify-end relative group cursor-pointer transition-transform hover:scale-105 active:scale-95">
               <Music className="absolute top-4 right-4 w-6 h-6 text-black/40" />
               <p className="text-[10px] font-black text-black/60 uppercase tracking-widest mb-1">Now Visualizing</p>
               <h3 className="text-xl font-black text-black italic leading-tight uppercase tracking-tighter">CHILL Lofi Beats</h3>
               <p className="text-[10px] font-bold text-black/40">SPOTIFY PREMIUM</p>
            </div>
            
            <div className="flex-grow space-y-6 w-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                   <div className="flex items-center gap-4">
                      <SkipBack className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                      <div className="w-12 h-12 bg-emerald-500 text-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <Play className="w-5 h-5 fill-current ml-1" />
                      </div>
                      <SkipForward className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                   </div>
                   <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-zinc-600" />
                      <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-emerald-500" />
                      </div>
                   </div>
                </div>
                
                <div className="space-y-2 px-2">
                   <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-zinc-500">
                      <span>1:42</span>
                      <span>3:50</span>
                   </div>
                   <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="w-[45%] h-full bg-gradient-to-r from-emerald-500 to-blue-500" />
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <button className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl border border-zinc-700 transition-all group">
                    <Music2 className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Switch Source</span>
                 </button>
                 <button className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl border border-zinc-700 transition-all group">
                    <Share2 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Broadcast</span>
                 </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Nodes */}
      <div className="md:col-span-4 grid grid-cols-2 gap-4">
        {[
          { name: 'X.COM', icon: Twitter, color: 'text-white', bg: 'bg-[#1D9BF0]/10', border: 'border-[#1D9BF0]/20' },
          { name: 'YOUTUBE', icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
          { name: 'BANKING', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
          { name: 'INSTA', icon: Instagram, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        ].map((node, i) => (
          <Card key={i} className={`bg-[#141417] ${node.border} rounded-[1.5rem] shadow-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-zinc-800 transition-all group active:scale-95`}>
            <div className={`p-4 rounded-2xl ${node.bg} group-hover:scale-110 transition-transform`}>
               <node.icon className={`w-6 h-6 ${node.color}`} />
            </div>
            <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">{node.name}</p>
          </Card>
        ))}
        
        <Card className="col-span-2 bg-gradient-to-br from-zinc-800/50 to-zinc-900 border border-zinc-800 rounded-[1.5rem] p-6 shadow-xl flex flex-col justify-center text-center">
            <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-4">Nexus Stack Expansion</h4>
            <div className="flex -space-x-3 justify-center mb-4">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-[#141417] bg-zinc-700 shadow-xl" />
               ))}
               <div className="w-8 h-8 rounded-full border-2 border-[#141417] bg-emerald-500 flex items-center justify-center text-[10px] font-black text-black">
                 +12
               </div>
            </div>
            <p className="text-[8px] text-zinc-600 font-bold uppercase">12 Apps Active in Nexus Stack</p>
        </Card>
      </div>
    </div>
  );
}
