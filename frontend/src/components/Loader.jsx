import { motion } from 'framer-motion';
import { FiFilm } from 'react-icons/fi';

const Loader = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
            {/* Logo CineVerse animé */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center"
            >
                {/* Icône Film qui pulse */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-[#E50914] mb-4"
                >
                    <FiFilm size={80} />
                </motion.div>

                {/* Texte CineVerse */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl md:text-5xl font-black text-white tracking-tighter"
                >
                    Cine<span className="text-[#E50914]">Verse</span>
                </motion.h1>
            </motion.div>

            {/* Barre de chargement stylée */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "200px", opacity: 1 }}
                transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
                className="h-1 bg-[#E50914] rounded-full mt-12 shadow-[0_0_15px_rgba(229,9,20,0.8)]"
            />

            {/* Texte de chargement discret */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
                className="text-gray-500 text-sm mt-6 tracking-widest uppercase"
            >
                Chargement de l'expérience...
            </motion.p>
        </motion.div>
    );
};

export default Loader;