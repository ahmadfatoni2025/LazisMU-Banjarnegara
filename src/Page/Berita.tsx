import { Link } from 'react-router-dom';
import { User, Calendar, ArrowRight, Search, Phone, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import Navbar from '../ui/Navbar';

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
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Navbar />

            {/* Breadcrumb Section */}
            <div className="bg-gray-50 border-b border-gray-100 pt-32 pb-8">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        <span className="hover:text-orange-500 cursor-pointer transition-colors">Lazismu Banjarnegara</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-800">Berita</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Berita Terbaru
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content - News Grid */}
                    <div className="lg:w-[70%]">
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                            {newsData.map((news) => (
                                <div key={news.id} className="group flex flex-col h-full bg-transparent">
                                    {/* Image Wrapper */}
                                    <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-4 bg-gray-100">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm uppercase tracking-wider">
                                                {news.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                                            <Link to={`/berita/${news.id}`}>{news.title}</Link>
                                        </h3>
                                        <p className="text-[15px] leading-relaxed text-gray-600 mb-4 line-clamp-3 text-justify">
                                            {news.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-gray-400 font-semibold mt-auto pt-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                    <User className="w-3 h-3" />
                                                </div>
                                                <span className="uppercase tracking-wide text-[10px]">BY {news.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{news.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

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

                        {/* Help Banner Widget */}
                        <div className="relative rounded-2xl overflow-hidden group shadow-lg">
                            <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/10 transition-colors z-10"></div>
                            <img
                                src="https://lazismubanjarnegara.org/wp-content/uploads/2024/05/bg-donasi.jpg"
                                alt="Donasi"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                <h4 className="text-xl font-bold text-white mb-2">Butuh Bantuan?</h4>
                                <p className="text-xs text-gray-300 mb-4 leading-relaxed">Salurkan donasi terbaik anda melalui Lazismu Kantor Layanan Banjarnegara.</p>
                                <button className="w-full bg-orange-600 hover:bg-orange-500 text-white py-3 rounded font-bold text-sm transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
                                    <Phone className="w-3 h-3" />
                                    Hubungi Kami
                                </button>
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
