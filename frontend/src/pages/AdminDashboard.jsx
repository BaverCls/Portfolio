import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Mail, FolderKanban, Trash2, Plus, Pencil } from 'lucide-react';
import ProjectModal from '../components/ProjectModal';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('messages'); // 'messages' veya 'projects'
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Backend çökerse ekrana basılacak hata
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // Düzenlenecek proje
  const [refreshKey, setRefreshKey] = useState(0); // Proje eklendiğinde listeyi tetiklemek için
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  // Backend'e yollanacak güvenlik bileti (Token) paketi
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { 'Authorization': `Bearer ${token}` };
  };

  // Mesaj Silme Fonksiyonu
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Bu mesajı kalıcı olarak silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`${API_URL}/contact/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (res.ok) setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error("Mesaj silinirken hata oluştu:", err);
    }
  };

  // Proje Silme Fonksiyonu
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Bu projeyi kalıcı olarak silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (res.ok) setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Proje silinirken hata oluştu:", err);
    }
  };

  // Sekme veya listeye veri eklendiğinde backend'den ilgili veriyi çeker
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (activeTab === 'messages') {
      fetch(`${API_URL}/contact/`, { headers: getAuthHeaders() })
        .then(res => { 
          if (res.status === 401) { localStorage.removeItem('adminToken'); navigate('/admin'); throw new Error("Oturum süresi dolmuş."); }
          if (!res.ok) throw new Error("Ağ hatası"); 
          return res.json(); 
        })
        .then(data => setMessages(data))
        .catch(err => setError("Mesajlar yüklenirken sunucuya ulaşılamadı. Backend kapalı veya donmuş olabilir."))
        .finally(() => setIsLoading(false));
    } else if (activeTab === 'projects') {
      fetch(`${API_URL}/projects/`, { headers: getAuthHeaders() })
        .then(res => { if (!res.ok) throw new Error("Ağ hatası"); return res.json(); })
        .then(data => setProjects(data))
        .catch(err => setError("Projeler yüklenirken sunucuya ulaşılamadı. Backend kapalı veya donmuş olabilir."))
        .finally(() => setIsLoading(false));
    }
  }, [activeTab, refreshKey]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Çıkış yaparken bileti yırt
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex text-white">
      {/* Sol Menü (Sidebar) */}
      <div className="w-64 border-r border-white/10 glass p-6 flex flex-col z-10">
        <h2 className="text-xl font-bold mb-10 tracking-tighter">
          YÖNETİM<span className="text-[#820000]">.</span>
        </h2>

        <nav className="flex-1 space-y-4">
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'messages' ? 'bg-[#820000]/20 text-red-400 border border-[#820000]/30' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <Mail className="w-5 h-5" />
            Gelen Mesajlar
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-[#820000]/20 text-red-400 border border-[#820000]/30' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <FolderKanban className="w-5 h-5" />
            Projeler
          </button>
        </nav>

        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-colors mt-auto">
          <LogOut className="w-5 h-5" />
          Çıkış Yap
        </button>
      </div>

      {/* Ana İçerik Alanı */}
      <div className="flex-1 p-10 relative overflow-y-auto">
        <motion.div 
          key={activeTab} // Sekme değişince animasyon baştan oynar
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">
                {activeTab === 'messages' ? 'Gelen Mesajlar' : 'Projeler'}
              </h1>
              <p className="text-neutral-400">
                {activeTab === 'messages' 
                  ? 'İletişim formundan gönderilen mesajları buradan okuyabilirsiniz.' 
                  : 'Portfolyonuzda sergilenen projeleri buradan yönetebilirsiniz.'}
              </p>
            </div>
            
            {/* Sadece Projeler sekmesindeyken "Yeni Ekle" butonu çıkar */}
            {activeTab === 'projects' && (
              <button 
                onClick={() => {
                  setEditingProject(null); // Düzenleme modundan çık, yeni ekleme moduna geç
                  setIsProjectModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#820000] text-white font-medium rounded-lg hover:bg-[#a30000] transition-colors"
              >
                <Plus className="w-4 h-4" /> Yeni Proje Ekle
              </button>
            )}
          </div>

          {/* İçerik Yükleniyor veya Boş Durumu */}
          {error ? (
            <div className="text-center py-10 text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl">
              {error}
            </div>
          ) : isLoading ? (
            <div className="text-center py-10 text-neutral-500">Veriler yükleniyor...</div>
          ) : (
            <div className="space-y-4">
              
              {/* MESAJLAR LİSTESİ */}
              {activeTab === 'messages' && messages.length === 0 && <div className="text-center py-10 text-neutral-500 glass rounded-2xl border border-white/10">Henüz mesajınız yok.</div>}
              {activeTab === 'messages' && messages.map((msg) => (
                <div key={msg.id} className="glass rounded-2xl p-6 border border-white/10 flex flex-col gap-4 group relative">
                  <button 
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100" 
                    title="Mesajı Sil"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="flex justify-between items-start border-b border-white/5 pb-4 pr-10">
                    <div>
                      <h3 className="font-bold text-lg text-white">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-sm text-red-400 hover:underline">{msg.email}</a>
                    </div>
                    <span className="text-xs text-neutral-500 font-mono">
                      {new Date(msg.created_at).toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <p className="text-neutral-300 whitespace-pre-wrap">{msg.message}</p>
                </div>
              ))}

              {/* PROJELER LİSTESİ */}
              {activeTab === 'projects' && projects.length === 0 && <div className="text-center py-10 text-neutral-500 glass rounded-2xl border border-white/10">Henüz projeniz yok.</div>}
              {activeTab === 'projects' && projects.map((proj) => (
                <div key={proj.id} className="glass rounded-2xl p-6 border border-white/10 flex justify-between items-center group">
                  <div>
                    <h3 className="font-bold text-lg text-white">{proj.title}</h3>
                    <p className="text-sm text-neutral-400">{proj.tech_stack}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => {
                        setEditingProject(proj); // Projeyi modal'a gönder
                        setIsProjectModalOpen(true);
                      }}
                      className="p-2 text-neutral-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all" 
                      title="Projeyi Düzenle"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" 
                      title="Projeyi Sil"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Proje Ekleme Modalı */}
      {isProjectModalOpen && (
        <ProjectModal 
          projectToEdit={editingProject}
          onClose={() => setIsProjectModalOpen(false)} 
          onSuccess={() => {
            setIsProjectModalOpen(false);
            setRefreshKey(prev => prev + 1); // Listeyi otomatik yeniler
          }} 
        />
      )}
    </div>
  );
}