import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, ArrowRight, Search, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import Navbar from '../ui/Navbar';

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

const Berita = () => {
    const newsData = [
        {
            id: 1,
            title: "Tim SAR Muhammadiyah Beserta SAR Gabungan Terus Berupaya Mencari Korban Longsor",
            date: "Januari 24, 2025",
            author: "Administrator",
            image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800",
            excerpt: "Proses pencarian korban longsor di Desa Kasimpar, Kecamatan Petungkriyono terus dilakukan dengan intensif...",
            category: "Bencana"
        },
        {
            id: 2,
            title: "SITUATION REPORT: Bencana Alam Banjarnegara",
            date: "Januari 23, 2025",
            author: "Administrator",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/df9a9c3d-4bc6-4cc3-9cd9-7a3fe254917e.jpg",
            excerpt: "Dampak bencana tanah longsor dan banjir di Kecamatan Kalibening menjadi perhatian utama tim respon cepat...",
            category: "Laporan"
        },
        {
            id: 3,
            title: "Laporan Tahunan Lazismu Banjarnegara Tahun 2024",
            date: "Januari 22, 2025",
            author: "Administrator",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/1943f6ef-6592-424d-b3ad-c5bf4c47dd13.jpg",
            excerpt: "Berikut adalah laporan lengkap kegiatan dan pertanggungjawaban keuangan Lazismu Banjarnegara selama tahun 2024...",
            category: "Laporan"
        },
        {
            id: 4,
            title: "SIAGA BENCANA BANJARNEGARA",
            date: "Januari 22, 2025",
            author: "Administrator",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/02/231b3af6-059b-46b5-aa37-6ead5dfc00ac.jpg",
            excerpt: "Hujan deras dengan intensitas tinggi menyebabkan beberapa titik rawan longsor di Banjarnegara kembali aktif...",
            category: "Bencana"
        },
        {
            id: 5,
            title: "Kampung Samosir: Kampung Masa Depan yang Wujudkan Green Economic",
            date: "Januari 18, 2025",
            author: "Administrator",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/c524a695-73f6-4ab3-afe8-ae961976dcbc.jpg",
            excerpt: "Kampung Samosir kini menjadi percontohan program ekonomi hijau yang berkelanjutan di Banjarnegara...",
            category: "Program"
        },
        {
            id: 6,
            title: "In House Training : Fundraising Is Fun",
            date: "Desember 27, 2024",
            author: "Administrator",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2024/12/IMG-20241217-WA0032.jpg",
            excerpt: "Pelatihan fundraising yang menyenangkan untuk meningkatkan kapasitas amil dalam melayani muzakki...",
            category: "Kegiatan"
        },
    ];

    const categories = [
        { name: "Berita", count: 12 },
        { name: "Artikel", count: 5 },
        { name: "Program", count: 8 },
        { name: "Laporan", count: 3 },
        { name: "Video", count: 4 },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-800">
            <Navbar />
            <div className="container mx-auto px-4 lg:px-8 py-34">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-[70%]">
                        <FadeInUp>
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                                {newsData.map((news, index) => (
                                    <FadeInUp key={news.id} delay={index * 0.1}>
                                        <div className="group flex flex-col h-full bg-transparent">
                                            <div className="relative overflow-hidden rounded-[2rem] aspect-[16/11] mb-8 bg-gray-100 shadow-sm transition-all group-hover:shadow-2xl group-hover:shadow-orange-500/5">
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                                                />
                                                <div className="absolute top-6 left-6">
                                                    <span className="bg-white/90 backdrop-blur-md text-orange-600 text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm uppercase tracking-widest border border-orange-100">
                                                        {news.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col flex-grow px-2">
                                                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                                                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{news.date}</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors tracking-tight line-clamp-2">
                                                    <Link to={`/berita/${news.id}`}>{news.title}</Link>
                                                </h3>

                                                <p className="text-gray-500 mb-8 font-light leading-relaxed line-clamp-3">
                                                    {news.excerpt}
                                                </p>

                                                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                                    <Link to={`/berita/${news.id}`} className="text-[10px] font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                                                        Selengkapnya <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-orange-600 transition-colors">
                                                            <User className="w-3 h-3" />
                                                        </div>
                                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{news.author}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </FadeInUp>
                                ))}
                            </div>
                        </FadeInUp>

                        {/* Pagination */}
                        <div className="mt-16 text-center">
                            <div className="inline-flex gap-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded bg-orange-600 text-white font-bold text-sm shadow-md hover:bg-orange-700 transition-colors">1</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-600 font-bold text-sm border border-gray-200 hover:bg-gray-50 transition-colors">2</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-600 font-bold text-sm border border-gray-200 hover:bg-gray-50 transition-colors">3</button>
                                <button className="h-10 px-4 flex items-center justify-center rounded bg-white text-gray-600 font-bold text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                                    Next <ArrowRight className="w-3 h-3 ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-[30%] space-y-10">

                        {/* Search Widget */}
                        <div className="bg-white rounded-xl p-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">Pencarian</h4>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Telusuri..."
                                    className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 transition-colors"
                                />
                                <button className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-orange-600">
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Recent Posts Widget */}
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-6 border-l-4 border-orange-500 pl-3">Berita Terpopuler</h4>
                            <div className="space-y-6">
                                {newsData.slice(0, 4).map((item) => (
                                    <div key={item.id} className="flex gap-4 group cursor-pointer border-b border-gray-50 pb-4 last:border-0">
                                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h5 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
                                                {item.title}
                                            </h5>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase font-semibold">
                                                <Calendar className="w-3 h-3 text-orange-400" />
                                                {item.date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Categories Widget */}
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">Kategori</h4>
                            <div className="space-y-1">
                                {categories.map((cat, idx) => (
                                    <div key={idx} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-orange-50 rounded transition-colors border-b border-gray-50 border-dashed last:border-0">
                                        <div className="flex items-center gap-3 text-gray-600 group-hover:text-orange-600 text-sm font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-300 group-hover:bg-orange-600 transition-colors"></span>
                                            <span>{cat.name}</span>
                                        </div>
                                        <span className="text-gray-400 text-xs font-bold group-hover:text-orange-600">
                                            ({cat.count})
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Widget */}
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">Ikuti Kami</h4>
                            <div className="flex gap-2">
                                {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                                    <a key={idx} href="#" className="w-10 h-10 bg-white border border-gray-200 text-gray-500 hover:bg-orange-600 hover:border-orange-600 hover:text-white rounded flex items-center justify-center transition-all duration-300">
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Simple Footer Separator */}
            <div className="border-t border-gray-100 mt-12"></div>
        </div>
    );
};

export default Berita;
