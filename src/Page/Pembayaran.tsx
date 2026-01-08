import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CreditCard,
    QrCode,
    Banknote,
    CheckCircle,
    Clock,
    Copy,
    Heart
} from 'lucide-react';
import Navbar from '../ui/Navbar';

interface DonationData {
    program: string;
    amount: number;
    isAnonymous: boolean;
}

const Pembayaran = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const donationData = location.state as DonationData;

    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const [countdown, setCountdown] = useState(3600); // 1 hour in seconds
    const [copied, setCopied] = useState(false);
    const [editableAmount, setEditableAmount] = useState<string>(
        donationData?.amount && donationData.amount > 0 ? donationData.amount.toString() : ''
    );
    const [showAmountInput, setShowAmountInput] = useState(
        !donationData?.amount || donationData.amount === 0
    );

    // Donor information state
    const [donorInfo, setDonorInfo] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isAnonymous, setIsAnonymous] = useState(donationData?.isAnonymous || false);
    const [showDonorForm, setShowDonorForm] = useState(false);

    // Virtual Account Number (dummy)
    const vaNumber = '8808' + Math.floor(Math.random() * 1000000000000);

    useEffect(() => {
        // Redirect if no donation data
        if (!donationData) {
            navigate('/');
            return;
        }

        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [donationData, navigate]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAmountConfirm = () => {
        const amount = parseInt(editableAmount);
        if (!amount || amount < 10000) {
            alert('Minimal donasi adalah Rp 10.000');
            return;
        }
        setShowAmountInput(false);
        setShowDonorForm(true);
    };

    const handleDonorInfoSubmit = () => {
        if (!isAnonymous) {
            if (!donorInfo.name || !donorInfo.email || !donorInfo.phone) {
                alert('Mohon lengkapi data diri Anda');
                return;
            }
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(donorInfo.email)) {
                alert('Format email tidak valid');
                return;
            }
            // Validate phone
            if (donorInfo.phone.length < 10) {
                alert('Nomor telepon tidak valid');
                return;
            }
        }
        setShowDonorForm(false);
    };

    const getCurrentAmount = () => {
        return showAmountInput ? (parseInt(editableAmount) || 0) : (donationData?.amount || parseInt(editableAmount) || 0);
    };

    const formatInput = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        return numericValue;
    };

    const displayAmount = (value: string) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID').format(parseInt(value));
    };

    const paymentMethods = [
        {
            id: 'transfer',
            name: 'Transfer Bank',
            icon: <Banknote className="w-6 h-6" />,
            description: 'Transfer melalui ATM, Mobile Banking, atau Internet Banking'
        },
        {
            id: 'qris',
            name: 'QRIS',
            icon: <QrCode className="w-6 h-6" />,
            description: 'Scan QR Code dengan aplikasi e-wallet atau mobile banking'
        },
        {
            id: 'ewallet',
            name: 'E-Wallet',
            icon: <CreditCard className="w-6 h-6" />,
            description: 'Bayar dengan GoPay, OVO, Dana, atau ShopeePay'
        }
    ];

    if (!donationData) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
            <Navbar />

            <div className="container mx-auto px-6 lg:px-12 pt-32 pb-16">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Kembali ke Beranda</span>
                </button>

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4"
                        >
                            <Heart className="w-8 h-8 text-orange-600" fill="currentColor" />
                        </motion.div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Selesaikan Pembayaran
                        </h1>
                        <p className="text-gray-600 mb-4">
                            Terima kasih atas kepedulian Anda untuk berbagi kebaikan
                        </p>

                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full shadow-lg shadow-orange-500/30">
                            <span className="text-sm font-bold">Kategori Donasi:</span>
                            <span className="text-sm font-semibold">{donationData.program}</span>
                        </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Selesaikan pembayaran dalam:
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                            {formatTime(countdown)}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Payment Methods */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Donation Summary */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Detail Donasi</h2>

                                {showAmountInput ? (
                                    <div className="space-y-4">
                                        <div className="py-3 border-b border-gray-100">
                                            <span className="text-gray-600 block mb-2">Program</span>
                                            <span className="font-semibold text-gray-900">{donationData.program}</span>
                                        </div>

                                        <div>
                                            <label className="text-gray-600 block mb-3">Masukkan Nominal Donasi</label>
                                            <div className="relative mb-4">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-bold">Rp</span>
                                                <input
                                                    type="text"
                                                    value={displayAmount(editableAmount)}
                                                    onChange={(e) => setEditableAmount(formatInput(e.target.value))}
                                                    placeholder="0"
                                                    className="w-full py-4 pl-14 pr-4 text-2xl font-bold text-gray-900 placeholder-gray-300 outline-none bg-gradient-to-br from-gray-50 to-orange-50/30 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                                                />
                                            </div>
                                            <button
                                                onClick={handleAmountConfirm}
                                                className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors"
                                            >
                                                Konfirmasi Nominal
                                            </button>
                                        </div>
                                    </div>
                                ) : showDonorForm ? (
                                    <div className="space-y-4">
                                        <div className="py-3 border-b border-gray-100">
                                            <span className="text-gray-600 block mb-2">Program</span>
                                            <span className="font-semibold text-gray-900">{donationData.program}</span>
                                        </div>
                                        <div className="py-3 border-b border-gray-100">
                                            <span className="text-gray-600 block mb-2">Nominal Donasi</span>
                                            <span className="font-semibold text-orange-600 text-xl">{formatCurrency(getCurrentAmount())}</span>
                                        </div>

                                        <div className="pt-4">
                                            <h3 className="font-bold text-gray-900 mb-4">Data Diri Donatur</h3>

                                            {/* Anonymous Toggle */}
                                            <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={isAnonymous}
                                                        onChange={(e) => setIsAnonymous(e.target.checked)}
                                                        className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                                                    />
                                                    <div>
                                                        <span className="text-sm font-bold text-gray-900 block">Donasi Anonim</span>
                                                        <span className="text-xs text-gray-600">Identitas Anda tidak akan ditampilkan</span>
                                                    </div>
                                                </label>
                                            </div>

                                            {!isAnonymous && (
                                                <div className="space-y-4">
                                                    {/* Name */}
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Nama Lengkap <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={donorInfo.name}
                                                            onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                                                            placeholder="Masukkan nama lengkap"
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                                        />
                                                    </div>

                                                    {/* Email */}
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Email <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            value={donorInfo.email}
                                                            onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                                                            placeholder="contoh@email.com"
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                                        />
                                                    </div>

                                                    {/* Phone */}
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Nomor Telepon <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            value={donorInfo.phone}
                                                            onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value.replace(/\D/g, '') })}
                                                            placeholder="08123456789"
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                                        />
                                                    </div>

                                                    {/* Message */}
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Pesan/Doa (Opsional)
                                                        </label>
                                                        <textarea
                                                            value={donorInfo.message}
                                                            onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                                                            placeholder="Tulis pesan atau doa Anda..."
                                                            rows={3}
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <button
                                                onClick={handleDonorInfoSubmit}
                                                className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors mt-4"
                                            >
                                                Lanjutkan ke Pembayaran
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Program</span>
                                            <span className="font-semibold text-gray-900">{donationData.program}</span>
                                        </div>
                                        {!isAnonymous && donorInfo.name && (
                                            <div className="flex justify-between py-3 border-b border-gray-100">
                                                <span className="text-gray-600">Nama Donatur</span>
                                                <span className="font-semibold text-gray-900">{donorInfo.name}</span>
                                            </div>
                                        )}
                                        {isAnonymous && (
                                            <div className="flex justify-between py-3 border-b border-gray-100">
                                                <span className="text-gray-600">Nama Donatur</span>
                                                <span className="font-semibold text-gray-500 italic">Anonim</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Nominal Donasi</span>
                                            <span className="font-semibold text-gray-900">{formatCurrency(getCurrentAmount())}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Biaya Admin</span>
                                            <span className="font-semibold text-green-600">Gratis</span>
                                        </div>
                                        <div className="flex justify-between py-4 bg-orange-50 rounded-xl px-4 mt-4">
                                            <span className="text-lg font-bold text-gray-900">Total Pembayaran</span>
                                            <span className="text-2xl font-bold text-orange-600">{formatCurrency(getCurrentAmount())}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Payment Method Selection */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Pilih Metode Pembayaran</h2>
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedPayment(method.id)}
                                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${selectedPayment === method.id
                                                ? 'border-orange-500 bg-orange-50'
                                                : 'border-gray-200 hover:border-orange-300 bg-white'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedPayment === method.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {method.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-gray-900">{method.name}</div>
                                                    <div className="text-sm text-gray-500">{method.description}</div>
                                                </div>
                                                {selectedPayment === method.id && (
                                                    <CheckCircle className="w-6 h-6 text-orange-500" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Instructions */}
                            {selectedPayment === 'transfer' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                                >
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Instruksi Pembayaran</h2>

                                    {/* Virtual Account */}
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 mb-6">
                                        <div className="text-sm text-gray-600 mb-2">Nomor Virtual Account</div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-2xl font-bold text-gray-900 tracking-wider">{vaNumber}</div>
                                            <button
                                                onClick={() => copyToClipboard(vaNumber)}
                                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors"
                                            >
                                                <Copy className="w-4 h-4" />
                                                <span className="text-sm font-semibold">{copied ? 'Tersalin!' : 'Salin'}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Steps */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-gray-900">Cara Pembayaran:</h3>
                                        <ol className="space-y-3 list-decimal list-inside text-gray-600">
                                            <li>Buka aplikasi mobile banking atau ATM</li>
                                            <li>Pilih menu Transfer ke Virtual Account</li>
                                            <li>Masukkan nomor Virtual Account di atas</li>
                                            <li>Masukkan nominal sesuai total pembayaran</li>
                                            <li>Konfirmasi dan selesaikan transaksi</li>
                                        </ol>
                                    </div>
                                </motion.div>
                            )}

                            {selectedPayment === 'qris' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                                >
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Scan QR Code</h2>
                                    <div className="flex justify-center p-8 bg-gray-50 rounded-xl">
                                        <div className="w-64 h-64 bg-white border-4 border-orange-500 rounded-2xl flex items-center justify-center">
                                            <QrCode className="w-32 h-32 text-gray-400" />
                                        </div>
                                    </div>
                                    <p className="text-center text-gray-600 mt-4">
                                        Scan QR Code dengan aplikasi e-wallet atau mobile banking Anda
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Column - Help & Info */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
                                <h3 className="text-xl font-bold mb-3">Butuh Bantuan?</h3>
                                <p className="text-orange-100 mb-4 text-sm">
                                    Tim kami siap membantu Anda 24/7
                                </p>
                                <button className="w-full bg-white text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors">
                                    Hubungi Customer Service
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h3 className="font-bold text-gray-900 mb-3">Keamanan Terjamin</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Transaksi terenkripsi SSL</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Data pribadi terlindungi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Lembaga resmi tersertifikasi</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pembayaran;
