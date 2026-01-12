import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileHover={{
                        scale: 1.15,
                        boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.4)",
                        translateY: -5
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 z-60 p-5 rounded-3xl bg-linear-to-br from-orange-500 to-amber-600 text-white shadow-2xl shadow-orange-500/30 group border-4 border-white"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-7 h-7 group-hover:animate-bounce" strokeWidth={3} />

                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-orange-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity -z-10" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
