import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function ContactModal({ onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    // Backend yanıt vermezse sonsuza kadar donmasını engellemek için 15 saniyelik zaman aşımı ekliyoruz
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${API_URL}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }

      setIsSuccess(true);
      // 3 saniye sonra modalı otomatik kapat
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Sunucu yanıt vermiyor. Lütfen backendin çalıştığından emin olun.');
      } else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Arka planı hafif karartan tam ekran kapsayıcı (bulanıklaştırmayı kapattım, çok kasıyodu)
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg p-8 md:p-12 glass rounded-3xl shadow-2xl bg-neutral-950/90"
      >
        {/* X butonu */}
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
            <h3 className="text-2xl font-bold text-white mb-2">Teşekkürler!</h3>
            <p className="text-neutral-300">Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.</p>
          </div>
        ) : (
          <>
            <h3 className="text-3xl font-bold text-white mb-2">İletişime Geç</h3>
            <p className="text-neutral-400 mb-8">
              Her türlü soru, öneri veya iş birliği teklifi için bana buradan ulaşabilirsin. Genellikle 24 saat içinde dönüş yapıyorum.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Adınız</label>
                <input id="name" name="name" type="text" placeholder="İsim Soyisim" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:bg-white/10 transition-colors" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">E-posta Adresiniz</label>
                <input id="email" name="email" type="email" placeholder="ornek@email.com" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:bg-white/10 transition-colors" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Mesajınız</label>
                <textarea id="message" name="message" rows="4" placeholder="Harika bir fikrim var..." required value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:bg-white/10 transition-colors resize-none"></textarea>
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative inline-flex items-center justify-center px-10 py-4 bg-transparent border border-[#820000] rounded-xl font-bold text-[#A10000] overflow-hidden cursor-pointer group w-full hover:border-black hover:scale-[1.02] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 opacity-0 bg-[linear-gradient(135deg,#0a0a0a,#A30000,#0a0a0a,#A30000,#0a0a0a)] bg-[length:200%_200%] group-hover:opacity-100 group-hover:animate-flow transition-opacity duration-500" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                  </span>
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}