import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Send, Mail, User, MessageSquare, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiUrl } from '../config/api';

const MotionDiv = motion.div;

export default function ContactModal({ onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(apiUrl('/contact/'), {
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

  const inputClassName = "w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/45 focus:bg-white/[0.055] transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 18 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative my-6 w-full max-w-lg"
      >
        <div className="relative overflow-hidden rounded-2xl bg-white/10 p-px shadow-2xl shadow-black/50">
          <div
            className="pointer-events-none absolute inset-0 animate-[spin_7s_linear_infinite] rounded-2xl bg-[conic-gradient(from_0deg,transparent_0deg,transparent_70%,rgba(163,0,0,0.85)_80%,rgba(95,0,0,0.42)_87%,transparent_95%)] p-px"
            style={{
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />

          <div className="relative overflow-hidden rounded-[15px] bg-[#101010] backdrop-blur-xl">

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/42 transition-all hover:bg-white/[0.08] hover:text-white"
            aria-label="Modalı kapat"
          >
            <X className="h-4 w-4" />
          </button>

          {isSuccess ? (
            <div className="px-8 py-12 text-center">
              <MotionDiv initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>
              </MotionDiv>
              <h3 className="mb-2 text-2xl font-bold text-white">Teşekkürler!</h3>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-white/55">
                Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.
              </p>
            </div>
          ) : (
            <>
              <div className="relative px-6 pb-6 pt-8 sm:px-8">
                <div className="flex items-start gap-4 pr-10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/18 to-red-700/8">
                    <Mail className="h-5 w-5 text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">İletişime Geç</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/48">
                      Her türlü soru, öneri veya proje fikriniz için bana buradan ulaşabilirsin.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-300">Çevrimiçi</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    <Clock className="h-3 w-3 text-white/38" />
                    <span className="text-xs text-white/40">~24 saat içinde dönüş</span>
                  </div>
                </div>
              </div>

              <form className="space-y-5 px-6 pb-6 sm:px-8" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-white/68">
                    <User className="h-3.5 w-3.5 text-red-300/75" />
                    Adınız
                  </label>
                  <div className="group relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="İsim Soyisim"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-transparent to-red-500/0 transition-all group-focus-within:from-red-500/[0.035] group-focus-within:to-red-500/[0.035]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-white/68">
                    <Mail className="h-3.5 w-3.5 text-red-300/75" />
                    E-posta Adresiniz
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@email.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-white/68">
                    <MessageSquare className="h-3.5 w-3.5 text-red-300/75" />
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Harika bir fikrim var..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClassName} resize-none`}
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-0 rounded-xl bg-red-700/45 opacity-0 blur-xl transition-opacity group-hover:opacity-45" />
                  <span className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8f0000] to-[#610000] px-6 py-4 font-semibold text-white transition-all duration-300 group-hover:from-[#A30000] group-hover:to-[#780000]">
                    <Send className="h-4 w-4" />
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                  </span>
                </button>
              </form>
            </>
          )}
          </div>
        </div>
      </MotionDiv>
    </div>
  );
}
