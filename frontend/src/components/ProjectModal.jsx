import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function ProjectModal({ onClose, onSuccess, projectToEdit }) {
  const [formData, setFormData] = useState(projectToEdit || { 
    title: '', 
    description: '', 
    tech_stack: '', 
    github_url: '', 
    image_url: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const token = localStorage.getItem('adminToken'); // Backend'e göndermek için bileti alıyoruz

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    // Eğer projectToEdit varsa Güncelleme (PUT) url'si, yoksa Yeni Ekleme (POST) url'si
    const url = projectToEdit ? `${API_URL}/projects/${projectToEdit.id}` : `${API_URL}/projects/`;
    const method = projectToEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'İşlem sırasında bir hata oluştu.');
      }

      setIsSuccess(true);
      // 2 saniye sonra formu kapat ve listeyi güncelle
      setTimeout(() => {
        onSuccess();
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl p-8 md:p-12 glass rounded-3xl shadow-2xl bg-neutral-950/90 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Başarılı!</h3>
            <p className="text-neutral-300">Proje başarıyla kaydedildi.</p>
          </div>
        ) : (
          <>
            <h3 className="text-3xl font-bold text-white mb-2">
              {projectToEdit ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
            </h3>
            <p className="text-neutral-400 mb-8">
              {projectToEdit ? 'Proje bilgilerini aşağıdan güncelleyebilirsiniz.' : 'Portfolyonuzda sergilemek istediğiniz projenin detaylarını girin.'}
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Proje Adı *</label>
                <input name="title" type="text" required value={formData.title} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neutral-500 focus:bg-white/10 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Kullanılan Teknolojiler (Virgülle ayırın)</label>
                <input name="tech_stack" type="text" placeholder="React, FastAPI, Tailwind" value={formData.tech_stack} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neutral-500 focus:bg-white/10 outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">GitHub Linki (Opsiyonel)</label>
                  <input name="github_url" type="url" placeholder="https://github.com/..." value={formData.github_url} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neutral-500 focus:bg-white/10 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Kapak Fotoğrafı URL (Opsiyonel)</label>
                  <input name="image_url" type="url" placeholder="https://..." value={formData.image_url} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neutral-500 focus:bg-white/10 outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Proje Açıklaması</label>
                <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neutral-500 focus:bg-white/10 outline-none transition-colors resize-none"></textarea>
              </div>
              
              {error && <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg text-sm"><AlertTriangle className="w-4 h-4 flex-shrink-0" /><span>{error}</span></div>}

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#820000] text-white font-bold rounded-xl hover:bg-[#a30000] transition-colors">
                  {isSubmitting ? 'Kaydediliyor...' : (projectToEdit ? 'Değişiklikleri Kaydet' : 'Projeyi Ekle')}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}