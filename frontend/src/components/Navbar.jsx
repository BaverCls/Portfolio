import { motion } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { useState } from 'react';

const MotionA = motion.a;
const MotionDiv = motion.div;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Projeler', href: '#projects' },
    { name: 'Hakkımda', href: '#experience' },
    { name: 'İletişim', href: '#contact' },
  ];

  // Yumuşak kaydırma (Smooth Scroll) fonksiyonu
  const handleScroll = (e, href) => {
    e.preventDefault(); 
    const element = document.querySelector(href);
    if (element) {
      // navbardan 100px boşluk bırakıyoruz
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Eğer mobildeysek tıkladıktan sonra menüyü kapatır
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-4">
        <MotionA 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter cursor-pointer"
        >
          MUSTAFA BAVER ÇALIŞ<span className="text-rose-800">.</span>
        </MotionA>

        {/* Desktop Nav  */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <MotionA
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {link.name}
            </MotionA>
          ))}
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10"
          >
            <a href="https://github.com/BaverCls" target="_blank" rel="noreferrer" aria-label="GitHub profilini aç">
              <Github className="w-4 h-4 text-neutral-400 hover:text-white transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/bavercalis" target="_blank" rel="noreferrer" aria-label="LinkedIn profilini aç">
              <Linkedin className="w-4 h-4 text-neutral-400 hover:text-white transition-colors" />
            </a>
          </MotionDiv>
        </div>

        {/* Mobile Menu Toggle  */}
        <button
          className="md:hidden text-neutral-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 glass rounded-2xl p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-lg font-medium text-neutral-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </MotionDiv>
      )}
    </nav>
  );
}
