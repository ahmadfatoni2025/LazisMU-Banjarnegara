import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Check,
    QrCode,
    Copy,
    Clock,
    AlertCircle,
    CreditCard,
    Wallet,
    Smartphone,
    Building2,
    ChevronRight,
    Shield
} from 'lucide-react';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

interface DonationData {
    program: string;
    amount: number;
    isAnonymous: boolean;
}

const BANKS = [
    { id: 'bsi', name: 'BSI', fullName: 'Bank Syariah Indonesia', code: '451', color: 'emerald' },
    { id: 'bri', name: 'BRI', fullName: 'Bank Rakyat Indonesia', code: '002', color: 'blue' },
    { id: 'mandiri', name: 'Mandiri', fullName: 'Bank Mandiri', code: '008', color: 'indigo' },
    { id: 'bca', name: 'BCA', fullName: 'Bank Central Asia', code: '014', color: 'sky' },
    { id: 'muamalat', name: 'Muamalat', fullName: 'Bank Muamalat', code: '147', color: 'teal' },
];

const EWALLETS = [
    { id: 'gopay', name: 'GoPay', color: 'emerald' },
    { id: 'ovo', name: 'OVO', color: 'purple' },
    { id: 'dana', name: 'DANA', color: 'blue' },
    { id: 'shopeepay', name: 'ShopeePay', color: 'orange' },
    { id: 'qris', name: 'QRIS', color: 'gray' }
];

const Pembayaran = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const donationData = location.state as DonationData;

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Data Diri', 'Metode Bayar', 'Konfirmasi'];

    const [donorInfo, setDonorInfo] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        isAnonymous: donationData?.isAnonymous || false
    });
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [countdown, setCountdown] = useState(3600);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (activeStep === 2) {
            const timer = setInterval(() => setCountdown(p => Math.max(0, p - 1)), 1000);
            return () => clearInterval(timer);
        }
    }, [activeStep]);

    const handleNext = () => {
        if (activeStep === 0) {
            if (!donorInfo.isAnonymous && (!donorInfo.name || !donorInfo.email || !donorInfo.phone)) {
                alert('Mohon lengkapi data diri Anda');
                return;
            }
            if (donorInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email)) {
                alert('Format email tidak valid');
                return;
            }
        }
        if (activeStep === 1 && !selectedPayment) {
            alert('Silakan pilih metode pembayaran');
            return;
        }
        setActiveStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl border border-orange-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Donasi Anonim</h4>
                                    <p className="text-sm text-gray-500">Sembunyikan identitas Anda dari publik</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={donorInfo.isAnonymous}
                                        onChange={e => setDonorInfo({ ...donorInfo, isAnonymous: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-500"></div>
                                </label>
                            </div>
                        </div>

                        {!donorInfo.isAnonymous && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Nama Lengkap *</label>
                                    <input
                                        type="text"
                                        value={donorInfo.name}
                                        onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none focus:bg-white transition-all"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Email *</label>
                                    <input
                                        type="email"
                                        value={donorInfo.email}
                                        onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none focus:bg-white transition-all"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">WhatsApp *</label>
                                    <input
                                        type="tel"
                                        value={donorInfo.phone}
                                        onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none focus:bg-white transition-all"
                                        placeholder="08123456789"
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Doa / Pesan (Opsional)</label>
                            <textarea
                                value={donorInfo.message}
                                onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                                className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none focus:bg-white h-32 resize-none transition-all"
                                placeholder="Tuliskan doa atau harapan baik Anda..."
                            />
                        </div>
                    </motion.div>
                );
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-10"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Building2 className="w-5 h-5 text-gray-400" />
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Transfer Bank</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {BANKS.map((bank) => (
                                    <button
                                        key={bank.id}
                                        onClick={() => setSelectedPayment(bank)}
                                        className={`group relative p-5 rounded-2xl border-2 transition-all text-left overflow-hidden ${selectedPayment?.id === bank.id
                                                ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-100'
                                                : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-md'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl bg-${bank.color}-50 flex items-center justify-center font-black text-${bank.color}-600 text-xs border border-${bank.color}-100`}>
                                                {bank.name}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-900">{bank.fullName}</div>
                                                <div className="text-xs text-gray-400 font-medium">Kode: {bank.code}</div>
                                            </div>
                                            {selectedPayment?.id === bank.id && (
                                                <Check className="w-5 h-5 text-orange-500" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Smartphone className="w-5 h-5 text-gray-400" />
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">E-Wallet & QRIS</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {EWALLETS.map((ewallet) => (
                                    <button
                                        key={ewallet.id}
                                        onClick={() => setSelectedPayment(ewallet)}
                                        className={`group relative p-5 rounded-2xl border-2 transition-all text-left overflow-hidden ${selectedPayment?.id === ewallet.id
                                                ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-100'
                                                : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-md'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl bg-${ewallet.color}-50 flex items-center justify-center`}>
                                                {ewallet.id === 'qris' ? (
                                                    <QrCode className={`w-6 h-6 text-${ewallet.color}-600`} />
                                                ) : (
                                                    <Wallet className={`w-6 h-6 text-${ewallet.color}-600`} />
                                                )}
                                            </div>
                                            <div className="flex-1 font-bold text-gray-900">{ewallet.name}</div>
                                            {selectedPayment?.id === ewallet.id && (
                                                <Check className="w-5 h-5 text-orange-500" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                const vaNumber = "880899283723";
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran Dibuat!</h3>
                            <p className="text-gray-500">Selesaikan pembayaran sebelum waktu habis</p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-3xl p-8 text-center shadow-2xl shadow-orange-200">
                            <div className="flex items-center justify-center gap-2 mb-3 opacity-90">
                                <Clock className="w-5 h-5" />
                                <span className="text-sm font-medium uppercase tracking-wider">Batas Waktu</span>
                            </div>
                            <div className="text-5xl font-mono font-black tracking-wider mb-2">
                                {formatTime(countdown)}
                            </div>
                            <div className="text-orange-100 text-sm">Pembayaran akan otomatis dibatalkan</div>
                        </div>

                        <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 space-y-6">
                            <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                                <span className="text-gray-500 font-medium">Metode Pembayaran</span>
                                <span className="font-bold text-gray-900 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-orange-500" />
                                    {selectedPayment?.fullName || selectedPayment?.name}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                                <span className="text-gray-500 font-medium">Total Pembayaran</span>
                                <span className="font-black text-orange-600 text-2xl">{formatCurrency(donationData?.amount || 0)}</span>
                            </div>

                            {selectedPayment?.id === 'qris' ? (
                                <div className="flex flex-col items-center py-6">
                                    <div className="w-64 h-64 bg-gray-50 p-4 border-2 border-gray-200 rounded-3xl mb-6 flex items-center justify-center">
                                        <QrCode className="w-full h-full text-gray-300" />
                                    </div>
                                    <p className="text-sm text-gray-500 text-center max-w-sm">
                                        Scan kode QR di atas menggunakan aplikasi pembayaran digital favorit Anda
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                        Nomor Virtual Account
                                    </label>
                                    <div className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl border-2 border-gray-100">
                                        <span className="font-mono text-2xl font-bold text-gray-800 tracking-wider">{vaNumber}</span>
                                        <button
                                            onClick={() => copyToClipboard(vaNumber)}
                                            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl font-bold text-sm hover:bg-orange-700 transition-all"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            {copied ? 'Tersalin!' : 'Salin'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl flex gap-4 text-blue-700 border border-blue-100">
                            <Shield className="w-6 h-6 flex-shrink-0" />
                            <div className="text-sm leading-relaxed">
                                <strong className="block mb-1">Keamanan Terjamin</strong>
                                Pastikan nominal transfer sesuai hingga 3 digit terakhir untuk verifikasi otomatis yang lebih cepat.
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="container mx-auto px-4 md:px-6 pt-32 pb-24 max-w-4xl">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Kembali</span>
                </button>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Proses Pembayaran</h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Lengkapi informasi berikut untuk menyelesaikan donasi Anda
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-16">
                    <div className="flex justify-between items-center relative">
                        {steps.map((label, index) => (
                            <div key={label} className="flex flex-col items-center flex-1 relative z-10">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 border-4 ${index <= activeStep
                                        ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-200'
                                        : 'bg-white border-gray-200 text-gray-400'
                                    }`}>
                                    {index < activeStep ? <Check className="w-6 h-6" /> : index + 1}
                                </div>
                                <span className={`text-sm font-bold mt-3 transition-colors ${index <= activeStep ? 'text-orange-600' : 'text-gray-400'
                                    }`}>
                                    {label}
                                </span>
                            </div>
                        ))}
                        <div className="absolute top-6 left-0 w-full h-1 bg-gray-100 -z-10">
                            <div
                                className="h-full bg-orange-600 transition-all duration-500 ease-out"
                                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 lg:p-12 min-h-[500px] flex flex-col">
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {renderStepContent(activeStep)}
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
                        {activeStep > 0 && activeStep < 2 && (
                            <button
                                onClick={() => setActiveStep(prev => prev - 1)}
                                className="px-6 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-bold transition-all"
                            >
                                Kembali
                            </button>
                        )}
                        {activeStep < 2 ? (
                            <button
                                onClick={handleNext}
                                className="px-10 py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 shadow-xl shadow-orange-500/20 transition-all flex items-center gap-2 ml-auto active:scale-95"
                            >
                                {activeStep === 1 ? 'Konfirmasi Pembayaran' : 'Lanjutkan'}
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/')}
                                className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all ml-auto"
                            >
                                Selesai
                            </button>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Pembayaran;
