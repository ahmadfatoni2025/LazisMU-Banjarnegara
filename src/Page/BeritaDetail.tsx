import { useParams, Link } from 'react-router-dom';
import { User, Calendar, Folder, Search, Phone, Instagram, Facebook, Youtube, Twitter, Tag, Share2, Eye } from 'lucide-react';
import Navbar from '../ui/Navbar';
import { useState, useEffect } from 'react';

// Mock data shared with Berita.tsx (In a real app, this would be in a separate file or API)
const newsData = [
    {
        id: 1,
        slug: "tim-sar-muhammadiyah-cari-korban-longsor",
        title: "Tim SAR Muhammadiyah Beserta SAR Gabungan Terus Berupaya Mencari Korban Longsor",
        date: "Januari 24, 2025",
        author: "Administrator",
        image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800",
        excerpt: "Proses pencarian korban longsor di Desa Kasimpar, Kecamatan Petungkriyono terus dilakukan dengan intensif...",
        content: `
            <p><strong>PEKALONGAN</strong> – Tim SAR Muhammadiyah (MDMC) bersama dengan tim SAR gabungan terus melakukan upaya pencarian korban bencana tanah longsor yang terjadi di Desa Kasimpar, Kecamatan Petungkriyono, Kabupaten Pekalongan. Hingga hari ketiga pencarian, tim masih berfokus pada titik-titik yang diduga menjadi lokasi tertimbunnya korban.</p>
            
            <p>Koordinator lapangan MDMC Jawa Tengah, dalam keterangan persnya menyatakan bahwa kondisi medan yang terjal dan cuaca yang tidak menentu menjadi kendala utama dalam proses pencarian. "Kami mengerahkan seluruh potensi yang ada, termasuk relawan dari berbagai daerah terdekat untuk membantu proses evakuasi," ujarnya.</p>

            <p>Bencana longsor ini dipicu oleh curah hujan tinggi yang mengguyur wilayah pegunungan tersebut selama tiga hari berturut-turut. Selain menimbun beberapa rumah warga, longsor juga memutus akses jalan utama desa, sehingga menyulitkan distribusi bantuan logistik.</p>

            <h3>Respon Cepat Lazismu</h3>
            <p>Sementara itu, Lazismu Pekalongan telah mendirikan dapur umum dan posko kesehatan tak jauh dari lokasi kejadian. Bantuan logistik berupa makanan siap saji, selimut, dan obat-obatan telah didistribusikan kepada warga yang terdampak dan mengungsi di tempat yang lebih aman.</p>

            <blockquote class="italic border-l-4 border-orange-500 pl-4 py-2 my-4 bg-gray-50 text-gray-700">
                "Kami mengajak seluruh masyarakat untuk turut mendoakan agar proses pencarian berjalan lancar dan para relawan senantiasa diberikan kesehatan serta keselamatan dalam menjalankan tugas kemanusiaan ini."
            </blockquote>

            <p>Pencarian akan terus dilakukan hingga batas waktu tanggap darurat yang ditentukan oleh pemerintah daerah setempat. Masyarakat dihimbau untuk tetap waspada terhadap potensi longsor susulan mengingat curah hujan yang masih cukup tinggi.</p>
        `,
        category: "Bencana",
        tags: ["Bencana Alam", "Longsor", "MDMC", "Relawan"]
    },
    {
        id: 2,
        slug: "situation-report-bencana-banjarnegara",
        title: "SITUATION REPORT: Bencana Alam Banjarnegara",
        date: "Januari 23, 2025",
        author: "Administrator",
        image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/df9a9c3d-4bc6-4cc3-9cd9-7a3fe254917e.jpg",
        excerpt: "Dampak bencana tanah longsor dan banjir di Kecamatan Kalibening menjadi perhatian utama tim respon cepat...",
        content: "<p>Konten lengkap laporan situasi bencana alam di Banjarnegara...</p>",
        category: "Laporan",
        tags: ["Sitrep", "Bencana", "Banjarnegara"]
    },
    // ... add more mock data as needed to match existing IDs if necessary
];

const categories = [
    { name: "Berita", count: 12 },
    { name: "Artikel", count: 5 },
    { name: "Program", count: 8 },
    { name: "Laporan", count: 3 },
    { name: "Video", count: 4 },
];

const BeritaDetail = () => {
    const { slug } = useParams();
    const [newsItem, setNewsItem] = useState(newsData[0]); // Default to first item if not found

    useEffect(() => {
        // Find news item by ID or Slug (using logic for demo purposes)
        // In a real app, fetch from API based on slug
        const found = newsData.find(n => n.slug === slug || n.id.toString() === slug);
        if (found) {
            setNewsItem(found);
        }
        window.scrollTo(0, 0);
    }, [slug]);

    if (!newsItem) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Navbar />

            {/* Breadcrumb - Clean & Simple */}
            <div className="bg-gray-50 border-b border-gray-100 pt-32 pb-4">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
                        <span className="text-gray-300">/</span>
                        <Link to="/berita" className="hover:text-orange-500 transition-colors">Berita</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-400">{newsItem.category}</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-800 line-clamp-1 max-w-[200px] md:max-w-none">{newsItem.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content Article */}
                    <div className="lg:w-[70%]">
                        {/* Article Header */}
                        <div className="mb-8">
                            <span className="inline-block bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm uppercase tracking-wider mb-4">
                                {newsItem.category}
                            </span>
                            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                                {newsItem.title}
                            </h1>

                            {/* Meta Data Row */}
                            <div className="flex items-center flex-wrap gap-4 md:gap-6 border-b border-gray-100 pb-6 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Penulis</span>
                                        <span className="text-xs font-bold text-gray-800 uppercase">{newsItem.author}</span>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-gray-100 hidden md:block"></div>
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                    <Calendar className="w-4 h-4 text-orange-400" />
                                    <span>{newsItem.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide ml-auto">
                                    <Eye className="w-4 h-4 text-gray-300" />
                                    <span>1.2K Views</span>
                                </div>
                            </div>

                            {/* Social Share Top */}
                            <div className="flex items-center gap-2 mb-8">
                                <span className="text-xs font-bold text-gray-400 uppercase mr-2">Share:</span>
                                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                    <button key={i} className="w-8 h-8 rounded-full bg-blue-50 hover:bg-orange-500 text-blue-600 hover:text-white flex items-center justify-center transition-all duration-300">
                                        <Icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-10 group">
                            <img
                                src={newsItem.image}
                                alt={newsItem.title}
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none text-gray-600 prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-orange-600 hover:prose-a:text-orange-700">
                            {/* Rendering HTML content safely */}
                            <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <div className="flex flex-wrap items-center gap-2">
                                <Tag className="w-4 h-4 text-gray-400 transform rotate-90" />
                                {newsItem.tags?.map((tag, idx) => (
                                    <span key={idx} className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Author Bio Box */}
                        <div className="mt-12 bg-gray-50 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                                <User className="w-8 h-8 text-orange-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg mb-2">About {newsItem.author}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    Administrator resmi Lazismu Banjarnegara. Memberikan informasi terkini seputar kegiatan, laporan, dan program-program keumatan.
                                </p>
                                <div className="flex justify-center md:justify-start gap-3">
                                    <span className="text-xs font-bold text-orange-500 cursor-pointer uppercase hover:underline">View all posts</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links (Next/Prev) */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-6 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors group cursor-pointer text-left">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2 group-hover:text-orange-500">Previous Post</span>
                                <h5 className="font-bold text-gray-800 line-clamp-2 text-sm">Laporan Tahunan Lazismu 2023</h5>
                            </div>
                            <div className="p-6 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors group cursor-pointer text-right">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2 group-hover:text-orange-500">Next Post</span>
                                <h5 className="font-bold text-gray-800 line-clamp-2 text-sm">Penyaluran Beasiswa Mentari 2025</h5>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Styled Like Reference */}
                    <div className="lg:w-[30%] space-y-10">
                        {/* Search Widget */}
                        <div className="bg-white rounded-xl">
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
                                {newsData.slice(0, 3).map((item) => (
                                    <Link to={`/berita/${item.id}`} key={item.id} className="flex gap-4 group cursor-pointer border-b border-gray-50 pb-4 last:border-0">
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
                                    </Link>
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
                    </div>
                </div>
            </div>

            {/* Footer Separator */}
            <div className="border-t border-gray-100 mt-12"></div>
        </div>
    );
};

export default BeritaDetail;
