// Hooks removed

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, HeartHandshake, Award } from 'lucide-react';




const AnnualRecap = () => {
    // Unique cards only for the bento grid
    const bentoCards = [
        {
            icon: TrendingUp,
            title: "Pertumbuhan Zakat",
            desc: "Peningkatan penghimpunan zakat mencapai 25% dibanding tahun sebelumnya.",
            bg: "bg-blue-50",
            color: "text-blue-600",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
            className: "md:col-span-2 bg-white"
        },
        {
            icon: Users,
            title: "Total Penerima Manfaat",
            desc: "15.000+ jiwa",
            bg: "bg-orange-50",
            color: "text-orange-600",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
            className: "md:col-span-1 bg-white"
        },
        {
            icon: HeartHandshake,
            title: "Mitra Strategis",
            desc: "50+ Kolaborasi",
            bg: "bg-green-50",
            color: "text-green-600",
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
            className: "md:col-span-1 bg-white"
        },
        {
            icon: Award,
            title: "Predikat WTP 2024",
            desc: "Meraih predikat Wajar Tanpa Pengecualian dalam audit keuangan syariah, bukti transparansi dan akuntabilitas.",
            bg: "bg-purple-50",
            color: "text-purple-600",
            image: "https://www.suaramuhammadiyah.id/storage/posts/image/Menebar_Kebaikan_di_Ramadhan_Lazismu_Pulang_Pisau_Gelar_Aksi_Berbagi_Takjil-20250309155928.jpeg",
            className: "md:col-span-2 bg-white"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-12">
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
                            Transparansi kinerja kami dalam menghimpun dan menyalurkan dana umat.
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bentoCards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ${card.className}`}
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                />
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                <div>
                                    <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <card.icon className={`w-7 h-7 ${card.color}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed text-base group-hover:text-gray-700 transition-colors">
                                        {card.desc}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider group-hover:text-orange-500 transition-colors">
                                    <span>Selengkapnya</span>
                                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
