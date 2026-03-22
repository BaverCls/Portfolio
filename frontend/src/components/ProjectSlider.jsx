import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProjectSlider({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Otomatik kaydırma (Auto-play) efekti
  useEffect(() => {
    if (!projects || projects.length === 0) return;

    // Her 6 saniyede slide otomatik değişiyor
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [projects, currentIndex]);

  // Resim Placeholder
  const defaultImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";

  // Eğer henüz proje yüklenmediyse veya veritabanı boşsa hata vermemesi için kontrol:
  if (!projects || projects.length === 0) {
    return <div className="text-neutral-400 text-center py-20">Projeler yükleniyor veya veritabanında proje yok...</div>;
  }

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };


  const currentProject = projects[currentIndex];
  
  const tags = currentProject.tech_stack ? currentProject.tech_stack.split(',') : [];

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={currentProject.image_url || defaultImage}
            alt={currentProject.title}
            className="w-full h-full object-cover opacity-30 group-hover:opacity-100 blur-sm scale-105 transition-all duration-700"
            referrerPolicy="no-referrer"
            onError={(e) => {
              console.error("HATA: Resim bulunamadı! Aranan yol:", currentProject.image_url);
              e.target.src = defaultImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Proje İçeriği */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <motion.div
          key={`content-${currentIndex}`}
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
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-serif italic tracking-tight text-white">
            {currentProject.title}
          </h2>
          <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
            {currentProject.description}
          </p>
          {/* Github URL'si veritabanında varsa bu butonu gösterir */}
          {currentProject.github_url && (
            <a 
              href={currentProject.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-red-800 hover:scale-102 hover:text-white transition-colors transition-all duration-500"
            >
              Projeyi İncele <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Kontroller (Sol - Sağ Okları) */}
      <div className="absolute bottom-8 right-8 flex gap-4">
        <button onClick={prev} className="p-4 glass rounded-full hover:bg-white/20 transition-colors text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={next} className="p-4 glass rounded-full hover:bg-white/20 transition-colors text-white">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* İlerleme Noktaları */}
      <div className="absolute top-8 right-8 flex gap-2">
        {projects.map((_, i) => (
          <div 
            key={i}
            className={`h-1 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 bg-red-900' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}