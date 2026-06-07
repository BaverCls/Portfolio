import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { apiUrl } from '../config/api';

const MotionDiv = motion.div;

export default function ProjectModal({ onClose, onSuccess, projectToEdit }) {
  const [formData, setFormData] = useState(projectToEdit || { 
    title: '', 
    description: '', 
    tech_stack: '', 
    github_url: '', 
    live_url: '',
    link_type: 'github',
    image_url: '',
    is_developing: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const token = localStorage.getItem('adminToken');
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await fetch(apiUrl('/upload'), {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataUpload
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Yükleme başarısız.');
      }

      const data = await response.json();
      setFormData(prev => ({ ...prev, image_url: data.url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const token = localStorage.getItem('adminToken'); // Backend'e göndermek için bileti alıyoruz

    // Eğer projectToEdit varsa Güncelleme (PUT) url'si, yoksa Yeni Ekleme (POST) url'si
    const url = projectToEdit ? apiUrl(`/projects/${projectToEdit.id}`) : apiUrl('/projects/');
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
      <MotionDiv
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
            <MotionDiv initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            </MotionDiv>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Buton Link Tipi</label>
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, link_type: 'github' }))}
                      className={`flex-1 py-2 px-3 rounded-lg border text-xs transition-all flex items-center justify-center gap-2 ${
                        formData.link_type === 'github' 
                          ? 'bg-neutral-800 border-neutral-500 text-white' 
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'
                      }`}
                    >
                      GitHub
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, link_type: 'live' }))}
                      className={`flex-1 py-2 px-3 rounded-lg border text-xs transition-all flex items-center justify-center gap-2 ${
                        formData.link_type === 'live' 
                          ? 'bg-neutral-800 border-neutral-500 text-white' 
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'
                      }`}
                    >
                      Canlı Proje
                    </button>
                  </div>

                  {formData.link_type === 'github' ? (
                    <input name="github_url" type="url" placeholder="GitHub Linki..." value={formData.github_url || ''} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neutral-500 focus:bg-white/10 outline-none transition-colors text-sm" />
                  ) : (
                    <input name="live_url" type="url" placeholder="Canlı Proje Linki..." value={formData.live_url || ''} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neutral-500 focus:bg-white/10 outline-none transition-colors text-sm" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Kapak Fotoğrafı</label>
                  <div className="flex gap-2">
                    <input 
                      name="image_url" 
                      type="text" 
                      placeholder="Görsel URL..." 
                      value={formData.image_url || ''} 
                      onChange={handleChange} 
                      className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neutral-500 focus:bg-white/10 outline-none transition-colors text-sm" 
                    />
                    <label className="px-3 py-2.5 bg-neutral-800 border border-white/10 rounded-xl text-white cursor-pointer hover:bg-neutral-700 transition-colors flex items-center justify-center whitespace-nowrap text-xs font-bold">
                      {isUploading ? '...' : 'Seç'}
                      <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={isUploading} />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Proje Açıklaması</label>
                <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neutral-500 focus:bg-white/10 outline-none transition-colors resize-none"></textarea>
              </div>

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setFormData(prev => ({...prev, is_developing: !prev.is_developing}))}>
                <input 
                  name="is_developing" 
                  type="checkbox" 
                  checked={!!formData.is_developing} 
                  onChange={handleChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#820000] focus:ring-[#820000] transition-colors cursor-pointer" 
                />
                <label className="text-sm font-medium text-neutral-300 cursor-pointer">Bu proje hala geliştirme aşamasında (Geliştiriliyor ibaresini göster)</label>
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
      </MotionDiv>
    </div>
  );
}
