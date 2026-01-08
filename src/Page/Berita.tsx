import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../ui/Navbar';

const Berita = () => {
    const newsData = [
        {
            id: 1,
            title: "Tim SAR Muhammadiyah Beserta SAR Gabungan Terus Berupaya Mencari Korban Longsor",
            date: "Januari 24, 2025",
            image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800",
            excerpt: "Proses pencarian korban longsor di Desa Kasimpar, Kecamatan Petungkriyono...",
            category: "Bencana"
        },
        {
            id: 2,
            title: "SITUATION REPORT: Bencana Alam Banjarnegara",
            date: "Januari 23, 2025",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/df9a9c3d-4bc6-4cc3-9cd9-7a3fe254917e.jpg",
            excerpt: "Dampak bencana bencana tanah longsor dan banjir 1,Kecamatan Kalibening)...",
            category: "Laporan"
        },
        {
            id: 3,
            title: "Laporan Tahunan Lazismu Banjarnegara Tahun 2024",
            date: "Januari 22, 2025",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/1943f6ef-6592-424d-b3ad-c5bf4c47dd13.jpg",
            excerpt: "Laporan kegiatan dan keuangan Lazismu Banjarnegara tahun 2024",
            category: "Laporan"
        },
        {
            id: 4,
            title: "SIAGA BENCANA BANJARNEGARA",
            date: "Januari 22, 2025",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/02/231b3af6-059b-46b5-aa37-6ead5dfc00ac.jpg",
            excerpt: "Pada tanggal 20 Januari 2025, hujan deras dengan intensitas...",
            category: "Bencana"
        },
        {
            id: 5,
            title: "Kampung Samosir: Kampung Masa Depan yang Wujudkan Green Economic",
            date: "Januari 18, 2025",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/c524a695-73f6-4ab3-afe8-ae961976dcbc.jpg",
            excerpt: "Kampung Samosir, Bahun, Banjarnegara (16 Januari 2025) – Lazismu...",
            category: "Program"
        },
        {
            id: 6,
            title: "In House Training : Fundraising Is Fun",
            date: "Desember 27, 2024",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2024/12/IMG-20241217-WA0032.jpg",
            excerpt: "Cilacap, 25-26 Desember 2024 – Lembaga Amil Zakat Infaq...",
            category: "Kegiatan"
        },
        {
            id: 7,
            title: "Cara Membayar Hutang Puasa Orang Tua",
            date: "Desember 27, 2024",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/02f9d167-bbc4-4669-9d0b-1ef85dd89468.jpg",
            excerpt: "Dalam surat al-Baqoroh ayat 184 Allah berfirman: فَمَن...",
            category: "Artikel"
        },
        {
            id: 8,
            title: "Bagaimana Menghitung Zakat Profesi?",
            date: "Desember 27, 2024",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/489ec32f-b095-4d59-bc1d-6c1a46a80d82.jpg",
            excerpt: "Menurut Fatwa Tarjih, Zakat Profesi adalah hasil dari ijtihad...",
            category: "Artikel"
        },
        {
            id: 9,
            title: "Lazismu Banjarnegara Launching Digital Fundraising pada RAKERDA dan Amil Camp",
            date: "Desember 17, 2024",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/02/da8d3a20-532b-4dec-b884-45dc330486b1.jpg",
            excerpt: "Kebumen, 14-15 Desember 2024 – Lembaga Amil Zakat, Infaq...",
            category: "Kegiatan"
        },
        {
            id: 10,
            title: "Lazismu Banjarnegara Tasharufkan 3600 Paket Sembako",
            date: "Desember 13, 2024",
            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/48096432-a373-43ad-875c-5ef6959bd03d-1.jpg",
            excerpt: "BANJARNEGARA – Lembaga Zakat Infaq dan Shadaqah Muhammadiyah (Lazismu)...",
            category: "Program"
        }
    ];

    const categories = ["Semua", "Bencana", "Laporan", "Program", "Kegiatan", "Artikel"];
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const filteredNews = selectedCategory === "Semua"
        ? newsData
        : newsData.filter(news => news.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
            <Navbar />

            <div className="container mx-auto px-6 lg:px-12 pt-32 pb-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4"
                    >
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-semibold">Berita Terkini</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Berita-berita Lazismu
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Update terbaru kegiatan, program, dan informasi dari Lazismu Banjarnegara
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === category
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.map((news, index) => (
                        <motion.div
                            key={news.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {news.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>{news.date}</span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer">
                                    {news.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {news.excerpt}
                                </p>

                                <button className="flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all group">
                                    <span>Baca Selengkapnya</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                {filteredNews.length > 9 && (
                    <div className="text-center mt-12">
                        <button className="px-8 py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30">
                            Muat Lebih Banyak
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Berita;
