import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { Heart, Sparkles, TrendingUp, Users, ArrowRight, Check, Plus, Edit, Trash2, LayoutDashboard } from 'lucide-react';

const iconMap: any = {
    Heart: <Heart className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />
};

const Donasi = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navigationState = location.state as { selectedProgram?: string; fromCampaign?: boolean } | null;

    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');
    const [programs, setPrograms] = useState<any[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newProgram, setNewProgram] = useState({ id: '', title: '', desc: '', icon: 'Heart', color: 'orange', gradient: '' });

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        setIsAdmin(!!token);
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/programs');
            const data = await res.json();
            setPrograms(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (navigationState?.selectedProgram && navigationState?.fromCampaign && programs.length > 0) {
            const programMapping: { [key: string]: string } = {
                'PEDULI BANJIR BANDANG SUMATERA': 'infaq',
                'ANAK ASUH': 'pendidikan',
                'KADO RAMADHAN': 'infaq',
                'YATIM HEBAT': 'pendidikan',
                'ZAKAT FITRAH': 'zakat',
                'TEBAR TAKJIL RAMADHAN': 'infaq'
            };
            const programId = programMapping[navigationState.selectedProgram] || 'infaq';
            setSelectedProgram(programId);
        }
    }, [navigationState, programs]);

    const quickAmounts = [50000, 100000, 250000, 500000, 1000000];

    const handleEditProgram = (program: any) => {
        setNewProgram(program);
        setIsEditing(true);
        setShowAddModal(true);
    };

    const handleSaveProgram = async () => {
        const token = localStorage.getItem('admin_token');
        const url = isEditing
            ? `http://localhost:3000/api/programs_admin/${newProgram.id}`
            : 'http://localhost:3000/api/programs_admin';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newProgram)
            });
            if (res.ok) {
                fetchPrograms();
                setShowAddModal(false);
                setIsEditing(false);
                setNewProgram({ id: '', title: '', desc: '', icon: 'Heart', color: 'orange', gradient: '' });
            }
        } catch (err) { alert('Gagal menyimpan program'); }
    };

    const handleDeleteProgram = async (id: string) => {
        if (!window.confirm('Hapus pilar program ini?')) return;
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`http://localhost:3000/api/programs_admin/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchPrograms();
        } catch (err) { alert('Gagal hapus'); }
    };

    const handleDonateNow = () => {
        const amount = customAmount ? parseInt(customAmount.replace(/\D/g, '')) : selectedAmount;
        if (!amount || amount < 10000) { alert('Minimal donasi adalah Rp 10.000'); return; }
        if (!selectedProgram) { alert('Silakan pilih program donasi terlebih dahulu'); return; }

        navigate('/pembayaran', {
            state: {
                program: programs.find(p => p.id === selectedProgram)?.title || 'Infaq Umum',
                campaignTitle: navigationState?.selectedProgram || null,
                amount: amount,
                isAnonymous: false
            }
        });
    };

    const formatRupiah = (value: string) => {
        const numberString = value.replace(/[^,\d]/g, '').toString();
        const split = numberString.split(',');
        const sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
        if (ribuan) rupiah += (sisa ? '.' : '') + ribuan.join('.');
        return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <section className="py-30 relative overflow-hidden">
                {/* Decorative backgrounds */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-3xl -mr-[300px] -mt-[200px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -ml-[250px] -mb-[150px]" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">

                        {/* Admin Toolbar */}
                        {isAdmin && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-12 p-6 bg-gray-900 text-white rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/20">
                                        <LayoutDashboard className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Admin: Kelola Pilar Donasi</h3>
                                        <p className="text-gray-400 text-xs">Atur kategori bantuan utama yang tampil di website.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setShowAddModal(true); setIsEditing(false); setNewProgram({ id: '', title: '', desc: '', icon: 'Heart', color: 'orange', gradient: '' }); }}
                                    className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-sm hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 flex items-center gap-2 relative z-10"
                                >
                                    <Plus className="w-5 h-5" />
                                    Tambah Pilar Program
                                </button>
                            </motion.div>
                        )}

                        {/* Program Modal */}
                        <AnimatePresence>
                            {showAddModal && (
                                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 overflow-hidden relative shadow-2xl"
                                    >
                                        <h3 className="text-2xl font-black mb-6">{isEditing ? 'Edit Pilar' : 'Tambah Pilar Baru'}</h3>
                                        <div className="space-y-5">
                                            {!isEditing && (
                                                <div>
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">ID Unik (e.g. zakat-maal)</label>
                                                    <input
                                                        type="text" placeholder="ID Program..."
                                                        className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:outline-none transition-all"
                                                        value={newProgram.id}
                                                        onChange={e => setNewProgram({ ...newProgram, id: e.target.value })}
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Judul Program</label>
                                                <input
                                                    type="text" placeholder="Masukkan Judul..."
                                                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:outline-none transition-all"
                                                    value={newProgram.title}
                                                    onChange={e => setNewProgram({ ...newProgram, title: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Deskripsi</label>
                                                <textarea
                                                    placeholder="Jelaskan pilar ini..."
                                                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:outline-none h-24 transition-all"
                                                    value={newProgram.desc}
                                                    onChange={e => setNewProgram({ ...newProgram, desc: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Ikon</label>
                                                    <select
                                                        className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:outline-none"
                                                        value={newProgram.icon}
                                                        onChange={e => setNewProgram({ ...newProgram, icon: e.target.value })}
                                                    >
                                                        <option value="Heart">Ikon Love (Sedekah)</option>
                                                        <option value="Sparkles">Ikon Zakat</option>
                                                        <option value="Users">Ikon Sosial</option>
                                                        <option value="TrendingUp">Ikon Ekonomi</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 mb-2 block">Aksen Warna</label>
                                                    <select
                                                        className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:outline-none"
                                                        value={newProgram.color}
                                                        onChange={e => setNewProgram({ ...newProgram, color: e.target.value })}
                                                    >
                                                        <option value="orange">Oranye</option>
                                                        <option value="emerald">Hijau</option>
                                                        <option value="blue">Biru</option>
                                                        <option value="amber">Kuning</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 mt-10">
                                            <button
                                                onClick={() => { setShowAddModal(false); setIsEditing(false); }}
                                                className="grow py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                onClick={handleSaveProgram}
                                                className="grow py-4 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-colors"
                                            >
                                                Simpan Perubahan
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Program Grid */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
                            <h2 className="text-4xl font-black text-gray-900 mb-4 text-center tracking-tight">Pilih Pilar <span className="text-orange-600">Kebaikan.</span></h2>
                            <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto font-medium">Bantu kami mewujudkan dampak nyata melalui berbagai pilar program unggulan Lazismu Banjarnegara.</p>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {programs.map((program, index) => (
                                    <motion.div key={program.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="relative group">
                                        <button
                                            onClick={() => setSelectedProgram(program.id)}
                                            className={`w-full h-full relative p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center group-hover:transform group-hover:scale-[1.02] ${selectedProgram === program.id ? 'border-orange-500 bg-white shadow-2xl shadow-orange-100' : 'border-white bg-white hover:border-gray-100 hover:shadow-xl'}`}
                                        >
                                            <div className={`w-20 h-20 rounded-3xl mb-6 bg-${program.color}-50 flex items-center justify-center text-${program.color}-600 shadow-sm transition-transform duration-500 group-hover:rotate-6`}>
                                                {iconMap[program.icon] || <Heart />}
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 mb-3">{program.title}</h3>
                                            <p className="text-gray-400 text-xs leading-relaxed font-medium line-clamp-2">{program.desc}</p>
                                            {selectedProgram === program.id && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-6 right-6 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center shadow-lg"><Check className="w-5 h-5 text-white" /></motion.div>
                                            )}
                                        </button>
                                        {isAdmin && (
                                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                                <button onClick={(e) => { e.stopPropagation(); handleEditProgram(program); }} className="p-3 bg-gray-900 text-white rounded-full shadow-xl hover:bg-orange-600 transition-colors"><Edit className="w-4 h-4" /></button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDeleteProgram(program.id); }} className="p-3 bg-red-600 text-white rounded-full shadow-xl hover:bg-red-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Amount Section */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-[3rem] p-10 lg:p-16 shadow-2xl shadow-gray-200/40 border border-gray-100">
                            <h2 className="text-3xl font-black text-gray-900 mb-12 tracking-tight">Tentukan Nominal Donasi</h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
                                {quickAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                                        className={`p-8 rounded-3xl border-2 font-black transition-all ${selectedAmount === amount && !customAmount ? 'border-orange-500 bg-orange-50 text-orange-600 scale-105 shadow-xl shadow-orange-100' : 'border-gray-50 text-gray-700 hover:border-gray-100 hover:bg-gray-50'}`}
                                    >
                                        <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Nominal</div>
                                        <div className="text-2xl">{(amount / 1000).toFixed(0)}K</div>
                                    </button>
                                ))}
                            </div>

                            <div className="mb-12">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Atau Masukkan Nominal Lain</label>
                                <div className="relative group">
                                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-300 font-black text-4xl transition-colors group-focus-within:text-orange-500">Rp</span>
                                    <input
                                        type="text"
                                        value={customAmount ? formatRupiah(customAmount) : ''}
                                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                                        placeholder="0"
                                        className="w-full pl-24 pr-10 py-12 text-6xl font-black text-gray-900 bg-gray-50 border-2 border-gray-50 rounded-[2.5rem] focus:border-orange-500 focus:outline-none focus:bg-white transition-all placeholder:text-gray-200"
                                    />
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-12 mb-12 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-[80px] -mr-40 -mt-40 group-hover:bg-orange-600/20 transition-all" />
                                <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                                    <div className="text-center md:text-left">
                                        <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Pilar Program</div>
                                        <div className="text-2xl font-black text-white flex items-center justify-center md:justify-start gap-4">
                                            {selectedProgram ? <><div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500">{iconMap[programs.find(p => p.id === selectedProgram)?.icon]}</div>{programs.find(p => p.id === selectedProgram)?.title}</> : <span className="text-gray-600 italic">Pilih Pilar Bantuan...</span>}
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-px h-20 bg-white/10" />
                                    <div className="text-center md:text-right">
                                        <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Total Ringkasan</div>
                                        <div className="text-6xl font-black text-orange-500 tracking-tighter">Rp {((customAmount ? parseInt(customAmount.replace(/\D/g, '')) : selectedAmount) || 0).toLocaleString('id-ID')}</div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleDonateNow} className="group w-full py-10 bg-orange-600 text-white rounded-[2rem] font-black text-2xl hover:bg-orange-700 shadow-2xl shadow-orange-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-5">
                                <Heart className="w-10 h-10 fill-current group-hover:scale-125 transition-transform duration-500" /> Lanjutkan Pembayaran <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform duration-500" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Donasi;
