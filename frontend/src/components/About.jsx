import { motion } from 'framer-motion';
import { Globe, Database, Briefcase, Sparkles } from 'lucide-react';

export default function Experience() {
  // Eğitim ve Deneyim Listesi 
  const timelineData = [
    {
      year: "2023 - Devam Ediyor",
      title: "Bilgisayar Mühendisliği",
      description: "İstanbul Arel Üniversitesi Bilgisayar Mühendisliği bölümünde eğitimime devam ediyorum. Yazılım dünyasının farklı disiplinlerine dair kapsamlı bir temel altyapı kazanıyorum.",
    },
    {
      year: "2024",
      title: "Frontend Geliştirme",
      description: "Kullanıcıların doğrudan etkileşime girdiği, hızlı ve modern arayüzler geliştiriyorum. Tasarımları, hem bilgisayarlarda hem de mobil cihazlarda kusursuz (Responsive) çalışacak şekilde performanslı kodlara dönüştürüyorum.",
    },
    {
      year: "2025",
      title: "Full-Stack Geliştirme",
      description: "Backend ve veritabanı sistemlerindeki temel yetkinliğimi, frontend becerilerimle birleştirerek projeleri uçtan uca (full-stack) inşa etmeye başladım. Yazılımların hem kullanıcıya görünen yüzünü hem de arka plandaki veri yönetimini kapsayan bütüncül çözümler üretiyorum.", 
    }
  ];

  return (
    <section id="experience" className="mb-32 pt-20 border-t border-white/10">
      <div className="mb-16">
        <h2 className="text-sm uppercase tracking-[0.2em] text-[#820000] font-bold mb-2">Hakkımda</h2>
        <p className="text-3xl pt-3 font-serif italic text-white">Eğitim & Deneyim</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Sol Taraf: Eğitim & Deneyim Maddeleri */}
        <div className="relative border-l-2 border-white/10 ml-3 md:ml-4 space-y-12">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/*Kırmızı noktaları biraz aşağı aldık, tam eşit durmuyordu*/}
              <div className="absolute -left-[9px] top-2 w-4 h-4 bg-neutral-950 border-2 border-[#820000] rounded-full" />      
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <span className="text-[#820000] font-mono text-sm">{item.year}</span>
              </div>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Sağ Taraf: Profil Kartı */}
        <div className="relative md:aspect-square rounded-3xl overflow-hidden glass p-8 md:p-12 flex flex-col justify-center h-fit hover:scale-[1.01] hover:shadow-2xl hover:shadow-gray-800/50 transition-all duration-500 cursor-default">
          
           <div className="absolute inset-0 bg-black/40 pointer-events-none" />
           
           <div className="space-y-6 relative z-10 pb-36">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-800/50 flex items-center justify-center text-red-900 font-bold">B</div>
                <div>
                  <p className="font-bold text-white">Mustafa Baver Çalış</p>
                  <p className="text-sm text-neutral-500">Software Developer</p>
                </div>
              </div>
              
              {/* Yetenek / Bilgi Etiketleri */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 text-xs font-medium rounded-full border bg-white/5 text-neutral-300 border-white/10 flex items-center gap-2 cursor-default">
                  <img src="https://flagcdn.com/w20/gb.png" alt="UK" className="w-4 rounded-[2px] opacity-80" />
                  İngilizce (C1)
                </span>
                <span className="px-3 py-1.5 text-xs font-medium rounded-full border bg-white/5 text-neutral-300 border-white/10 flex items-center gap-2 cursor-default">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="Frontend" className="w-4 h-4 " />
                  Frontend Development
                </span>
                <span className="px-3 py-1.5 text-xs font-medium rounded-full border bg-white/5 text-neutral-300 border-white/10 flex items-center gap-2 cursor-default">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-4 h-4" />
                  Python
                </span>
                <span className="px-3 py-1.5 text-xs font-medium rounded-full border bg-white/5 text-neutral-300 border-white/10 flex items-center gap-2 cursor-default">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" className="w-4 h-4" />
                  Java
                </span>
                <span className="px-3 py-1.5 text-xs font-medium rounded-full border bg-white/5 text-neutral-300 border-white/10 flex items-center gap-2 cursor-default">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="SQL" className="w-4 h-4" />
                  SQL
                </span>
              </div>

              <p className="text-neutral-400 italic mt-6">
                "Web geliştirmeye Frontend ile başladım. Ancak zamanla backend ve veritabanı dünyasını keşfettikçe, veriyi yönetmenin ve arka plan sistemlerini kurmanın da en az arayüz tasarımı kadar keyifli olduğunu fark ettim. Şimdi bu üç alanı birleştirerek projelerimi uçtan uca (Full Stack) inşa ediyorum. Gelişim sürecimde, temel bilgilerimin yetersiz kaldığı noktalarda yapay zekayı bir asistan gibi kullanıyor ve onunla birlikte 'yaparak öğrenme' metodunu uyguluyorum. Hedefim; teknolojinin hızına ve çağa her zaman ayak uydurabilen, öğrenmeye açık bir mühendis olmak."
              </p>
           </div>

           {/* Alt kısım / İlgilendiğim Alanlar + Konum ve müsaitlik */}
           <div className="absolute bottom-[30px] left-8 right-8 md:left-12 md:right-12 z-10 flex flex-col gap-[10px]">
             {/* İlgilendiğim Alanlar */}
             <div>
               <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-3 font-medium">İlgilendiğim Alanlar</p>
               <div className="flex flex-wrap gap-2">
                 <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-dashed border-neutral-600 text-neutral-400 cursor-default hover:text-red-400 hover:border-red-400 hover:bg-[#820000]/30 transition-all">
                   <Globe className="w-3.5 h-3.5" />
                   Web
                 </span>
                 <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-dashed border-neutral-600 text-neutral-400 cursor-default hover:text-red-400 hover:border-red-400 hover:bg-[#820000]/30 transition-all">
                   <Database className="w-3.5 h-3.5" />
                   Veri Mühendisliği
                 </span>
                 <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-dashed border-neutral-600 text-neutral-400 cursor-default hover:text-red-400 hover:border-red-400 hover:bg-[#820000]/30 transition-all">
                   <Briefcase className="w-3.5 h-3.5" />
                   İş Çözümleri
                 </span>
                 <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-dashed border-neutral-600 text-neutral-400 cursor-default hover:text-red-400 hover:border-red-400 hover:bg-[#820000]/30 transition-all">
                   <Sparkles className="w-3.5 h-3.5" />
                   Yapay Zeka
                 </span>
               </div>
             </div>

             {/* Konum ve müsaitlik */}
             <div className="flex items-center gap-2 pt-4 border-t border-white/10">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#820000] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                 <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.314 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742z" clipRule="evenodd"/>
               </svg>
               <span className="text-xs text-neutral-400 font-mono tracking-wide">İstanbul, Turkey</span>
               <span className="ml-auto flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs text-emerald-500 font-mono">Müsait</span>
               </span>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}