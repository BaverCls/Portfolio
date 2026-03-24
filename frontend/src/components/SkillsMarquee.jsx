import { motion } from 'framer-motion';

export default function SkillsMarquee() {
  // Yetenekler Listesi (Skill List)
  const skills = [
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" }
  ];

  return (
    <section className="mb-22 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-10 border-y border-white/5 overflow-hidden flex bg-neutral-900/20">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 45, repeat: Infinity }}
        className="flex flex-nowrap w-max"
      >
        {/* Tam doldurması için diziyi 2 kez render ediyoruz */}
        {[1, 2].map((groupIndex) => (
          <div key={groupIndex} className="flex gap-16 pr-16 items-center">
            {[...skills, ...skills].map((skill, index) => (
              <div key={`${groupIndex}-${index}`} className="flex items-center gap-16">
                <img 
                  src={skill.logo} 
                  alt={skill.name} 
                  title={skill.name}
                  className="w-20 h-20 md:w-24 md:h-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer" 
                />
                <span className="text-emerald-500/20 text-3xl"> </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}