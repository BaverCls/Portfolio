import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProjectSlider from './components/ProjectSlider'
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ContactModal from './components/ContactModal';

function App() {
  const [projects, setProjects] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/projects/')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error("Hata:", error))
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 px-6 pb-20 max-w-7xl mx-auto">
        {/* Giriş Kısmı */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
              Mühendis Adayı <br />
              <span className="text-neutral-500">Uçtan uca yazılım</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit sequi autem error 
              at vel id sapiente voluptate unde assumenda fugiat. Quod suscipit quidem, tempore 
              inventore officiis necessitatibus autem commodi accusamus?
            </p>
          </motion.div>
        </section>

        {/* Projects Slider Section (Veritabanından Gelen Projeler) */}
        <section id="projects" className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-emerald-500 font-bold mb-2">Seçili Projeler</h2>
              <p className="text-3xl font-serif italic">Öne Çıkan Çalışmalarım</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-neutral-400 hover:text-white  hover:scale-101 transition-all duration-100">
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* FastAPI'den aldığımız 'projects' verisini Slider'a gönderiyoruz */}
          <ProjectSlider projects={projects} />
        </section>

        {/* About & Contact Section */}
        <section id="contact" className="grid md:grid-cols-2 gap-12 items-center py-20 border-t border-white/10">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">Bir projeniz mi var?</h2>
            <p className="text-neutral-400 text-lg mb-8">
              Birlikte harika şeyler inşa edebiliriz. Hemen iletişime geçin ve projenizi konuşalım.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)} /* Contact formunu açar */
              className="inline-block px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-200 hover:scale-103 transition-all duration-500"
            >
              İletişime Geç
            </button>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden glass p-12 flex flex-col justify-center">
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">M</div>
                  <div>
                    <p className="font-bold text-white">Mustafa Baver Çalış</p>
                    <p className="text-sm text-neutral-500">Frontend Developer</p>
                  </div>
                </div>
                <p className="text-neutral-400 italic">
                  "Ben şansa inanmam. Başarmanın tek sırrı çok çalışmak."
                </p>
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-sm">
            © 2026 Mustafa Baver Çalış. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-8 text-sm text-neutral-500">
            <a href="https://www.instagram.com/bavercls/" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Git</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
      
      {/* Açılır Pencere (Modal) Yönetimi */}
      <AnimatePresence>
        {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default App