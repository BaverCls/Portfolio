import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import ProjectSlider from './components/ProjectSlider'
import { AnimatePresence } from 'framer-motion';
import ContactModal from './components/ContactModal';
import Hero from './components/Hero';
import Experience from './components/About';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { apiUrl } from './config/api';

// Mevcut ana sayfamızı bir bileşen haline getiriyoruz
function MainPortfolio() {
  const [projects, setProjects] = useState([])
  const [projectsStatus, setProjectsStatus] = useState('loading')
  const [projectsError, setProjectsError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // 3 saniyede bir tekrar deneyen akıllı fetch fonksiyonumuz
    const fetchProjects = async (retries = 5) => {
      try {
        const response = await fetch(apiUrl('/projects/'));
        if (!response.ok) throw new Error("Veritabanı uyanıyor olabilir...");
        const data = await response.json();
        setProjects(data); // Veri başarılı gelirse state'e yaz
        setProjectsStatus('success');
        setProjectsError('');
      } catch (error) {
        if (retries > 0) {
          console.log(`Sunucu uyku modunda olabilir, 3 saniye sonra tekrar deneniyor... (Kalan deneme: ${retries})`);
          setTimeout(() => fetchProjects(retries - 1), 3000); // 3 saniye bekle ve tekrar çalıştır
        } else {
          console.error("Projeler yüklenemedi. Backend'de bir sorun olabilir:", error);
          setProjectsStatus('error');
          setProjectsError('Projeler şu anda yüklenemiyor. Lütfen biraz sonra tekrar deneyin.');
        }
      }
    };

    fetchProjects();
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050506]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.014]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,0.08),rgba(5,5,6,0.34)_55%,rgba(5,5,6,0.18))]" />
      </div>
      <Navbar />
      
      <main className="relative z-10 pt-28 px-6 pb-20 max-w-7xl mx-auto">
        {/* Giriş Kısmı */}
        <Hero />

        {/* Yetenekler Slide'ı */}

        {/* Projects Slider Section (Veritabanından Gelen Projeler) */}
        <section className="relative mb-32 pt-0">
          <div className="relative flex justify-between items-end mb-10 border-t border-white/[0.06] pt-12">
            <div>
              <h2 className="text-m uppercase tracking-[0.2em] text-[#820000] font-bold mb-2">Seçili Projeler</h2>
              <p className="text-3xl font-serif italic">Öne Çıkan Çalışmalarım</p>
            </div>
            
          </div>
          
          <div id="projects" className="relative scroll-mt-28">
          {/* FastAPI'den aldığımız 'projects' verisini Slider'a gönderiyoruz */}
          <ProjectSlider projects={projects} status={projectsStatus} errorMessage={projectsError} />
          </div>
        </section>

        {/* Eğitim ve Deneyim (Timeline) */}
        <Experience />

        {/* Contact Section */}
        <ContactSection onOpenModal={() => setIsModalOpen(true)} />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
      
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
