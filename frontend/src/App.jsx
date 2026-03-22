import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProjectSlider from './components/ProjectSlider'
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ContactModal from './components/ContactModal';

function App() {
  const [projects, setProjects] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Skill List
  const skills = [
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaSript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" }
  ];

  useEffect(() => {
    fetch('http://127.0.0.1:8000/projects/')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error("Hata:", error))
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
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

        {/* Yetenekler Slide'ı */}
        <section className="mb-22 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-10 border-y border-white/5 overflow-hidden flex bg-neutral-900/20">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 45, repeat: Infinity }}
            className="flex flex-nowrap w-max"
          >
            {/* Tam doldurması için diziyi 2 kez render ediyoruz */}
            {[1, 2].map((groupIndex) => (
              <div key={groupIndex} className="flex gap-16 pr-16 items-center">
                {[...skills, ...skills].map((skill, index) => (
                  <div key={`${groupIndex}-${index}`} className="flex items-center gap-16">
                    <img 
                      src={skill.logo} 
                      alt={skill.name} 
                      title={skill.name}
                      className="w-20 h-20 md:w-24 md:h-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer" 
                    />
                    <span className="text-emerald-500/20 text-3xl"> </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </section>

        {/* Projects Slider Section (Veritabanından Gelen Projeler) */}
        <section id="projects" className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-m uppercase tracking-[0.2em] text-red-900 font-bold mb-2">Seçili Projeler</h2>
              <p className="text-3xl font-serif italic">Öne Çıkan Çalışmalarım</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-neutral-400 hover:text-white  hover:scale-101 transition-all duration-100">
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className='hover:scale-103 transition-all duration-500'>
          {/* FastAPI'den aldığımız 'projects' verisini Slider'a gönderiyoruz */}
          <ProjectSlider projects={projects} />
          </div>
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
              className="inline-block px-8 py-4 bg-neutral-500 text-black font-bold rounded-full hover:bg-zinc-200 hover:scale-103 transition-all duration-500"
            >
              İletişime Geç
            </button>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden glass p-12 flex flex-col justify-center">
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-800/50 flex items-center justify-center text-rose-800 font-bold">B</div>
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