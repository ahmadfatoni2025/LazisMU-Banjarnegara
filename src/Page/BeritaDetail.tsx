import { useParams, Link } from 'react-router-dom';
import { Eye, Clock, Share2, Bookmark, ChevronRight } from 'lucide-react';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BeritaDetail = () => {
    const { slug } = useParams();
    const [newsItem, setNewsItem] = useState<any>(null);
    const [relatedNews, setRelatedNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const token = localStorage.getItem('admin_token');
                const headers: any = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const response = await fetch(`http://localhost:3000/api/berita`, { headers });
                const allNews = await response.json();

                const currentId = parseInt(slug || '0');
                const found = allNews.find((n: any) => n.id === currentId);

                if (found) {
                    setNewsItem(found);
                    setRelatedNews(allNews.filter((n: any) => n.id !== currentId).slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-orange-600 rounded-full animate-spin"></div>
                <p className="text-gray-400 font-medium text-sm tracking-wide animate-pulse">Memuat konten...</p>
            </div>
        </div>
    );

    if (!newsItem) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="text-center">
                <h2 className="text-6xl font-black text-gray-200 mb-2">404</h2>
                <p className="text-gray-900 font-bold text-xl mb-8">Berita tidak ditemukan.</p>
                <Link to="/berita" className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all hover:px-10 duration-300">
                    Kembali ke Berita
                </Link>
            </div>
        </div>
    );

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
            <Navbar />

            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

                    {/* Breadcrumbs - Minimalist */}
                    <nav className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-12">
                        <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                        <Link to="/berita" className="hover:text-orange-600 transition-colors">Berita</Link>
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                        <span className="text-gray-900 line-clamp-1 border-b-2 border-orange-500 pb-0.5">{newsItem.title}</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                        {/* Main Content Column */}
                        <div className="lg:w-[60%]">

                            {/* Header Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-black uppercase tracking-wider border border-orange-100">
                                        {newsItem.category || 'Berita'}
                                    </span>
                                    <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">•</span>
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{formatDate(newsItem.created_at)}</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] mb-8 tracking-tight">
                                    {newsItem.title}
                                </h1>

                                {/* Author Block */}
                                <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden ring-2 ring-white shadow-lg">
                                        <img src={`https://ui-avatars.com/api/?name=${newsItem.author || 'Admin'}&background=random`} alt="Author" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Penulis</p>
                                        <p className="text-sm font-black text-gray-900">{newsItem.author || 'Tim Redaksi'}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Featured Image - Interactive */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 mb-12 group relative aspect-video"
                            >
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700 z-10" />
                                <img
                                    src={newsItem.image_url || 'https://via.placeholder.com/800x600'}
                                    alt={newsItem.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                                    }}
                                />
                            </motion.div>

                            {/* Article Content */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="prose prose-lg md:prose-xl max-w-none text-gray-600 
                                prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:mt-10 prose-headings:mb-5
                                prose-p:leading-8 prose-p:text-gray-600 prose-p:font-medium prose-p:mb-6
                                prose-ul:list-disc prose-ul:pl-5 prose-ul:my-6
                                prose-li:marker:text-orange-600 prose-li:mb-2 prose-li:text-gray-600 prose-li:font-medium
                                prose-a:text-orange-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-orange-700 
                                prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-10 prose-img:w-full
                                prose-strong:text-gray-900 prose-strong:font-black
                                prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-gray-50 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:text-gray-800 prose-blockquote:font-bold prose-blockquote:not-italic prose-blockquote:shadow-sm
                                prose-hr:border-gray-200 prose-hr:my-12"
                            >
                                <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                            </motion.div>

                            {/* Footer Tags */}
                            <div className="mt-16 pt-8 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Berita', 'Lazismu', 'Terbaru', 'Update'].map((tag, i) => (
                                        <span key={i} className="px-5 py-2 bg-gray-50 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-gray-900 hover:text-white cursor-pointer transition-all duration-300"># {tag}</span>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Sidebar Column (Sticky) */}
                        <div className="lg:w-[35%] relative hidden lg:block">
                            <div className="sticky top-32 space-y-8">

                                {/* Quick Stats Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="bg-gray-50 rounded-3xl p-8 border border-gray-100/50 backdrop-blur-xl"
                                >
                                    <h3 className="font-black text-gray-900 mb-6 text-lg">Informasi Berita</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors shadow-sm">
                                                    <Eye className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-500">Dilihat</span>
                                            </div>
                                            <span className="font-black text-gray-900">1.2k</span>
                                        </div>
                                        <div className="w-full h-px bg-gray-200/50" />
                                        <div className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors shadow-sm">
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-500">Estimasi Baca</span>
                                            </div>
                                            <span className="font-black text-gray-900">5 Menit</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-col gap-3">
                                        <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-gray-900/20">
                                            <Share2 className="w-4 h-4" />
                                            Bagikan
                                        </button>
                                        <button className="w-full py-4 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3">
                                            <Bookmark className="w-4 h-4" />
                                            Simpan
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Related News */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-black text-gray-900 text-lg">Berita Lainnya</h3>
                                        <Link to="/berita" className="text-xs font-bold text-orange-600 hover:text-orange-700">LIHAT SEMUA</Link>
                                    </div>
                                    <div className="space-y-6">
                                        {relatedNews.map((related, idx) => (
                                            <Link to={`/berita/${related.id}`} key={idx} className="group flex gap-5 items-start">
                                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-200 shrink-0 relative">
                                                    <img
                                                        src={related.image_url || 'https://via.placeholder.com/150'}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                                                        }}
                                                    />
                                                </div>
                                                <div className="py-1">
                                                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-2 block">{formatDate(related.created_at)}</span>
                                                    <h4 className="font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                                                        {related.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BeritaDetail;
