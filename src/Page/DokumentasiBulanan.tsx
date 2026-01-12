import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { Calendar, FileText, Image as ImageIcon, ArrowRight } from 'lucide-react';

const FadeInUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const DokumentasiBulanan = () => {
    const documentations = [
        {
            month: "Desember 2025",
            title: "Laporan Akhir Tahun & Penyaluran Winter Aid",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
            stats: { photos: 24, activities: 12 },
            color: "from-blue-500 to-indigo-600"
        },
        {
            month: "November 2025",
            title: "Pemberdayaan Ekonomi Lokal & Pelatihan UMKM",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
            stats: { photos: 18, activities: 8 },
            color: "from-orange-500 to-red-600"
        },
        {
            month: "Oktober 2025",
            title: "Khitan Massal Terpadu & Layanan Kesehatan Gratis",
            image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80",
            stats: { photos: 32, activities: 15 },
            color: "from-emerald-500 to-teal-600"
        },
        {
            month: "September 2025",
            title: "Penyahunan Beasiswa Mentari Tahap III",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
            stats: { photos: 15, activities: 6 },
            color: "from-purple-500 to-pink-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            {/* Minimalist Page Header */}
            <section className="pt-40 pb-20 bg-white shadow-xs">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <FadeInUp>
                            <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-100 text-orange-600 px-4 py-1.5 rounded-full mb-8">
                                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                                <span className="text-xs font-bold tracking-widest uppercase">Archive Kebaikan</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Dokumentasi <br /> <span className="text-orange-600">Bulanan</span> & Giat
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Merangkum seluruh jejak langkah aksi kemanusiaan dan pendayagunaan zakat secara transparan setiap bulannya.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {documentations.map((item, index) => (
                            <FadeInUp
                                key={index}
                                delay={index * 0.1}
                                className="group relative bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-700 border border-gray-100"
                            >
                                <div className="flex flex-col md:flex-row h-full">
                                    <div className="md:w-2/5 relative overflow-hidden min-h-[300px]">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-20 group-hover:opacity-10 transition-opacity`} />
                                        <div className="absolute top-8 left-8">
                                            <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20 shadow-xl">
                                                <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">{item.month}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:w-3/5 p-10 lg:p-12 flex flex-col">
                                        <div className="flex items-center gap-6 mb-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                            <div className="flex items-center gap-2">
                                                <ImageIcon className="w-3.5 h-3.5" />
                                                <span>{item.stats.photos} Media</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{item.stats.activities} Program</span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-8 group-hover:text-orange-600 transition-colors leading-tight tracking-tight">
                                            {item.title}
                                        </h3>

                                        <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                                            <button className="flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all uppercase text-[10px] tracking-widest leading-none">
                                                Buka Galeri <ArrowRight className="w-4 h-4" />
                                            </button>
                                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>

                    <FadeInUp delay={0.4} className="mt-20 flex justify-center">
                        <div className="inline-flex items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            {[1, 2, 3, '...', 12].map((i, idx) => (
                                <button
                                    key={idx}
                                    className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${i === 1 ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    {i}
                                </button>
                            ))}
                        </div>
                    </FadeInUp>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DokumentasiBulanan;
