import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import ProjectSlider from './components/ProjectSlider'
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ContactModal from './components/ContactModal';
import Hero from './components/Hero';
import SkillsMarquee from './components/SkillsMarquee';
import Experience from './components/About';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Mevcut ana sayfamızı bir bileşen haline getiriyoruz
function MainPortfolio() {
  const [projects, setProjects] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    fetch(`${API_URL}/projects/`)
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error("Hata:", error))
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 px-6 pb-20 max-w-7xl mx-auto">
        {/* Giriş Kısmı */}
        <Hero />

        {/* Yetenekler Slide'ı */}
        <SkillsMarquee />

        {/* Projects Slider Section (Veritabanından Gelen Projeler) */}
        <section id="projects" className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-m uppercase tracking-[0.2em] text-[#820000] font-bold mb-2">Seçili Projeler</h2>
              <p className="text-3xl font-serif italic">Öne Çıkan Çalışmalarım</p>
            </div>
            
          </div>
          
          <div className='hover:scale-103 transition-all duration-500'>
          {/* FastAPI'den aldığımız 'projects' verisini Slider'a gönderiyoruz */}
          <ProjectSlider projects={projects} />
          </div>
        </section>

        {/* Eğitim ve Deneyim (Timeline) */}
        <Experience />

        {/* Contact Section */}
        <ContactSection onOpenModal={() => setIsModalOpen(true)} />
      </main>

      <Footer />
      
      {/* Açılır Pencere (Modal) Yönetimi */}
      <AnimatePresence>
        {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

// Korumalı (Protected) Rota Bileşeni
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana Sitemiz */}
        <Route path="/" element={<MainPortfolio />} />
        
        {/* Yönetim Paneli Rotaları */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App