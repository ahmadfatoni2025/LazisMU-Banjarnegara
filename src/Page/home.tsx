import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Users,
  Phone, Mail, MapPin, Facebook,
  Instagram, Youtube, MessageCircle,
  CreditCard, QrCode, Banknote,
  ArrowRight,
  BadgeCheck,
  School,
  HeartPulse,
  Sprout,
  Calendar,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import FAQAccordion from '../ui/FAQAccordion';

const Home = () => {
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

    // Navigate to payment page with donation data
    navigate('/pembayaran', {
      state: {
        program: selectedProgram,
        amount: amount,
        isAnonymous: isAnonymous
      }
    });
  };

  const formatCurrency = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    return numericValue;
  };

  const displayCurrency = (value: string) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID').format(parseInt(value));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black" id="Hero">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60"
              src="https://www.youtube.com/embed/_r38G3swC9o?autoplay=1&mute=1&controls=0&loop=1&playlist=_r38G3swC9o&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
              title="Lazismu Background Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full mb-8">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide uppercase">Lazismu Banjarnegara</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-8">
              Peduli Untuk
              <span className="text-transparent pl-4 bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                Negeri
              </span>
            </h1>

            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Wujudkan kepedulianmu menjadi aksi nyata. Bersama membangun harapan dan kehidupan yang lebih baik bagi sesama.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="min-w-[200px] bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                <span><a href="#donasi-section">Donasi Sekarang</a></span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="min-w-[200px] px-8 py-4 rounded-full font-bold text-lg text-white border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <span>
                  <a href="https://www.youtube.com/watch?v=_r38G3swC9o" target="_blank" rel="noopener noreferrer">Lihat Video Profil</a>
                </span>
                <div className="w-8 h-8 rounded-full bg-white text-orange-900 flex items-center justify-center">
                  <div className="border-t-4 border-l-8 border-b-4 border-transparent border-l-current ml-1"></div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Impact Dashboard (Bento Style) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dampak Kebaikan Anda</h2>
            <p className="text-gray-500">Transparansi penyaluran dana untuk penerima manfaat</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Beneficiaries - Big Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="lg:col-span-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl p-8 text-white shadow-xl shadow-orange-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-orange-100 font-medium">Total Penerima Manfaat</span>
                </div>
                <div className="text-5xl lg:text-6xl font-bold mb-2">5,007</div>
                <p className="text-orange-100">Jiwa telah terbantu melalui berbagai program kebaikan</p>
              </div>
            </motion.div>

            {/* Pilar Pendidikan */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <School className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">166</div>
              <div className="text-sm text-gray-500 mb-4">Penerima Manfaat</div>
              <div className="text-lg font-bold text-blue-600">Rp 1.178.756.523</div>
              <div className="mt-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">Pilar Pendidikan</div>
            </motion.div>

            {/* Pilar Kesehatan */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <HeartPulse className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">180</div>
              <div className="text-sm text-gray-500 mb-4">Penerima Manfaat</div>
              <div className="text-lg font-bold text-green-600">Rp 862.462.852</div>
              <div className="mt-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">Pilar Kesehatan</div>
            </motion.div>

            {/* Pilar Ekonomi */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Sprout className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
              <div className="text-sm text-gray-500 mb-4">Penerima Manfaat</div>
              <div className="text-lg font-bold text-purple-600">Rp 38.540.000</div>
              <div className="mt-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">Pilar Ekonomi</div>
            </motion.div>

            {/* Pilar Sosial Dakwah */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4436</div>
              <div className="text-sm text-gray-500 mb-4">Penerima Manfaat</div>
              <div className="text-lg font-bold text-orange-600">Rp 1.000.557.099</div>
              <div className="mt-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">Pilar Sosial Dakwah</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Campaigns (Cards) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Ayo Bantu Mereka</h2>
              <p className="text-gray-500">Pilih campaign kebaikan yang ingin Anda dukung</p>
            </div>
            <button className="hidden lg:flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "PEDULI BANJIR BANDANG SUMATERA",
                org: "Lazismu Banjarnegara",
                collected: "Rp 10.012",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/12/Gambar-WhatsApp-2025-12-04-pukul-05.41.04_ad7c7d6d.jpg",
                color: "orange"
              },
              {
                title: "ANAK ASUH",
                org: "Lazismu Banjarnegara",
                collected: "Rp 1.253.719",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2024/12/IMG-20241217-WA0032.jpg",
                color: "blue"
              },
              {
                title: "KADO RAMADHAN",
                org: "Lazismu Banjarnegara",
                collected: "Rp 150.000",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/c524a695-73f6-4ab3-afe8-ae961976dcbc.jpg",
                color: "green"
              },
              {
                title: "YATIM HEBAT",
                org: "Lazismu Banjarnegara",
                collected: "Rp 401.013",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/48096432-a373-43ad-875c-5ef6959bd03d-1.jpg",
                color: "purple"
              },
              {
                title: "ZAKAT FITRAH",
                org: "Lazismu Banjarnegara",
                collected: "Rp 401.314",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/489ec32f-b095-4d59-bc1d-6c1a46a80d82.jpg",
                color: "yellow"
              },
              {
                title: "TEBAR TAKJIL RAMADHAN",
                org: "Lazismu Banjarnegara",
                collected: "Rp 5.200.000",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/02f9d167-bbc4-4669-9d0b-1ef85dd89468.jpg",
                color: "red"
              },
              {
                title: "TEBAR TAKJIL RAMADHAN",
                org: "Lazismu Banjarnegara",
                collected: "Rp 5.200.000",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/02/da8d3a20-532b-4dec-b884-45dc330486b1.jpg",
                color: "red"
              },
              {
                title: "TEBAR TAKJIL RAMADHAN",
                org: "Lazismu Banjarnegara",
                collected: "Rp 5.200.000",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/02/231b3af6-059b-46b5-aa37-6ead5dfc00ac.jpg",
                color: "red"
              },
              {
                title: "TEBAR TAKJIL RAMADHAN",
                org: "Lazismu Banjarnegara",
                collected: "Rp 5.200.000",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/1943f6ef-6592-424d-b3ad-c5bf4c47dd13.jpg",
                color: "red"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Mendesak</span>
                    <h3 className="text-white font-bold text-lg leading-tight uppercase text-shadow-sm">{item.title}</h3>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-500 font-medium">{item.org}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Terkumpul</span>
                      <span className="font-bold text-orange-600">{item.collected}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full w-[45%]"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                          <Users className="w-3 h-3" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">
                        +99
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/pembayaran', {
                          state: {
                            program: item.title,
                            amount: 0,
                            isAnonymous: false
                          }
                        });
                      }}
                      className="px-4 py-2 bg-orange-50 text-orange-600 text-sm font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      Donasi
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Salurkan Donasi - Premium Split Layout */}
      <section id="donasi-section" className="py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 relative overflow-hidden scroll-mt-20">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
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
          </div>

          {/* Main Content - Split Layout */}
          <div className=" items-center max-w-6xl mx-auto">
            {/* Left Side - Inspiring Image & Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
                  alt="Berbagi Kebaikan"
                  className="w-full h-[500px] object-cover"
                />
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
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl shadow-orange-500/10 p-8 lg:p-10 border border-gray-100"
            >
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
                <span> <a href="#donasi-section">Donasi Sekarang</a></span>
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
            </motion.div>
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

      {/* Info Terkini Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-orange-600 mb-2">Info Terkini Lazismu</h2>
            <p className="text-gray-500 uppercase tracking-wide text-sm font-semibold">Berita Terbaru Dari Lazismu</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Tim SAR Muhammadiyah Beserta SAR Gabungan Terus Berupaya Mencari Korban Longsor",
                date: "Januari 24, 2025",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/Tim-SAR-Muhammadiyah-bersama-SAR-Gabungan-Terus-Berupaya-Mencari-Korban-Longsor-Petungkriyono-750x536-1.jpeg",
                desc: "Tim SAR gabungan terus melakukan pencarian korban longsor di Banjarnegara dengan mengerahkan alat berat dan personel tambahan..."
              },
              {
                title: "SITUATION REPORT: Bencana Alam Banjarnegara",
                date: "Januari 23, 2025",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/df9a9c3d-4bc6-4cc3-9cd9-7a3fe254917e.jpg",
                desc: "Laporan situasi terkini penanganan bencana alam yang terjadi di beberapa titik wilayah Banjarnegara."
              }
            ].map((news, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors z-10" />
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-orange-600 transition-colors cursor-pointer leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-gray-500 mb-6 line-clamp-2">{news.desc}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button className="text-orange-600 font-semibold text-sm hover:underline uppercase tracking-wider">
                      Read More
                    </button>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{news.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/berita"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30"
            >
              Lihat Berita Lainnya
            </Link>
          </div>
        </div>
      </section>

      {/* Zakat CTA Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-4">Masih bingung untuk berzakat ?</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Untuk membantu Anda, maka terlebih dahulu klik button dibawah ini untuk mendapatkan panduan dan konsultasi seputar zakat.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <motion.button whileHover={{ scale: 1.05 }} className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 text-lg">
              Konsultasi Zakat
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="bg-amber-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-600 shadow-lg shadow-amber-500/20 text-lg">
              Kalkulator Zakat
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 text-lg">
              Artikel Zakat
            </motion.button>
          </div>
        </div>
      </section>

      {/* Laporan Tahunan / About Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 skew-x-12 translate-x-32 z-0" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-8 leading-tight">
              Laporan Tahunan Lazismu Banjarnegara<br />Tahun 2024
            </h2>
            <div className="w-16 h-16 mx-auto text-orange-500 animate-spin-slow">
              <Sprout className="w-full h-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
                  alt="Laporan Tahunan Lazismu"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent flex flex-col justify-end p-8">
                  <span className="text-white/80 font-semibold mb-2 uppercase tracking-widest">Official Report</span>
                  <h3 className="text-white text-3xl font-bold">Laporan Tahunan 2024</h3>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-100 rounded-full -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-100 rounded-full -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-1 bg-orange-500 rounded-full" />
                <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Tentang Kami</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900">Assalamu’alaikum warahmatullahi kabarakaatuh</h3>

              <p className="text-gray-600 leading-relaxed text-justify">
                Sebagai tanggungjawab atas pendirian oleh PP. Muhammadiyah pada tahun 2002, selanjutnya dikukuhkan oleh Menteri Agama Republik Indonesia sebagai Lembaga Amil Zakat Nasional melalui SK No. 457/21 November 2002.
              </p>
              <p className="text-gray-600 leading-relaxed text-justify">
                Dan saat berlakunya Undang-undang Zakat nomor 23 tahun 2011, Peraturan Pemerintah nomor 14 tahun 2014, dan Keputusan Menteri Agama Republik Indonesia nomor 333 tahun 2015. Lazismu sebagai lembaga amil zakat nasional telah dikukuhkan kembali melalui SK Mentri Agama Republik Indonesia nomor 730 tahun 2016.
              </p>
              <p className="text-gray-600 leading-relaxed text-justify">
                Lazismu Banjarnegara sebagai bagian dari Lembaga Amil Zakat Infak dan Shadaqah Muhammadiyah berupaya untuk bekerja secara professional dalam menghimpun dan mengelola dana zakat, infak dan shadaqah yang diamanahkan.
              </p>

              <div className="pt-6">
                <button className="flex items-center gap-3 text-orange-600 font-bold hover:gap-4 transition-all group">
                  <span className="border-b-2 border-orange-600 pb-1">Download Laporan Lengkap</span>
                  <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQAccordion />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-emerald-500 w-10 h-10 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-bold">LAZISMU</div>
                  <div className="text-emerald-400 text-sm">Banjarnegara</div>
                </div>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Mengelola zakat, infaq, dan sedekah secara profesional untuk
                kemaslahatan umat dan pembangunan masyarakat.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
                  { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
                  { icon: <Youtube className="w-5 h-5" />, label: 'YouTube' },
                  { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6">Tautan Cepat</h3>
              <ul className="space-y-3">
                {['Tentang Kami', 'Program', 'Laporan Keuangan', 'Artikel', 'Kalkulator Zakat', 'Kontak'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h3 className="text-lg font-bold mb-6">Kontak Kami</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-1" />
                  <span className="text-gray-400">Jl. Contoh No. 123, Banjarnegara, Jawa Tengah</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-400">(0281) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-400">info@lazismubanjarnegara.org</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-6">Berlangganan Update</h3>
              <p className="text-gray-400 mb-4">
                Dapatkan informasi program dan laporan terbaru
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900 outline-none"
                />
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Berlangganan
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-gray-400 text-sm mb-4 lg:mb-0">
                © {new Date().getFullYear()} Lazismu Banjarnegara. Semua hak dilindungi.
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm">Kebijakan Privasi</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Syarat & Ketentuan</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Sertifikasi</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;