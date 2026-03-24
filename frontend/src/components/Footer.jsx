export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-neutral-500 text-sm">
          © 2026 Mustafa Baver Çalış. Tüm hakları saklıdır.
        </p>
        <div className="flex gap-8 text-sm text-neutral-500">
          <a href="https://www.instagram.com/bavercls/" className="hover:text-white transition-colors">Instagram</a>
          <a href="https://github.com/BaverCls" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/bavercalis/" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}