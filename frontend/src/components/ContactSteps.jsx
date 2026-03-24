import { motion } from "framer-motion";
 
const steps = [
  {
    num: "01",
    title: "İletişime Geçin",
    desc: "Projenizi kısaca anlatın. Fikir aşamasında olması yeterli.",
  },
  {
    num: "02",
    title: "Planlama",
    desc: "Kapsam, teknoloji yığını ve timeline'ı birlikte belirleriz.",
  },
  {
    num: "03",
    title: "Geliştirme",
    desc: "Hızlı iterasyonlarla inşa ederim, sizi süreçte güncel tutarım.",
  },
  {
    num: "04",
    title: "Teslim",
    desc: "Canlıya alır, gerekli desteği sağlarım.",
  },
];
 
export default function ContactSteps() {
  return (
    <div className="flex flex-col gap-0 md:pl-12">
      {steps.map((step, i) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
          className="flex gap-5 group"
        >
          {/* Sol: numara + bağlantı çizgisi */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.15 + 0.1, type: "spring", stiffness: 200 }}
              className="w-8 h-8 rounded-full border border-rose-800 flex items-center justify-center flex-shrink-0 bg-neutral-950 group-hover:bg-rose-950 transition-colors duration-300"
            >
              <span className="text-[10px] font-mono font-bold text-rose-700 group-hover:text-rose-400 transition-colors duration-300">
                {step.num}
              </span>
            </motion.div>
 
            {/* Çizgi — son adımda yok */}
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.3, ease: "easeOut" }}
                style={{ originY: 0 }}
                className="w-px flex-1 bg-white/5 my-1 min-h-[32px]"
              />
            )}
          </div>
 
          {/* Sağ: içerik */}
          <div className="pb-8">
            <p className="text-base font-bold text-white mb-1 group-hover:text-rose-100 transition-colors duration-300">
              {step.title}
            </p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {step.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}