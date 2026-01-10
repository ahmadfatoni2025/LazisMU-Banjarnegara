
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, CreditCard, QrCode, Banknote, BadgeCheck, FileText, Users } from 'lucide-react';
import FadeInUp from './FadeInUp';

const SalurkanDonasi = () => {
    const navigate = useNavigate();

    // Donation form state
    const [selectedProgram, setSelectedProgram] = useState('Peduli Lingkungan : SAMOSIR');
    const [donationAmount, setDonationAmount] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const donationAmounts = [
        { amount: 25000, popular: false },
        { amount: 50000, popular: false },
        { amount: 100000, popular: true },
        { amount: 250000, popular: false },
        { amount: 500000, popular: false },
    ];

    const handleQuickAmount = (amount: number) => {
        setDonationAmount(amount.toString());
    };

    const handleDonationSubmit = () => {
        const amount = parseInt(donationAmount);

        if (!amount || amount < 10000) {
            alert('Minimal donasi adalah Rp 10.000');
            return;
        }

        navigate('/pembayaran', {
            state: {
                program: selectedProgram,
                amount: amount,
                isAnonymous: isAnonymous
            }
        });
    };

    const formatCurrency = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        return numericValue;
    };

    const displayCurrency = (value: string) => {
        if (!value) return '';
        const num = parseInt(value);
        if (isNaN(num)) return '';
        return new Intl.NumberFormat('id-ID').format(num);
    };

    // Parallax logic
    const donateSectionRef = useRef(null);
    const { scrollYProgress: donateScroll } = useScroll({
        target: donateSectionRef,
        offset: ["start end", "end start"]
    });

    const donateImageY = useTransform(donateScroll, [0, 1], ["-10%", "10%"]);
    const donateDecor1Y = useTransform(donateScroll, [0, 1], ["-20%", "20%"]);
    const donateDecor2Y = useTransform(donateScroll, [0, 1], ["20%", "-20%"]);

    return (
        <section ref={donateSectionRef} id="donasi-section" className="py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 relative overflow-hidden scroll-mt-20">
            {/* Decorative Background Elements Parallax */}
            <motion.div style={{ y: donateDecor1Y }} className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></motion.div>
            <motion.div style={{ y: donateDecor2Y }} className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></motion.div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <FadeInUp className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4"
                    >
                        <Heart className="w-4 h-4" fill="currentColor" />
                        <span className="text-sm font-semibold">Berbagi Kebaikan</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Salurkan Donasi
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Setiap rupiah yang Anda berikan adalah harapan baru bagi mereka yang membutuhkan
                    </p>
                </FadeInUp>

                {/* Main Content - Split Layout */}
                <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
                    {/* Left Side - Inspiring Image & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative lg:w-1/2 w-full"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 mb-6">
                            {/* Parallax Image Container */}
                            <div className="h-[500px] overflow-hidden">
                                <motion.img
                                    style={{ y: donateImageY, scale: 1.1 }}
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
                                    alt="Berbagi Kebaikan"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-900/50 to-transparent"></div>
                            {/* Overlay Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-3">Bersama Membangun Harapan</h3>
                                <p className="text-orange-100 mb-6 leading-relaxed">
                                    Donasi Anda akan disalurkan kepada yang berhak menerimanya dengan transparan dan amanah
                                </p>
                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                                        <div className="text-3xl font-bold mb-1">5,007+</div>
                                        <div className="text-sm text-orange-100">Penerima Manfaat</div>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                                        <div className="text-3xl font-bold mb-1">3.2M+</div>
                                        <div className="text-sm text-orange-100">Total Donasi</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-20 blur-2xl -z-10"></div>
                    </motion.div>

                    {/* Right Side - Donation Form */}
                    <FadeInUp delay={0.2} className="w-full lg:w-1/2">
                        <div className="bg-white rounded-3xl shadow-2xl shadow-orange-500/10 p-8 lg:p-10 border border-gray-100">
                            {/* Program Selection */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Pilih Program Donasi
                                </label>
                                <select
                                    value={selectedProgram}
                                    onChange={(e) => setSelectedProgram(e.target.value)}
                                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                >
                                    <option>Peduli Lingkungan : SAMOSIR</option>
                                    <option>Pendidikan Anak Yatim</option>
                                    <option>Kesehatan Masyarakat</option>
                                    <option>Bantuan Bencana Alam</option>
                                    <option>Ekonomi Produktif</option>
                                </select>
                            </div>

                            {/* Amount Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Nominal Donasi
                                </label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-bold">Rp</span>
                                    <input
                                        type="text"
                                        value={displayCurrency(donationAmount)}
                                        onChange={(e) => setDonationAmount(formatCurrency(e.target.value))}
                                        placeholder="0"
                                        className="w-full py-6 pl-16 pr-6 text-4xl font-bold text-gray-900 placeholder-gray-300 outline-none bg-gradient-to-br from-gray-50 to-orange-50/30 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Quick Amount Buttons */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Donasi Terbaik Anda
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {donationAmounts.map((item, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleQuickAmount(item.amount)}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative py-4 px-3 rounded-xl text-sm font-bold transition-all ${item.popular
                                                ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 hover:shadow-md'
                                                }`}
                                        >
                                            {item.popular && (
                                                <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                    Populer
                                                </span>
                                            )}
                                            Rp {(item.amount / 1000)}k
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Personal Info Toggle */}
                            <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isAnonymous}
                                        onChange={(e) => setIsAnonymous(e.target.checked)}
                                        className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Sembunyikan nama saya (Donasi Anonim)</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                onClick={handleDonationSubmit}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-5 rounded-2xl font-bold text-lg hover:from-orange-700 hover:to-orange-600 transition-all shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 group"
                            >
                                <span>Donasi Sekarang</span>
                                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
                            </motion.button>

                            {/* Payment Methods */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-center gap-4 text-gray-400">
                                    <span className="text-xs font-semibold uppercase tracking-widest">Metode Pembayaran</span>
                                </div>
                                <div className="flex items-center justify-center gap-6 mt-4 opacity-60 hover:opacity-100 transition-opacity">
                                    <CreditCard className="w-8 h-8 text-gray-600" />
                                    <QrCode className="w-8 h-8 text-gray-600" />
                                    <Banknote className="w-8 h-8 text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </FadeInUp>
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                >
                    {[
                        { icon: <BadgeCheck className="w-6 h-6" />, title: "Tersertifikasi", desc: "Lembaga Amil Zakat Resmi" },
                        { icon: <FileText className="w-6 h-6" />, title: "Transparan", desc: "Laporan Keuangan Terbuka" },
                        { icon: <Users className="w-6 h-6" />, title: "Terpercaya", desc: "5000+ Donatur Aktif" }
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">{item.title}</div>
                                <div className="text-sm text-gray-500">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SalurkanDonasi;