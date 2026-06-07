import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Hammer } from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiUrl } from '../config/api';

const MotionDiv = motion.div;

function ProjectStateCard({ title, description }) {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-6 py-16 shadow-2xl shadow-black/15">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A30000]">{title}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/48 sm:text-base">{description}</p>
      </div>
    </div>
  );
}

export default function ProjectSlider({ projects, status = 'success', errorMessage }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Otomatik kaydırma (Auto-play) efekti
  useEffect(() => {
    if (!projects || projects.length === 0 || isPaused) return;

    // Her 10 saniyede slide otomatik değişiyor (isPaused false ise)
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [projects, isPaused]);

  // Resim Placeholder
  const defaultImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";

  if (status === 'loading') {
    return (
      <ProjectStateCard
        title="Projeler yükleniyor"
        description="Seçili çalışmalar hazırlanıyor. Birkaç saniye içinde burada görünecek."
      />
    );
  }

  if (status === 'error') {
    return (
      <ProjectStateCard
        title="Projeler yüklenemedi"
        description={errorMessage || 'Projeler şu anda yüklenemiyor. Lütfen biraz sonra tekrar deneyin.'}
      />
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <ProjectStateCard
        title="Henüz proje yok"
        description="Yayına alınmış bir proje bulunamadı. Yeni çalışmalar eklendiğinde bu alanda görünecek."
      />
    );
  }

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };


  const safeCurrentIndex = projects[currentIndex] ? currentIndex : 0;
  const currentProject = projects[safeCurrentIndex];
  
  const tags = currentProject.tech_stack ? currentProject.tech_stack.split(',') : [];

  return (
    <div 
      className="group relative h-[480px] w-full overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.025] shadow-2xl shadow-black/25 sm:h-[520px] lg:h-[600px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <MotionDiv
          key={safeCurrentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={currentProject.image_url?.startsWith('/uploads/') 
              ? apiUrl(currentProject.image_url) 
              : (currentProject.image_url || defaultImage)}
            alt={currentProject.title}
            className="w-full h-full object-cover opacity-35 group-hover:opacity-90 blur-sm scale-105 transition-all duration-700"
            referrerPolicy="no-referrer"
            onError={(e) => {
              console.error("HATA: Resim bulunamadı! Aranan yol:", currentProject.image_url);
              e.target.src = defaultImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/52 to-transparent" />
        </MotionDiv>
      </AnimatePresence>

      {/* Geliştiriliyor Badge i */}
      {currentProject.is_developing && (
        <div className="absolute top-6 right-6 z-20">
          <div className="inline-flex items-center gap-2 bg-amber-500/40 backdrop-blur-md border border-amber-400/20 rounded-full px-4 py-2 shadow-xl shadow-black/40">
            <Hammer className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">
              Geliştiriliyor
            </span>
          </div>
        </div>
      )}

      {/* Proje İçeriği */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 p-5 sm:p-6 md:bottom-0 md:top-auto md:translate-y-0 md:p-16 md:pb-16">
        <MotionDiv
          key={`content-${safeCurrentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => {
              // Farklı renklr
              const colorClasses = [
                "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
                "bg-blue-500/20 text-blue-400 border-blue-500/30",
                "bg-purple-500/20 text-purple-400 border-purple-500/30",
                "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
                "bg-amber-500/20 text-amber-400 border-amber-500/30",
                "bg-rose-500/20 text-rose-400 border-rose-500/30"
              ];
              // Etiketin sırasına göre havuzdan bir renk seçiyoruz
              const selectedColor = colorClasses[index % colorClasses.length];
              return (
                <span key={index} className={`px-3 py-1 text-xs font-medium rounded-full border ${selectedColor}`}>
                  {tag.trim()}
                </span>
              );
            })}
          </div>
          <h2 className="project-slider-title text-3xl md:text-6xl mb-2 md:mb-4 text-white tracking-tight leading-tight">
            {currentProject.title}
          </h2>
          <p className="mb-0 text-sm leading-relaxed text-neutral-300 sm:max-w-[calc(100%-5rem)] md:mb-8 md:max-w-none md:text-lg">
            {currentProject.description}
          </p>
          {/* Dinamik Link Butonu */}
          {((currentProject.link_type === 'github' && currentProject.github_url) || 
            (currentProject.link_type === 'live' && currentProject.live_url)) && (
            <a 
              href={currentProject.link_type === 'github' ? currentProject.github_url : currentProject.live_url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 py-2 pr-4 text-base font-semibold text-white/62 transition-all duration-300 hover:text-white hover:underline hover:underline-offset-4 md:mt-0"
            >
              {currentProject.link_type === 'github' ? (
                <>
                  <Github className="h-5 w-5" />
                  Kaynak Kodu
                </>
              ) : (
                <>
                  <ExternalLink className="h-5 w-5" />
                  Demo
                </>
              )}
            </a>
          )}
        </MotionDiv>
      </div>

      {/* Kontroller (Sol - Sağ Okları) */}
      <div className="absolute bottom-6 right-5 flex gap-2 sm:right-6 md:bottom-8 md:right-8 md:gap-4">
        <button aria-label="Önceki proje" onClick={prev} className="rounded-full border border-white/[0.08] bg-white/[0.045] p-3 text-white backdrop-blur-md transition-colors hover:bg-white/[0.12] md:p-4">
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button aria-label="Sonraki proje" onClick={next} className="rounded-full border border-white/[0.08] bg-white/[0.045] p-3 text-white backdrop-blur-md transition-colors hover:bg-white/[0.12] md:p-4">
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* İlerleme Noktaları */}
      <div className="absolute bottom-8 left-5 flex gap-2 sm:left-6 md:bottom-10 md:left-16">
        {projects.map((_, i) => (
          <div 
            key={i}
            className={`h-1 transition-all duration-300 rounded-full ${i === safeCurrentIndex ? 'w-8 bg-[#A30000]' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}
