import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { Heart, Sparkles, TrendingUp, Users, ArrowRight, Check } from 'lucide-react';

const Donasi = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navigationState = location.state as { selectedProgram?: string; fromCampaign?: boolean } | null;

    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');
    const [showCampaignNotice, setShowCampaignNotice] = useState(false);

    // Handle pre-selected program from campaign card
    useEffect(() => {
        if (navigationState?.selectedProgram && navigationState?.fromCampaign) {
            // Map campaign title to program ID
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
            setShowCampaignNotice(true);

            // Auto-hide notice after 5 seconds
            setTimeout(() => setShowCampaignNotice(false), 5000);
        }
    }, [navigationState]);

    const quickAmounts = [50000, 100000, 250000, 500000, 1000000];

    const programs = [
        {
            id: 'zakat',
            title: 'Zakat Maal',
            desc: 'Tunaikan zakat harta Anda untuk membersihkan dan mensucikan rezeki.',
            icon: <Sparkles className="w-6 h-6" />,
            color: 'emerald',
            gradient: 'from-emerald-500 to-teal-600'
        },
        {
            id: 'infaq',
            title: 'Infaq Umum',
            desc: 'Sedekah jariyah untuk program pemberdayaan masyarakat berkelanjutan.',
            icon: <Heart className="w-6 h-6" />,
            color: 'orange',
            gradient: 'from-orange-500 to-red-600'
        },
        {
            id: 'pendidikan',
            title: 'Beasiswa Pendidikan',
            desc: 'Bantu anak yatim dan dhuafa meraih mimpi melalui pendidikan berkualitas.',
            icon: <Users className="w-6 h-6" />,
            color: 'blue',
            gradient: 'from-blue-500 to-indigo-600'
        },
        {
            id: 'ekonomi',
            title: 'Pemberdayaan UMKM',
            desc: 'Modal usaha untuk kemandirian ekonomi keluarga prasejahtera.',
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'amber',
            gradient: 'from-amber-500 to-orange-600'
        }
    ];

    const handleDonateNow = () => {
        const amount = customAmount ? parseInt(customAmount.replace(/\D/g, '')) : selectedAmount;

        if (!amount || amount < 10000) {
            alert('Minimal donasi adalah Rp 10.000');
            return;
        }

        if (!selectedProgram) {
            alert('Silakan pilih program donasi terlebih dahulu');
            return;
        }

        navigate('/pembayaran', {
            state: {
                program: programs.find(p => p.id === selectedProgram)?.title || 'Infaq Umum',
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
        if (ribuan) {
            rupiah += (sisa ? '.' : '') + ribuan.join('.');
        }
        return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Campaign Selection Notice */}
            <AnimatePresence>
                {showCampaignNotice && navigationState?.selectedProgram && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="container mx-auto px-6 -mt-8 mb-8 relative z-10"
                    >
                        <div className="max-w-5xl mx-auto bg-linear-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Check className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Campaign Terpilih</h4>
                                    <p className="text-emerald-100 text-sm">
                                        Anda memilih: <span className="font-bold text-white">{navigationState.selectedProgram}</span>
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowCampaignNotice(false)}
                                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="py-30 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-3xl -mr-[300px] -mt-[200px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -ml-[250px] -mb-[150px]" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">

                        {/* Program Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Pilih Pilar Program</h2>
                            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                                Fokuskan bantuan Anda pada salah satu pilar utama Lazismu untuk membantu sesama secara lebih spesifik.
                            </p>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {programs.map((program, index) => (
                                    <motion.button
                                        key={program.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setSelectedProgram(program.id)}
                                        className={`group relative p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col items-center text-center ${selectedProgram === program.id
                                            ? 'border-orange-500 bg-white shadow-xl shadow-orange-100'
                                            : 'border-white bg-white hover:border-gray-100 hover:shadow-lg'
                                            }`}
                                    >
                                        <div className={`w-16 h-16 rounded-2xl mb-4 bg-${program.color}-50 flex items-center justify-center text-${program.color}-600 group-hover:scale-110 transition-transform shadow-sm`}>
                                            {program.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{program.title}</h3>
                                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{program.desc}</p>

                                        {selectedProgram === program.id && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-4 right-4 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center shadow-lg"
                                            >
                                                <Check className="w-4 h-4 text-white" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Amount Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Tentukan Nominal Donasi</h2>

                            {/* Quick Amount Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                                {quickAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => {
                                            setSelectedAmount(amount);
                                            setCustomAmount('');
                                        }}
                                        className={`p-4 rounded-2xl border-2 font-bold transition-all ${selectedAmount === amount && !customAmount
                                            ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-lg shadow-orange-100'
                                            : 'border-gray-100 text-gray-700 hover:border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="text-xs text-gray-400 mb-1">Rp</div>
                                        <div className="text-lg">{(amount / 1000).toFixed(0)}K</div>
                                    </button>
                                ))}
                            </div>

                            {/* Custom Amount Input */}
                            <div className="mb-10">
                                <label className="block text-sm font-bold text-gray-700 mb-3">Atau Masukkan Nominal Lain</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">Rp</span>
                                    <input
                                        type="text"
                                        value={customAmount ? formatRupiah(customAmount) : ''}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value);
                                            setSelectedAmount(null);
                                        }}
                                        placeholder="0"
                                        className="w-full pl-16 pr-6 py-6 text-3xl font-black text-gray-900 bg-gray-50 border-2 border-gray-100 rounded-3xl focus:border-orange-500 focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-3 ml-1">Minimal donasi Rp 10.000</p>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 mb-8 border border-orange-100">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-600 font-medium">Program Terpilih</span>
                                    <span className="font-bold text-gray-900">
                                        {selectedProgram ? programs.find(p => p.id === selectedProgram)?.title : '-'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-orange-200">
                                    <span className="text-gray-600 font-medium">Total Donasi</span>
                                    <span className="text-3xl font-black text-orange-600">
                                        Rp {((customAmount ? parseInt(customAmount.replace(/\D/g, '')) : selectedAmount) || 0).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={handleDonateNow}
                                className="group w-full py-6 bg-orange-600 text-white rounded-3xl font-bold text-lg hover:bg-orange-700 shadow-2xl shadow-orange-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                            >
                                <Heart className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                                Lanjutkan ke Pembayaran
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
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
