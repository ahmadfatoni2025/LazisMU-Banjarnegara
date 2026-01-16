import { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Users, School, HeartPulse, ArrowUpRight, ArrowRight, Edit, Save, X, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactDashboard = () => {
    const containerRef = useRef(null);
    useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ katgori: '', total_jiwa: 0, total_donasi: 0 });

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        setIsAdmin(!!token);
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/statistik');
            const data = await response.json();
            setStats(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            setLoading(false);
        }
    };

    const handleEdit = (item: any) => {
        setEditingId(item.id);
        setEditForm({ katgori: item.katgori, total_jiwa: item.total_jiwa, total_donasi: item.total_donasi });
    };

    const handleSave = async (id: number) => {
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`http://localhost:3000/api/statistik/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });
            if (res.ok) {
                setEditingId(null);
                fetchStats();
            }
        } catch (err) { alert('Gagal update'); }
    };

    const getProgramDetails = (kategori: string) => {
        switch (kategori?.toLowerCase()) {
            case 'pendidikan':
                return { icon: School, color: 'bg-blue-50', textColor: 'text-blue-600', tag: 'Pendidikan', image: "https://muhammadiyah.or.id/wp-content/uploads/2025/05/Lazismu-Luncurkan-Gerakan-Zakat-Nasional-untuk-Pendidikan.jpeg" };
            case 'kesehatan':
                return { icon: HeartPulse, color: 'bg-emerald-50', textColor: 'text-emerald-600', tag: 'Kesehatan', image: "https://pwmjateng.com/wp-content/uploads/2022/08/Lazismu-Blora.jpeg" };
            case 'sosial':
                return { icon: Users, color: 'bg-orange-50', textColor: 'text-orange-600', tag: 'Sosial', image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800" };
            default:
                return { icon: Users, color: 'bg-gray-50', textColor: 'text-gray-600', tag: 'Umum', image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" };
        }
    };

    const formatAmountDisplay = (val: number) => {
        if (val >= 1000000000) return `Rp ${(val / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} M`;
        if (val >= 1000000) return `Rp ${(val / 1000000).toLocaleString('id-ID')} Jt`;
        return `Rp ${val.toLocaleString('id-ID')}`;
    };

    const totalPenerima = stats.reduce((acc, curr: any) => acc + (curr.total_jiwa || 0), 0);

    return (
        <section className="py-24 bg-gray-50 overflow-hidden relative" ref={containerRef}>
            {/* Colorful Background Blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10 mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10 mix-blend-multiply" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-100/30 rounded-full blur-[120px] -z-20" />

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Text & Context */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                                Impact Report 2025
                            </div>

                            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                                Dipercaya oleh <br />
                                <span className="text-orange-600">Ribuan Muzakki.</span>
                            </h2>

                            <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-lg font-medium">
                                Tingkatkan kualitas hidup sesama melalui pengelolaan zakat, infaq, dan sedekah yang transparan, amanah, dan berdampak nyata.
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mb-12">
                                <Link
                                    to="/laporan-keuangan"
                                    className="flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all group"
                                >
                                    Lihat Laporan Lengkap
                                    <ArrowRight className="w-5 h-5 group-hover:text-orange-700" />
                                </Link>
                            </div>

                            <div className="pt-8 border-t border-gray-200">
                                <p className="text-sm font-bold text-gray-900 mb-4">Transparansi Real-time & Terpercaya</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-black text-white flex items-center justify-center text-xs font-bold">
                                            5k+
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <span className="text-orange-600 font-black">4.9/5</span> Rating Kepuasan
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Bento Grid */}
                    <div className="flex flex-col gap-6">

                        {/* Top Card - Main Stat */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 relative group overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                                    <ArrowUpRight className="w-4 h-4" />
                                    Total Penerima
                                </div>
                                {isAdmin && (
                                    <div className="flex gap-2">
                                        {editingId === 1 ? (
                                            <button onClick={() => handleSave(1)}><Save className="w-5 h-5 text-emerald-600" /></button>
                                        ) : (
                                            <button onClick={() => handleEdit(stats.find(s => s.id === 1))}><Edit className="w-5 h-5 text-gray-300 hover:text-gray-900" /></button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="relative z-10">
                                {editingId === 1 ? (
                                    <input
                                        className="text-6xl font-black text-gray-900 w-full bg-gray-50 p-2 rounded-xl"
                                        value={editForm.total_jiwa}
                                        onChange={e => setEditForm({ ...editForm, total_jiwa: parseInt(e.target.value) })}
                                    />
                                ) : (
                                    <h3 className="text-7xl md:text-8xl font-black text-gray-900 tracking-tighter mb-2">
                                        {totalPenerima.toLocaleString('id-ID')}
                                    </h3>
                                )}
                                <p className="text-gray-500 font-medium ml-2">Jiwa Telah Terbantu</p>
                            </div>

                            {/* Decorative Graph Line */}
                            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                                <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 80 C 50 80, 50 20, 100 20 C 150 20, 150 60, 200 60" stroke="currentColor" strokeWidth="20" className="text-emerald-500" />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Card 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2 text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                                        <School className="w-3.5 h-3.5" /> Pendidikan
                                    </div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-1">
                                        {/* Assuming ID 2 is Education, dynamic later or static for demo if data structure varies */}
                                        {stats.filter(s => s.katgori === 'Pendidikan').reduce((acc, curr) => acc + curr.total_jiwa, 0).toLocaleString('id-ID') || '166'}
                                    </div>
                                    <p className="text-gray-400 text-sm font-bold">Penerima Beasiswa</p>
                                </div>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2 text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                                        <HeartPulse className="w-3.5 h-3.5" /> Kesehatan
                                    </div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-1">
                                        {formatAmountDisplay(stats.reduce((acc, curr) => acc + curr.total_donasi, 0))}
                                    </div>
                                    <p className="text-gray-400 text-sm font-bold">Total Penyaluran</p>
                                </div>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ImpactDashboard;
