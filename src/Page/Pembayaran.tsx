import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    ArrowLeft,
    Check,
    QrCode,
    ChevronRight,
    ChevronLeft,
    Copy,
    Clock,
    AlertCircle
} from 'lucide-react';
import Navbar from '../ui/Navbar';

interface DonationData {
    program: string;
    amount: number;
    isAnonymous: boolean;
}

// Payment Methods Data
const BANKS = [
    { id: 'bsi', name: 'Bank Syariah Indonesia (BSI)', code: '451', icon: 'BSI' },
    { id: 'bri', name: 'Bank Rakyat Indonesia (BRI)', code: '002', icon: 'BRI' },
    { id: 'mandiri', name: 'Bank Mandiri', code: '008', icon: 'MANDIRI' },
    { id: 'bca', name: 'Bank Central Asia (BCA)', code: '014', icon: 'BCA' },
    { id: 'muamalat', name: 'Bank Muamalat', code: '147', icon: 'BMI' },
];

const EWALLETS = [
    { id: 'gopay', name: 'GoPay', icon: 'GOPAY' },
    { id: 'ovo', name: 'OVO', icon: 'OVO' },
    { id: 'dana', name: 'DANA', icon: 'DANA' },
    { id: 'shopeepay', name: 'ShopeePay', icon: 'SHOPEE' },
    { id: 'qris', name: 'QRIS', icon: <QrCode className="w-6 h-6" /> }
];

const Pembayaran = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const donationData = location.state as DonationData;

    // Stepper State
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Detail Donasi', 'Data Diri', 'Metode Pembayaran', 'Instruksi'];

    // Form States
    const [amount, setAmount] = useState<string>(
        donationData?.amount && donationData.amount > 0 ? donationData.amount.toString() : ''
    );
    const [program, setProgram] = useState(donationData?.program || 'Infaq Shadaqah Umum');
    const [donorInfo, setDonorInfo] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        isAnonymous: donationData?.isAnonymous || false
    });
    const [selectedPayment, setSelectedPayment] = useState<any>(null);

    // Timer State for Instruction
    const [countdown, setCountdown] = useState(3600);

    // UI State
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!donationData && activeStep === 0) {
            // Optional: Redirect if strictly required, but for UX let them fill it
        }

        if (activeStep === 3) {
            const timer = setInterval(() => setCountdown(p => Math.max(0, p - 1)), 1000);
            return () => clearInterval(timer);
        }
    }, [activeStep]);

    const handleNext = () => {
        // Validation
        if (activeStep === 0) {
            if (!amount || parseInt(amount) < 10000) {
                alert('Minimal donasi adalah Rp 10.000');
                return;
            }
        }
        if (activeStep === 1) {
            if (!donorInfo.isAnonymous && (!donorInfo.name || !donorInfo.email || !donorInfo.phone)) {
                alert('Mohon lengkapi data diri Anda');
                return;
            }
            if (donorInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email)) {
                alert('Format email tidak valid');
                return;
            }
        }
        if (activeStep === 2) {
            if (!selectedPayment) {
                alert('Silakan pilih metode pembayaran');
                return;
            }
        }

        setActiveStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const formatCurrency = (val: number | string) => {
        const num = typeof val === 'string' ? parseInt(val) : val;
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);
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

    // Render Steps
    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Program Donasi</label>
                            <select
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            >
                                <option>Peduli Lingkungan : SAMOSIR</option>
                                <option>Pendidikan Anak Yatim</option>
                                <option>Kesehatan Masyarakat</option>
                                <option>Infaq Shadaqah Umum</option>
                                <option>Zakat Maal</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nominal Donasi</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
                                <input
                                    type="text"
                                    value={amount ? parseInt(amount).toLocaleString('id-ID') : ''}
                                    onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                                    placeholder="0"
                                    className="w-full pl-12 p-4 text-2xl font-bold text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                />
                            </div>
                            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                                {[50000, 100000, 250000, 500000].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setAmount(val.toString())}
                                        className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-orange-100 hover:text-orange-600 transition-colors whitespace-nowrap"
                                    >
                                        {val.toLocaleString('id-ID')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-gray-900">Donasi Anonim</h4>
                                <p className="text-sm text-gray-500">Sembunyikan nama saya dari publik</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={donorInfo.isAnonymous}
                                    onChange={e => setDonorInfo({ ...donorInfo, isAnonymous: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                        </div>

                        {!donorInfo.isAnonymous && (
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={donorInfo.name}
                                        onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                                        placeholder="Nama Anda"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={donorInfo.email}
                                        onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                                        placeholder="email@contoh.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={donorInfo.phone}
                                        onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                                        placeholder="0812..."
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Doa / Pesan (Opsional)</label>
                            <textarea
                                value={donorInfo.message}
                                onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-24 resize-none"
                                placeholder="Tuliskan doa atau harapan Anda..."
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Transfer Bank</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {BANKS.map((bank) => (
                                    <button
                                        key={bank.id}
                                        onClick={() => setSelectedPayment(bank)}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${selectedPayment?.id === bank.id
                                            ? 'border-orange-500 bg-orange-50 shadow-sm'
                                            : 'border-gray-100 hover:border-gray-300 bg-white'
                                            }`}
                                    >
                                        <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-500 text-xs">
                                            {bank.icon}
                                        </div>
                                        <span className="font-semibold text-gray-700">{bank.name}</span>
                                        {selectedPayment?.id === bank.id && <Check className="w-5 h-5 text-orange-500 ml-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">E-Wallet & QRIS</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {EWALLETS.map((ewallet) => (
                                    <button
                                        key={ewallet.id}
                                        onClick={() => setSelectedPayment(ewallet)}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${selectedPayment?.id === ewallet.id
                                            ? 'border-orange-500 bg-orange-50 shadow-sm'
                                            : 'border-gray-100 hover:border-gray-300 bg-white'
                                            }`}
                                    >
                                        <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-500 text-xs">
                                            {typeof ewallet.icon === 'string' ? ewallet.icon : ewallet.icon}
                                        </div>
                                        <span className="font-semibold text-gray-700">{ewallet.name}</span>
                                        {selectedPayment?.id === ewallet.id && <Check className="w-5 h-5 text-orange-500 ml-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 3:
                const vaNumber = "880899283723"; // Dummy VA
                return (
                    <div className="space-y-8 animate-in zoom-in-95 duration-500">
                        {/* Success Header */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Instruksi Pembayaran</h3>
                            <p className="text-gray-500">Selesaikan pembayaran Anda sebelum batas waktu berakhir</p>
                        </div>

                        {/* Timer Card */}
                        <div className="bg-orange-600 text-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg shadow-orange-200">
                            <div className="flex items-center gap-2 mb-2 opacity-90">
                                <Clock className="w-5 h-5" />
                                <span className="text-sm font-medium">Batas Waktu Pembayaran</span>
                            </div>
                            <div className="text-4xl font-mono font-bold tracking-widest">
                                {formatTime(countdown)}
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-500">Metode Pembayaran</span>
                                <span className="font-bold text-gray-900 flex items-center gap-2">
                                    {selectedPayment?.name}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                                <span className="text-gray-500">Total Tagihan</span>
                                <span className="font-bold text-orange-600 text-xl">{formatCurrency(parseInt(amount))}</span>
                            </div>

                            {selectedPayment?.id === 'qris' ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-48 h-48 bg-white p-2 border border-gray-200 rounded-xl mb-4">
                                        <QrCode className="w-full h-full text-gray-800" />
                                    </div>
                                    <p className="text-sm text-gray-500 text-center">Scan QRIS menggunakan aplikasi pembayaran favorit Anda</p>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nomor Virtual Account / Rekening</label>
                                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <span className="font-mono text-xl font-bold text-gray-800 tracking-wide">{vaNumber}</span>
                                        <button
                                            onClick={() => copyToClipboard(vaNumber)}
                                            className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            {copied ? 'Tersalin' : 'Salin'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-blue-700 border border-blue-100">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">
                                Pastikan nominal transfer sesuai hingga 3 digit terakhir untuk mempercepat verifikasi otomatis.
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="container mx-auto px-4 md:px-6 pt-24 pb-12 max-w-3xl">
                {/* Header Title */}
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Kembali</span>
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Formulir Donasi</h1>

                {/* Minimalist Stepper */}
                <div className="mb-10">
                    <div className="flex justify-between items-center relative z-10">
                        {steps.map((label, index) => (
                            <div key={label} className="flex flex-col items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${index <= activeStep
                                    ? 'bg-orange-600 border-orange-600 text-white'
                                    : 'bg-white border-gray-200 text-gray-400'
                                    }`}>
                                    {index < activeStep ? <Check className="w-5 h-5" /> : index + 1}
                                </div>
                                <span className={`text-xs font-semibold mt-2 hidden md:block transition-colors ${index <= activeStep ? 'text-orange-600' : 'text-gray-400'
                                    }`}>
                                    {label}
                                </span>
                            </div>
                        ))}
                        {/* Connecting Line */}
                        <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-10 transform -translate-y-1/2">
                            <div
                                className="h-full bg-orange-600 transition-all duration-500 ease-in-out"
                                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                    {/* Active Step Label for Mobile */}
                    <div className="md:hidden text-center mt-4">
                        <span className="text-sm font-bold text-orange-600">{steps[activeStep]}</span>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-orange-500/5 border border-gray-100 p-6 md:p-8 min-h-[400px] flex flex-col">
                    <div className="flex-1">
                        {renderStepContent(activeStep)}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-50">
                        <button
                            onClick={handleBack}
                            disabled={activeStep === 0 || activeStep === 3}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeStep === 0 || activeStep === 3
                                ? 'opacity-0 pointer-events-none'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Kembali
                        </button>

                        {activeStep < 3 ? (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all active:scale-95 ml-auto"
                            >
                                {activeStep === 2 ? 'Bayar Sekarang' : 'Lanjut'}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 flex items-center gap-2 transition-all ml-auto"
                            >
                                Selesai
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Pembayaran;
