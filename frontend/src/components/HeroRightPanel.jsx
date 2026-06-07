import { motion } from 'framer-motion';
import { Activity, Code2, Clock, MapPin, Monitor, Rocket, Sparkles, Zap } from 'lucide-react';
import { createElement } from 'react';

const MotionDiv = motion.div;

const SERVICES = [
  { icon: Rocket, label: 'MVP Dev' },
  { icon: Monitor, label: 'Full-Stack' },
  { icon: Activity, label: 'Deployment' },
  { icon: Sparkles, label: 'AI Workflow' },
];

export default function HeroRightPanel() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
      className="lg:col-span-5 lg:self-center"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 rounded-lg border border-white/[0.07] bg-gradient-to-br from-white/[0.055] to-white/[0.018] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#A30000]/22">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#A30000] to-[#4d0000]">
                <span className="text-xl font-semibold text-white">MB</span>
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-[#050506] bg-emerald-500">
                <span className="text-[9px] font-bold text-white">✓</span>
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-white">Mustafa Baver Çalış</h2>
              <p className="text-sm text-white/42">Full-Stack Developer</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.055] bg-white/[0.026] p-4 transition-colors duration-300 hover:border-[#A30000]/22">
          <Code2 className="mb-4 h-5 w-5 text-[#A30000]" />
          <span className="block text-3xl font-light text-white">2+</span>
          <span className="mt-1 block text-xs uppercase text-white/32">Yıl deneyim</span>
        </div>

        <div className="rounded-lg border border-white/[0.055] bg-white/[0.026] p-4 transition-colors duration-300 hover:border-[#A30000]/22">
          <Zap className="mb-4 h-5 w-5 text-[#ffd400]" />
          <span className="block text-3xl font-light text-white">10+</span>
          <span className="mt-1 block text-xs uppercase text-white/32">Proje</span>
        </div>

        <div className="col-span-2 rounded-lg border border-emerald-500/16 bg-gradient-to-r from-emerald-500/8 to-white/[0.012] p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
                <Clock className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <span className="block text-sm font-medium text-emerald-300">Çalışmaya açık</span>
                <span className="text-xs text-white/35">Freelance ve iş fırsatları</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/30 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="col-span-2 rounded-lg border border-white/[0.055] bg-[#090909]/70 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/22">
            Neler Yapıyorum 
          </p>
          <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4 sm:gap-y-0">
            {SERVICES.map(({ icon, label }, index) => (
              <div key={label} className="relative flex flex-col items-center justify-center gap-2 px-2">
                {index > 0 && (
                  <span className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-white/[0.075] sm:block" />
                )}
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A30000]/13 text-[#D00000]">
                  {createElement(icon, { className: 'h-4 w-4', strokeWidth: 1.8 })}
                </span>
                <span className="text-center text-xs font-medium text-white/52">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 rounded-lg border border-white/[0.045] bg-[#090909]/68 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-[#A30000]" />
              <span className="text-sm text-white/52">İstanbul, Türkiye</span>
            </div>
            <span className="text-xs text-white/32">GMT+3</span>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
