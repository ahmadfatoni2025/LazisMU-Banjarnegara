import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Users, School, HeartPulse, ArrowUpRight, ArrowRight } from 'lucide-react';

const ImpactDashboard = () => {
    const containerRef = useRef(null);
    useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const statsCard = {
        type: 'stats',
        title: 'Total Penerima Manfaat',
        value: '5,007',
        desc: 'Jiwa telah terbantu melalui berbagai program kebaikan',
        color: 'bg-orange-50',
        textColor: 'text-orange-600',
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
    };

    const programCards = [
        {
            title: 'Pilar Pendidikan',
            beneficiaries: '166',
            label: 'Penerima',
            amount: 'Rp 1.178 M',
            icon: School,
            color: 'bg-blue-50',
            textColor: 'text-blue-600',
            tag: 'Pendidikan',
            image: "https://muhammadiyah.or.id/wp-content/uploads/2025/05/Lazismu-Luncurkan-Gerakan-Zakat-Nasional-untuk-Pendidikan.jpeg"
        },
        {
            title: 'Pilar Kesehatan',
            beneficiaries: '180',
            label: 'Penerima',
            amount: 'Rp 862 Jt',
            icon: HeartPulse,
            color: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            tag: 'Kesehatan',
            image: "https://pwmjateng.com/wp-content/uploads/2022/08/Lazismu-Blora.jpeg"
        },
        {
            title: 'Pilar Sosial',
            beneficiaries: '4,436',
            label: 'Penerima',
            amount: 'Rp 1.0 M',
            icon: Users,
            color: 'bg-orange-50',
            textColor: 'text-orange-600',
            tag: 'Sosial',
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden relative" ref={containerRef}>
            {/* Background Decorations matching AnnualRecap */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left Panel - Sticky Typography */}
                    <div className="lg:col-span-12 xl:col-span-5 lg:sticky lg:top-32 self-start flex flex-col justify-center py-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                                Impact Report 2024
                            </div>

                            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
                                Jejak Kebaikan & <br />
                                <span className="text-orange-600">Dampak Nyata.</span>
                            </h2>

                            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                                Transparansi adalah kunci. Lihat bagaimana donasi Anda dikelola dan disalurkan kepada mereka yang membutuhkan di Banjarnegara.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-12">
                                <button className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 group">
                                    Salurkan Donasi
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors">
                                    Lihat Detail Laporan
                                </button>
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-6">Didukung oleh mitra terpercaya</p>
                                <div className="flex flex-wrap gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all duration-500">
                                    <div className="flex items-center gap-2 font-bold text-gray-900">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px]">M</div>
                                        MUHAMMADIYAH
                                    </div>
                                    <div className="flex items-center gap-2 font-bold text-gray-900">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">L</div>
                                        LAZISMU
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Panel - The Bento Grid */}
                    <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">

                        {/* Top Wide Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 text-gray-900 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            {/* Hover Image Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={statsCard.image}
                                    alt="Impact"
                                    className="w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                                />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-500">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <div className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest border border-gray-100">
                                        Statistik Total
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                                            {statsCard.desc}
                                        </h3>
                                        <div className="text-6xl md:text-8xl font-black text-orange-600 tracking-tighter">
                                            {statsCard.value}
                                            <span className="text-2xl md:text-3xl text-gray-400 font-bold ml-3 tracking-normal">Jiwa</span>
                                        </div>
                                    </div>
                                    <button className="w-24 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-orange-600 hover:scale-110 transition-all duration-300 shadow-lg">
                                        <ArrowUpRight className="w-8 h-8" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom Grid for Programs */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {programCards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-white rounded-3xl p-8 border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                                >
                                    {/* Background Image on Hover */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                        />
                                    </div>

                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center ${card.textColor} group-hover:scale-110 transition-transform duration-500`}>
                                                <card.icon className="w-7 h-7" />
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">
                                                <span>Detail</span>
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">
                                                {card.tag}
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-900 mb-4">
                                                {card.title}
                                            </h4>

                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <div className="text-4xl font-black text-gray-900 group-hover:text-orange-600 transition-colors">
                                                        {card.beneficiaries}
                                                    </div>
                                                    <div className="text-sm font-semibold text-gray-400">
                                                        {card.label}
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1.5 bg-gray-50 rounded-lg text-gray-600 text-xs font-bold border border-gray-100">
                                                    {card.amount}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactDashboard;

