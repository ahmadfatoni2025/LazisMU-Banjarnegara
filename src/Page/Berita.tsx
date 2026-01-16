import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Search, Edit, Trash2, LayoutDashboard, Database } from 'lucide-react';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

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
    const navigate = useNavigate();
    const [newsData, setNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        setIsAdmin(!!token);
        fetchNews(token);
    }, []);

    const fetchNews = async (token: string | null) => {
        try {
            const headers: any = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch('http://localhost:3000/api/berita', { headers });
            const data = await res.json();
            setNewsData(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Hapus berita ini?")) return;
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`http://localhost:3000/api/berita_admin/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchNews(token);
        } catch (err) { alert('Gagal hapus'); }
    };

    // Dynamic Categories from Data
    const uniqueCategories = ['Semua', ...new Set(newsData.map(item => item.category).filter(Boolean))];
    const categories = uniqueCategories.map(cat => ({
        name: cat,
        count: cat === 'Semua' ? newsData.length : newsData.filter(n => n.category === cat).length
    }));

    const filteredNews = newsData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-100 selection:text-orange-900">
            <Navbar />

            {/* Header Section */}
            <div className="bg-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-orange-100"
                        >
                            <Database className="w-4 h-4" />
                            Pusat Informasi & Data
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-tight"
                        >
                            Kabar <span className="text-orange-600 relative inline-block">
                                Lazismu
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
                            </span> <br /> Banjarnegara.
                        </motion.h1>
                    </div>

                    {/* Admin Actions */}
                    {isAdmin && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap gap-4 mt-8"
                        >
                            <Link
                                to="/buat-berita"
                                className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition shadow-xl shadow-orange-500/20 flex items-center gap-3"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Buat Berita Baru
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Main Content */}
                    <div className="lg:w-[70%]">
                        {/* Search & Filter Mobile */}
                        <div className="mb-10 lg:hidden space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari berita..."
                                    className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <AnimatePresence>
                                {filteredNews.map((news, index) => (
                                    <FadeInUp key={news.id} delay={index * 0.1} className="h-full">
                                        <div className="group flex flex-col h-full bg-white rounded-[2.5rem] p-4 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 border border-gray-100 relative overflow-hidden">

                                            {/* Status Badge for Admin - Absolute Position */}
                                            {news.status === 'draft' && (
                                                <div className="absolute top-8 right-8 z-30 px-3 py-1 bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                    Draft Mode
                                                </div>
                                            )}

                                            {/* Image */}
                                            <div className="relative overflow-hidden rounded-4xl aspect-4/3 mb-6">
                                                <div className="absolute inset-0 bg-gray-900/20 group-hover:opacity-0 transition-opacity z-10" />
                                                <img
                                                    src={news.image_url || 'https://via.placeholder.com/400x300'}
                                                    alt={news.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                                    }}
                                                />
                                                <div className="absolute bottom-4 left-4 z-20">
                                                    <span className="px-4 py-2 bg-white/90 backdrop-blur text-orange-600 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg">
                                                        {news.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col flex-grow px-2 pb-4">
                                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold uppercase tracking-wide">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {new Date(news.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-orange-600 transition-colors line-clamp-3">
                                                    <Link to={`/berita/${news.id}`}>{news.title}</Link>
                                                </h3>

                                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {news.excerpt}
                                                </p>

                                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                                                    <Link to={`/berita/${news.id}`} className="text-sm font-bold text-gray-900 flex items-center gap-2 group/link">
                                                        Baca Selengkapnya
                                                        <ArrowRight className="w-4 h-4 text-orange-500 group-hover/link:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>

                                                {/* Admin Controls */}
                                                {isAdmin && (
                                                    <div className="mt-6 flex gap-2 pt-4 border-t border-dashed border-gray-200">
                                                        <button
                                                            onClick={() => navigate(`/buat-berita?edit=${news.id}`)}
                                                            className="flex-1 py-3 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-orange-50 hover:text-orange-600 transition flex items-center justify-center gap-2"
                                                        >
                                                            <Edit className="w-3.5 h-3.5" /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(news.id)}
                                                            className="flex-1 py-3 bg-gray-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-600 transition flex items-center justify-center gap-2"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" /> Hapus
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </FadeInUp>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-[30%] space-y-12">
                        {/* Search Desktop */}
                        <div className="hidden lg:block bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <h3 className="font-bold text-xl mb-6">Pencarian</h3>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Cari artikel..."
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-orange-500 focus:outline-none transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors w-5 h-5" />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <h3 className="font-bold text-xl mb-6">Kategori</h3>
                            <div className="space-y-3">
                                {categories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${selectedCategory === cat.name ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <span className="font-bold text-sm">{cat.name}</span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${selectedCategory === cat.name ? 'bg-white/20' : 'bg-gray-200'}`}>
                                            {cat.count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Berita;
