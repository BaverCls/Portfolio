import { motion } from 'framer-motion';
import { MoveUpRight } from 'lucide-react';
import HeroRightPanel from './HeroRightPanel';

const MotionDiv = motion.div;

export default function Hero() {
  const scrollToSection = (event, selector) => {
    event.preventDefault();
    const element = document.querySelector(selector);

    if (!element) return;

    const offset = 100;
    const position = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative isolate mb-8 px-0 pt-8 pb-10 sm:px-2 md:pt-12 md:pb-14">
      <div className="pointer-events-none absolute left-5 top-4 hidden h-[72%] w-px bg-gradient-to-b from-transparent via-[#A30000]/18 to-transparent md:block" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-2rem] h-20 bg-gradient-to-b from-transparent to-[#050506]/45" aria-hidden="true" />

      <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-end">
        <MotionDiv
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
          className="lg:col-span-7"
        >
          <h1 className="max-w-4xl font-sans text-5xl font-bold leading-[1.15] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Fikirden
            <span className="block text-white/25 mb-2">Çalışan</span>
            <span className="block">
              Ürüne<span className="font-serif italic text-[#A30000]">.</span>
            </span>
          </h1>

          <div className="mt-10 max-w-xl space-y-7">
            <p className="text-base font-light leading-relaxed text-white/50 sm:text-lg">
              Frontend, backend ve veritabanı tarafını birleştirerek uçtan uca modern web çözümleri geliştiriyorum.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                onClick={(event) => scrollToSection(event, '#projects')}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#820000] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#A30000] sm:w-fit"
              >
                Projeleri Gör
                <MoveUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                onClick={(event) => scrollToSection(event, '#contact')}
                className="inline-flex w-full items-center justify-center rounded-lg border border-white/10 px-6 py-3.5 text-sm font-medium text-white/55 transition-colors duration-300 hover:border-white/20 hover:text-white sm:w-fit"
              >
                İletişime Geç
              </a>
            </div>
          </div>
        </MotionDiv>

        <HeroRightPanel />
      </div>
    </section>
  );
}
