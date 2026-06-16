import { motion } from 'framer-motion';

const FloatingCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`divine-card p-6 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(255,214,0,0.35)] hover:border-divineGold/80 animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingCard;
