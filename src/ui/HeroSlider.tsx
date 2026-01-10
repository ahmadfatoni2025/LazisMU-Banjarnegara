import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: "https://lazismupeduli.id/wp-content/uploads/2025/03/Infaq-1.webp",
        title: "Menebar Kebaikan",
        subtitle: "Bersama Lazismu Banjarnegara"
    },
    {
        id: 2,
        image: "https://www.lazismublora.org/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-07-at-20.47.46.jpeg",
        title: "Pemberdayaan UMKM",
        subtitle: "Meningkatkan Ekonomi Umat"
    },
    {
        id: 3,
        image: "https://lazismumedan.org/wp-content/uploads/2025/06/fguyugyuygh.jpg",
        title: "Peduli Kesehatan",
        subtitle: "Bantuan Kursi Roda untuk Sesama"
    },
    {
        id: 4,
        image: "https://lazismujepara.id/wp-content/uploads/2025/08/Beasiswa-Mentari-scaled.jpg",
        title: "Beasiswa Mentari",
        subtitle: "Mencerahkan Masa Depan Anak Bangsa"
    }
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000); // Slide every 5 seconds
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden bg-gray-900 group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 z-20 p-8 lg:p-16">
                        <div className="container mx-auto">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="max-w-3xl"
                            >
                                <span className="inline-block px-4 py-1.5 bg-orange-600 text-white text-xs font-bold tracking-widest uppercase rounded-full mb-4">
                                    Dokumentasi Kegiatan
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                    {slides[current].title}
                                </h2>
                                <p className="text-lg text-white/80 max-w-xl">
                                    {slides[current].subtitle}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-orange-600 transition-colors opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-orange-600 transition-colors opacity-0 group-hover:opacity-100"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicators */}
            <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-orange-600 w-8' : 'bg-white/50 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
