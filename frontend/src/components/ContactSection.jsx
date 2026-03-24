import ContactSteps from "./ContactSteps";
import { Mail } from "lucide-react";

export default function ContactSection({ onOpenModal }) {
  return (
    <section id="contact" className="grid md:grid-cols-2 gap-12 items-center pt-20 border-t border-white/10">
      <div>
        <h2 className="text-4xl font-bold mb-6 text-white">Bir projeniz mi var?</h2>
        <p className="text-neutral-400 text-lg mb-8">
          Birlikte harika şeyler inşa edebiliriz. Hemen iletişime geçin ve projenizi konuşalım.
        </p>
        <button 
          onClick={onOpenModal} /* Dışarıdan gelen fonksiyonu tetikler */
          className="group inline-flex items-center px-8 py-4 bg-rose-800 text-white font-bold rounded-full hover:bg-zinc-200 hover:scale-103 hover:text-black transition-all duration-500"
        >
          İletişime Geç
          <Mail className="w-0 h-5 opacity-0 group-hover:w-5 group-hover:ml-2 group-hover:opacity-100 transition-all duration-500" />
        </button>
      </div>
      
      <ContactSteps />
    </section>
  );
}