import ContactSteps from "./ContactSteps";

export default function ContactSection({ onOpenModal }) {
  return (
    <section id="contact" className="relative grid md:grid-cols-2 gap-12 items-center pt-20 border-t border-white/[0.06]">
      <div className="flex flex-col gap-5">
        <p className="text-xl italic text-neutral-500 border-l border-[#A30000]/70 pl-4 leading-relaxed">
          "Projelerinizi fikir aşamasından alıp, arayüzden veritabanına kadar her adımda titizlikle çalışarak canlı bir ürüne dönüştürebiliriz."
        </p>
        <h2 className="text-3xl font-extrabold text-white leading-snug">
          Bir proje fikriniz mi var?
        </h2>
        <button
          onClick={onOpenModal}
          className="relative inline-flex items-center px-6 py-2.5 border border-[#A30000]/55 rounded-lg font-medium text-sm text-[#A30000] overflow-hidden cursor-pointer group w-fit hover:border-transparent hover:scale-102 transition-all duration-500"
        >
          <span className="absolute inset-0 rounded-lg opacity-0 bg-[linear-gradient(135deg,#0a0a0a,#A30000,#0a0a0a,#A30000,#0a0a0a)] bg-[length:200%_200%] group-hover:opacity-100 group-hover:animate-flow transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
            İletişime geç →
          </span>
        </button>
      </div>
      
      <ContactSteps />
    </section>
  );
}
