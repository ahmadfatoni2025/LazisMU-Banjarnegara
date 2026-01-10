import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, TrendingUp, Users, HeartHandshake, Award } from 'lucide-react';

const cards = [
    {
        icon: TrendingUp,
        title: "Pertumbuhan Zakat",
        desc: "Peningkatan penghimpunan zakat mencapai 25% dibanding tahun sebelumnya, membuktikan kepercayaan masyarakat yang semakin tinggi.",
        bg: "bg-blue-50",
        color: "text-blue-600",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
    },
    {
        icon: Users,
        title: "Penerima Manfaat",
        desc: "Lebih dari 15.000 jiwa telah merasakan manfaat dari program-program Lazismu di seluruh Banjarnegara.",
        bg: "bg-orange-50",
        color: "text-orange-600",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
    },
    {
        icon: HeartHandshake,
        title: "Mitra Kebaikan",
        desc: "Kolaborasi dengan 50+ mitra strategis dari berbagai sektor untuk memperluas jangkauan kebermanfaatan.",
        bg: "bg-green-50",
        color: "text-green-600",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800"
    },
    {
        icon: Award,
        title: "Penghargaan",
        desc: "Meraih predikat WTP (Wajar Tanpa Pengecualian) dalam audit keuangan syariah tahun 2024.",
        bg: "bg-purple-50",
        color: "text-purple-600",
        image: "https://www.suaramuhammadiyah.id/storage/posts/image/Menebar_Kebaikan_di_Ramadhan_Lazismu_Pulang_Pisau_Gelar_Aksi_Berbagi_Takjil-20250309155928.jpeg"
    },
    {
        icon: Users,
        title: "Penerima Manfaat",
        desc: "Lebih dari 15.000 jiwa telah merasakan manfaat dari program-program Lazismu di seluruh Banjarnegara.",
        bg: "bg-orange-50",
        color: "text-orange-600",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
    },
    {
        icon: HeartHandshake,
        title: "Mitra Kebaikan",
        desc: "Kolaborasi dengan 50+ mitra strategis dari berbagai sektor untuk memperluas jangkauan kebermanfaatan.",
        bg: "bg-green-50",
        color: "text-green-600",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800"
    },
    {
        icon: Award,
        title: "Penghargaan",
        desc: "Meraih predikat WTP (Wajar Tanpa Pengecualian) dalam audit keuangan syariah tahun 2024.",
        bg: "bg-purple-50",
        color: "text-purple-600",
        image: "https://www.suaramuhammadiyah.id/storage/posts/image/Menebar_Kebaikan_di_Ramadhan_Lazismu_Pulang_Pisau_Gelar_Aksi_Berbagi_Takjil-20250309155928.jpeg"
    }
];

const AnnualRecap = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 400;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-24 bg-white overflow-hidden relative" ref={containerRef}>
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                        >
                            Laporan Tahunan 2024
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4"
                        >
                            Jejak Kebaikan &
                            <span className="text-orange-600"> Dampak Nyata.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-gray-500 leading-relaxed"
                        >
                            Transparansi kinerja kami dalam menghimpun dan menyalurkan dana umat untuk membangun kehidupan yang lebih baik.
                        </motion.p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:scale-110 active:scale-95 bg-white"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:scale-110 active:scale-95 bg-white"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="min-w-[300px] md:min-w-[350px] snap-center"
                        >
                            <div className="h-full bg-gray-50 rounded-2xl p-8 hover:bg-black/5 transition-colors duration-300 group cursor-pointer border border-transparent hover:border-orange-100 relative overflow-hidden">
                                {/* Hover Image Background - subtle watermark */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/50 to-black/5 z-10" />
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700"
                                    />
                                </div>

                                <div className="relative z-10">
                                    <div className={`w-14 h-14 ${card.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <card.icon className={`w-7 h-7 ${card.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white-700 transition-colors duration-300">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AnnualRecap;
