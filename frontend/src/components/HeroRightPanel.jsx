import { motion } from 'framer-motion';

export default function HeroRightPanel() {
  const stats = [
    { num: "2+", label: "Yıl Deneyim" },
    { num: "8+", label: "Proje" },
    { num: "Yazılım", label: "Geliştirme" },
    { num: "İstanbul", label: "TR" }
  ];
 
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col justify-center h-full md:pl-12 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 mt-8 md:mt-0"
    >
      {/* Çalışmaya açık badge i */}
      <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-900/50 rounded-full px-3 py-1.5 w-fit mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-emerald-400 font-medium tracking-wide">
          Çalışmaya açık
        </span>
      </div>
 
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ num, label }) => (
          <div
            key={label}
            className="aspect-square bg-neutral-900/60 border border-white/5 rounded-full flex flex-col justify-center items-center text-center p-4 hover:border-white/10 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20"          >
            <p className="text-2xl font-black text-white tracking-tight leading-none mb-1">
              {num.replace(/[+×-]$/, "")}
              <span className="text-rose-800">
                {num.match(/[+×-]$/)?.[0] ?? ""}
              </span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-2">
              {label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}