import { motion } from 'framer-motion';
import { GraduationCap, Code2, Briefcase, Sparkles, Globe, Database } from 'lucide-react';

const MotionArticle = motion.article;
const MotionAside = motion.aside;

export default function Experience() {
  const timelineData = [
    {
      year: '2022 - Devam Ediyor',
      title: 'Bilgisayar Mühendisliği',
      subtitle: 'İstanbul Arel Üniversitesi',
      description:
        'İstanbul Arel Üniversitesi Bilgisayar Mühendisliği bölümünde eğitimime devam ediyorum. Yazılım dünyasının farklı disiplinlerine dair kapsamlı bir temel altyapı kazanıyorum.',
      icon: GraduationCap,
      accent: 'text-red-300',
      glow: 'bg-red-500/10',
      tags: ['Algoritma', 'Veri Yapıları', 'Mühendislik'],
    },
    {
      year: '2023',
      title: 'Frontend Geliştirme',
      subtitle: 'Modern arayüz geliştirme',
      description:
        'Kullanıcıların doğrudan etkileşime girdiği, hızlı ve modern arayüzler geliştiriyorum. Tasarımları responsive ve performanslı kodlara dönüştürüyorum.',
      icon: Code2,
      accent: 'text-blue-300',
      glow: 'bg-blue-500/10',
      tags: ['Bootstrap', 'JavaScript', 'React', 'Tailwind', ],
    },
    {
      year: '2025',
      title: 'Full-Stack Geliştirme',
      subtitle: 'Uçtan uca ürün geliştirme',
      description:
        'Backend ve veritabanı sistemlerindeki temel yetkinliğimi frontend becerilerimle birleştirerek projeleri uçtan uca inşa ediyorum.',
      icon: Briefcase,
      accent: 'text-purple-300',
      glow: 'bg-purple-500/10',
      tags: ['FastAPI', 'Spring Boot', 'PostgreSQL', 'Supabase'],
    },
  ];

  const profileChips = [
    {
      label: 'İngilizce (C1)',
      icon: 'https://flagcdn.com/w20/gb.png',
      alt: 'UK',
      iconClassName: 'w-4 rounded-[2px] opacity-80',
    },
    {
      label: 'Frontend Development',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      alt: 'Frontend',
      iconClassName: 'w-4 h-4',
    },
    {
      label: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
      alt: 'Python',
      iconClassName: 'w-4 h-4',
    },
    {
      label: 'Java',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
      alt: 'Java',
      iconClassName: 'w-4 h-4',
    },
    {
      label: 'SQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
      alt: 'SQL',
      iconClassName: 'w-4 h-4',
    },
  ];

  const interestAreas = [
    { label: 'Web', icon: Globe },
    { label: 'Veri Mühendisliği', icon: Database },
    { label: 'Yapay Zeka', icon: Sparkles },
  ];

  return (
    <section id="experience" className="relative mb-32 pt-20 border-t border-white/[0.06]">
      <div className="mb-14">
        <h2 className="text-sm uppercase tracking-[0.2em] text-[#A30000] font-bold mb-3">Hakkımda</h2>
        <p className="text-3xl md:text-4xl font-serif italic text-white/90">Eğitim & Deneyim</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="relative lg:col-span-7">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/[0.08] via-white/[0.07] to-transparent" />

          <div className="space-y-5">
            {timelineData.map((item, index) => {
              const Icon = item.icon;

              return (
                <MotionArticle
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-90px' }}
                  transition={{ duration: 0.5, delay: index * 0.16, ease: 'easeOut' }}
                  className="group relative pl-10"
                >
                  <div className="pointer-events-none absolute left-4 top-1/2 h-20 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#6f0000]/0 to-transparent transition-all duration-300 group-hover:via-[#6f0000]/35 group-hover:shadow-[0_0_14px_rgba(95,0,0,0.26)]" />
                  <div className="absolute left-[9px] top-1/2 z-10 h-3 w-3 -translate-y-1/2">
                    <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5f0000]/0 blur-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-[#5f0000]/34" />
                    <span className="relative block h-3 w-3 rounded-full border border-white/[0.16] bg-[#090707] transition-all duration-300 ease-out group-hover:border-[#A30000]/60 group-hover:bg-[#3f0000]" />
                  </div>

                  <div className="rounded-lg border border-white/[0.065] bg-gradient-to-br from-white/[0.04] to-white/[0.015] p-5 md:p-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/[0.11] group-hover:bg-white/[0.046] group-hover:shadow-[0_14px_36px_rgba(0,0,0,0.16)]">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.glow}`}>
                          <Icon className={`h-5 w-5 ${item.accent}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                          <p className="mt-1 text-sm text-white/38">{item.subtitle}</p>
                        </div>
                      </div>

                      <span className="w-fit rounded-full border border-[#A30000]/20 bg-[#A30000]/10 px-3 py-1 text-xs font-medium text-red-300">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-sm md:text-base leading-relaxed text-white/50">
                      {item.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.055] bg-white/[0.035] px-2.5 py-1 text-xs text-white/38"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </MotionArticle>
              );
            })}
          </div>
        </div>

        <MotionAside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="relative overflow-hidden rounded-lg border border-white/[0.07] bg-gradient-to-br from-white/[0.045] to-white/[0.018] p-6 md:p-7 backdrop-blur-md transition-all duration-300 hover:border-[#A30000]/20">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-red-950/10" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#A30000]/35 to-[#4d0000]/25 text-xl font-semibold text-white">
                  MB
                </div>
                <div>
                  <p className="font-semibold text-white">Mustafa Baver Çalış</p>
                  <p className="text-sm text-white/42">Full-Stack Developer</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {profileChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-white/62"
                  >
                    <img src={chip.icon} alt={chip.alt} className={chip.iconClassName} />
                    {chip.label}
                  </span>
                ))}
              </div>

              <p className="rounded-lg border border-white/[0.055] bg-white/[0.025] p-4 text-sm italic leading-relaxed text-white/52">
                "Web geliştirmeye frontend ile başladım. Zamanla backend ve veritabanı tarafını da keşfettikçe,
                bir fikri arayüzü, verisi ve iş mantığıyla birlikte çalışan bir ürüne dönüştürmenin beni daha çok
                motive ettiğini fark ettim. Araştırarak, deneyerek ve yapay zeka araçlarını asistan gibi kullanarak
                öğrenmeye devam ediyorum."
              </p>

              <div className="border-t border-white/[0.06] pt-5">
                <p className="mb-3 text-[11px] uppercase tracking-wider text-white/35">İlgilendiğim Alanlar</p>
                <div className="flex flex-wrap gap-2">
                  {interestAreas.map((area) => {
                    const Icon = area.icon;

                    return (
                      <span
                        key={area.label}
                        className="flex items-center gap-1.5 rounded-lg border border-dashed border-white/[0.12] bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/46 transition-all duration-300 hover:border-[#A30000]/45 hover:bg-[#A30000]/10 hover:text-red-200"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {area.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-white/[0.06] pt-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0 text-[#A30000]" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.314 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-mono tracking-wide text-white/42">İstanbul, Turkey</span>
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400">Müsait</span>
                </span>
              </div>
            </div>
          </div>
        </MotionAside>
      </div>
    </section>
  );
}
