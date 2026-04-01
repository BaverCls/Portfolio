import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      if (!response.ok) throw new Error('Hatalı kullanıcı adı veya şifre!');

      const data = await response.json();
      localStorage.setItem('adminToken', data.access_token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
      <a href="/" className="absolute top-8 left-8 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Siteye Dön
      </a>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 glass rounded-3xl shadow-2xl bg-neutral-900/50 border border-white/10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#820000]/20 flex items-center justify-center border border-[#820000]/50">
            <Lock className="w-8 h-8 text-[#A30000]" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-8">Admin Girişi</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Kullanıcı Adı</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin" 
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#820000] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Yönetici Şifresi</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#820000] transition-colors"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#820000] text-white font-bold rounded-xl hover:bg-[#a30000] transition-colors duration-300"
          >
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}