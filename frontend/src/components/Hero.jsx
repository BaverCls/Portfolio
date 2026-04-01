import { motion } from 'framer-motion';
import HeroRightPanel from './HeroRightPanel';

export default function Hero() {
  return (
    <section className="mb-20 grid md:grid-cols-[7fr_3fr] gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
          Mühendis Adayı <br />
          <span className="text-neutral-500">Fikirden Çözüme</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
          Tasarım ve fonksiyonelliği odağına alan, uçtan uca modern web çözümleri geliştiren bir yazılım geliştirici.
        </p>
      </motion.div>
      
      <HeroRightPanel />
    </section>
  );
}