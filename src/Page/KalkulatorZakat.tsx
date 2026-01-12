import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle2, Wallet, Coins, TrendingUp } from 'lucide-react';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

type ZakatType = 'profesi' | 'maal';

interface CalculationResult {
  amount: number;
  isWajib: boolean;
  message: string;
  nishab: number;
  label: string;
}

const HARGA_EMAS_PER_GRAM = 2631000;

const DESCRIPTIONS = {
  profesi: "Zakat yang dikeluarkan dari setiap pendapatan (gaji, honorarium, upah, jasa) yang diperoleh secara rutin maupun tidak rutin.",
  maal: "Zakat yang dikenakan atas harta (uang, emas, perak, atau surat bernilai) yang dimiliki dan telah mencapai batas minimal (Nisab) selama satu tahun (Haul)."
};

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

const KalkulatorZakat: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ZakatType>('profesi');
  const [inputs, setInputs] = useState({
    gaji: '',
    lain: '',
    hutangProfesi: '',
    tabungan: '',
    emas: '',
    saham: '',
    hutangMaal: ''
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

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

  const parseNumber = (value: string) => parseInt(value.replace(/\./g, '') || '0', 10);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: formatRupiah(value) }));
  };

  const handleCalculate = () => {
    let totalHarta = 0, nishab = 0, zakatAmount = 0, isWajib = false, label = "";

    if (activeTab === 'profesi') {
      totalHarta = (parseNumber(inputs.gaji) + parseNumber(inputs.lain)) - parseNumber(inputs.hutangProfesi);
      nishab = (85 * HARGA_EMAS_PER_GRAM) / 12;
      label = "Zakat Profesi";
    } else {
      totalHarta = (parseNumber(inputs.tabungan) + parseNumber(inputs.emas) + parseNumber(inputs.saham)) - parseNumber(inputs.hutangMaal);
      nishab = 85 * HARGA_EMAS_PER_GRAM;
      label = "Zakat Maal";
    }

    if (totalHarta >= nishab) {
      zakatAmount = totalHarta * 0.025;
      isWajib = true;
    }

    setResult({
      amount: zakatAmount,
      isWajib,
      nishab,
      label,
      message: isWajib
        ? "Berdasarkan syariat, harta Anda telah melampaui batas Nisab. Tunaikan kewajiban zakat untuk mensucikan jiwa dan harta Anda."
        : "Harta Anda belum mencapai batas Nisab. Meskipun demikian, Anda dapat mengoptimalkannya dengan berinfak atau bersedekah secara sukarela."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      {/* Minimalist Page Header */}
      <section className="pt-40 pb-20 bg-white shadow-xs">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <FadeInUp>
              <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-100 text-orange-600 px-4 py-1.5 rounded-full mb-8">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase">Finansial Syariah</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                Kalkulator <span className="text-orange-600">Zakat</span> <br /> & Perhitungan
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                Hitung kewajiban zakat Anda secara presisi sesuai dengan ketentuan syariat dan update harga emas terbaru.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-[120px] -mr-[300px] -mt-[150px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[120px] -ml-[300px] -mb-[150px] opacity-40" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-stretch">

            {/* Form Section */}
            <div className="flex-1">
              <FadeInUp className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
                <div className="flex bg-gray-50/50 p-2 m-6 rounded-2xl border border-gray-100">
                  <button
                    onClick={() => { setActiveTab('profesi'); setResult(null); }}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'profesi' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Wallet className="w-4 h-4" /> Zakat Profesi
                  </button>
                  <button
                    onClick={() => { setActiveTab('maal'); setResult(null); }}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'maal' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Coins className="w-4 h-4" /> Zakat Maal
                  </button>
                </div>

                <div className="px-10 lg:px-16 pb-16 flex-grow">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                  >
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Detail {activeTab === 'profesi' ? 'Penghasilan' : 'Harta Simpanan'}</h3>
                    <p className="text-gray-500 font-light text-lg leading-relaxed">
                      {DESCRIPTIONS[activeTab]}
                    </p>
                  </motion.div>

                  <div className="space-y-10">
                    {activeTab === 'profesi' ? (
                      <div className="grid md:grid-cols-2 gap-10">
                        <InputField label="Gaji Pokok / Bulan" name="gaji" value={inputs.gaji} onChange={handleInputChange} icon={<Wallet />} />
                        <InputField label="Tunjangan & Bonus" name="lain" value={inputs.lain} onChange={handleInputChange} icon={<TrendingUp />} />
                        <div className="md:col-span-2">
                          <InputField label="Hutang Jatuh Tempo" name="hutangProfesi" value={inputs.hutangProfesi} onChange={handleInputChange} note="Hanya hutang untuk kebutuhan pokok yang mendesak" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-10">
                        <InputField label="Tabungan / Kas" name="tabungan" value={inputs.tabungan} onChange={handleInputChange} />
                        <InputField label="Emas / Perhiasan" name="emas" value={inputs.emas} onChange={handleInputChange} />
                        <InputField label="Saham / Investasi" name="saham" value={inputs.saham} onChange={handleInputChange} />
                        <InputField label="Hutang Jatuh Tempo" name="hutangMaal" value={inputs.hutangMaal} onChange={handleInputChange} />
                      </div>
                    )}

                    <div className="pt-6">
                      <button
                        onClick={handleCalculate}
                        className="group w-full py-6 bg-gray-900 text-white rounded-[1.5rem] font-bold text-lg hover:bg-orange-600 shadow-2xl shadow-gray-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group/calc"
                      >
                        <Calculator className="w-6 h-6 group-hover/calc:rotate-12 transition-transform" />
                        <span>Kalkulasi Zakat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>

            {/* Result Section */}
            <div className="lg:w-[450px] shrink-0">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`h-full bg-white rounded-[3rem] shadow-sm overflow-hidden border-2 relative flex flex-col ${result.isWajib ? 'border-orange-100' : 'border-emerald-100'}`}
                  >
                    <div className={`absolute top-0 inset-x-0 h-48 opacity-5 ${result.isWajib ? 'bg-orange-600' : 'bg-emerald-600'}`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)' }} />

                    <div className="p-12 relative z-10 flex flex-col h-full">
                      <div className="mb-12 text-center">
                        <span className={`inline-block px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] mb-6 shadow-sm ${result.isWajib ? 'bg-orange-600 text-white shadow-orange-600/20' : 'bg-emerald-600 text-white shadow-emerald-600/20'}`}>
                          {result.isWajib ? 'Wajib Zakat' : 'Anjuran Infaq'}
                        </span>
                        <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3">Estimasi {result.label}</h4>
                        <div className={`text-5xl font-black tracking-tight mb-4 ${result.isWajib ? 'text-gray-900' : 'text-emerald-700'}`}>
                          Rp {result.amount.toLocaleString('id-ID')}
                        </div>
                        <div className="inline-block px-4 py-1.5 bg-gray-50 rounded-full">
                          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider italic">Nisab: Rp {Math.round(result.nishab).toLocaleString('id-ID')}</p>
                        </div>
                      </div>

                      <div className={`flex-grow p-8 rounded-[2rem] mb-12 flex flex-col gap-6 text-center shadow-inner ${result.isWajib ? 'bg-orange-50/50 text-orange-900' : 'bg-emerald-50/50 text-emerald-900'}`}>
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mx-auto shadow-sm ${result.isWajib ? 'bg-white text-orange-600' : 'bg-white text-emerald-600'}`}>
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <p className="font-light text-lg leading-relaxed">{result.message}</p>
                      </div>

                      <button
                        onClick={() => navigate('/pembayaran', { state: { program: result.label, amount: result.amount } })}
                        className={`w-full py-6 rounded-2xl font-bold flex items-center justify-center gap-4 shadow-xl transition-all hover:-translate-y-1 active:scale-95 ${result.isWajib ? 'bg-orange-600 text-white shadow-orange-600/20 hover:bg-orange-700' : 'bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-700'}`}
                      >
                        <span className="text-lg">{result.isWajib ? 'Tunaikan Zakat' : 'Berinfaq Sekarang'}</span>
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full bg-gray-900 rounded-[3rem] p-16 text-white shadow-2xl relative overflow-hidden group">
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />

                    <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
                      <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center backdrop-blur-md mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-700">
                        <Calculator className="w-10 h-10 text-orange-500" />
                      </div>
                      <h4 className="text-3xl font-bold mb-6 tracking-tight">Kalkulasi Cepat</h4>
                      <p className="text-gray-400 leading-relaxed font-light mb-16 text-lg">
                        Masukkan rincian aset atau pendapatan Anda untuk menghitung secara otomatis berapa jumlah zakat yang perlu ditunaikan.
                      </p>
                      <div className="grid grid-cols-2 gap-6 w-full">
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                          <div className="text-2xl font-bold text-orange-500">2.5%</div>
                          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mt-1">Kadar Zakat</div>
                        </div>
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                          <div className="text-2xl font-bold text-orange-500">85gr</div>
                          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mt-1">Standar Nisab</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const InputField = ({ label, name, value, onChange, icon, note }: any) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between ml-1">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">{label}</label>
      {icon && <span className="text-orange-500/30">{icon}</span>}
    </div>
    <div className="group relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-orange-600 transition-colors text-lg tracking-tight">Rp</div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="0"
        className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-transparent rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-8 focus:ring-orange-500/5 transition-all text-2xl font-black text-gray-900 placeholder:text-gray-200 shadow-inner"
      />
    </div>
    {note && <p className="text-[10px] text-gray-400 font-medium italic pl-1 mt-2 opacity-70">*{note}</p>}
  </div>
);

export default KalkulatorZakat;