import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ContactModal({ onClose }) {
  return (
    // Arka planı hafif karartan tam ekran kapsayıcı
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg p-8 glass rounded-3xl shadow-2xl bg-neutral-950/90"
      >
        {/* X butonu */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-3xl font-bold text-white mb-2">Merhaba De!</h3>
        <p className="text-neutral-400 mb-8">
          Projenizden bahsedin veya sadece selam verin. En kısa sürede size dönüş yapacağım.
        </p>

        {/* Şimdilik işlevsiz, sadece arayüz olan Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Adınız</label>
            <input type="text" placeholder="İsim Soyisim" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:bg-white/10 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">E-posta Adresiniz</label>
            <input type="email" placeholder="ornek@email.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:bg-white/10 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Mesajınız</label>
            <textarea rows="4" placeholder="Harika bir fikrim var..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:bg-white/10 transition-colors resize-none"></textarea>
          </div>
          
          {/* İleride bunu Backend'e bağlayacağız, şimdilik kapatma işlevi verelim */}
          <button type="submit" onClick={onClose} className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 hover:scale-[1.02] transition-all mt-4">
            Mesajı Gönder
          </button>
        </form>
      </motion.div>
    </div>
  );
}