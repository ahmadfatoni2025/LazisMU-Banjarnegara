import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { Calendar, ArrowRight, Search, Mail } from 'lucide-react';

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

const Artikel = () => {
    const articles = [
        {
            title: "Pentingnya Zakat dalam Menjaga Keseimbangan Ekonomi Umat",
            excerpt: "Zakat bukan hanya sekadar kewajiban agama, tetapi juga instrumen ekonomi yang vital dalam mengentaskan kemiskinan...",
            author: "Admin Lazismu",
            date: "12 Januari 2026",
            image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80",
            category: "Edukasi"
        },
        {
            title: "Panduan Lengkap Menghitung Zakat Mal bagi Pengusaha",
            excerpt: "Bagi para pengusaha, menghitung zakat mal bisa menjadi tantangan tersendiri. Berikut panduan praktis dan syar'i...",
            author: "Dewan Syariah",
            date: "10 Januari 2026",
            image: "https://images.unsplash.com/photo-1454165833762-0165c069547a?auto=format&fit=crop&q=80",
            category: "Panduan"
        },
        {
            title: "Inspirasi Kebaikan: Kisah Penerima Manfaat Beasiswa Mentari",
            excerpt: "Dika (18), salah satu penerima manfaat Lazismu yang kini berhasil melanjutkan kuliah di perguruan tinggi negeri...",
            author: "Media Lazismu",
            date: "08 Januari 2026",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
            category: "Kisah Inspiratif"
        },
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
                                <span className="text-xs font-bold tracking-widest uppercase">Edukasi & Literasi</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Artikel <span className="text-orange-600">&</span> <br /> Wawasan ZISKA
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Temukan beragam artikel menarik seputar zakat, panduan ibadah, dan kisah inspiratif pengelolaan amanah di Lazismu.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            <div className="space-y-12">
                                {articles.map((article, index) => (
                                    <FadeInUp
                                        key={index}
                                        delay={index * 0.1}
                                        className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all group"
                                    >
                                        <div className="md:flex">
                                            <div className="md:w-2/5 h-72 md:h-auto overflow-hidden relative">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <div className="absolute top-6 left-6">
                                                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                                        {article.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="md:w-3/5 p-10 lg:p-12 flex flex-col">
                                                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {article.date}
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight tracking-tight">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-500 mb-10 font-light leading-relaxed line-clamp-2">
                                                    {article.excerpt}
                                                </p>
                                                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-gray-400">Oleh {article.author}</span>
                                                    <button className="flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all uppercase text-[10px] tracking-widest">
                                                        Baca Artikel <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </FadeInUp>
                                ))}
                            </div>

                            <FadeInUp delay={0.3} className="mt-16 flex justify-center">
                                <button className="px-10 py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:border-orange-600 hover:text-orange-600 transition-all shadow-sm">
                                    Muat Lebih Banyak
                                </button>
                            </FadeInUp>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-32 space-y-8">
                                <FadeInUp delay={0.2}>
                                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                                        <h4 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Cari Artikel</h4>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                placeholder="Ketik kata kunci..."
                                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all pr-14 placeholder:text-gray-400"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20 group-hover:scale-105 transition-transform cursor-pointer">
                                                <Search className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </FadeInUp>

                                <FadeInUp delay={0.3}>
                                    <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16" />
                                        <div className="relative z-10 text-center">
                                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
                                                <Mail className="w-8 h-8 text-orange-500" />
                                            </div>
                                            <h4 className="text-2xl font-bold mb-4 tracking-tight">Warta Kebaikan</h4>
                                            <p className="text-gray-400 text-sm mb-10 font-light leading-relaxed">Dapatkan update artikel harian dan informasi program inspiratif langsung di email kamu.</p>
                                            <div className="space-y-4">
                                                <input
                                                    type="email"
                                                    placeholder="Alamat Email"
                                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:bg-white/10 focus:border-orange-500 transition-all text-sm"
                                                />
                                                <button className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 active:scale-95">
                                                    Berlangganan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </FadeInUp>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Artikel;
