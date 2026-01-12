import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { MessageCircle, Phone, Mail, Clock, Send } from 'lucide-react';

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

const Konsultasi = () => {
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
                                <span className="text-xs font-bold tracking-widest uppercase">Pusat Bantuan</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Layanan <br /> <span className="text-orange-600">Konsultasi</span> & CS
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Tim ahli kami siap membantu menjawab pertanyaan Anda seputar Zakat, Infaq, Sedekah, dan program pemberdayaan lainnya.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Contact Info */}
                        <div className="lg:col-span-12 lg:mb-16">
                            <FadeInUp>
                                <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Hubungi Kami Secara Langsung</h2>
                                <p className="text-gray-500 max-w-3xl text-lg font-light leading-relaxed">
                                    Kami menyediakan berbagai saluran komunikasi untuk memudahkan Anda berkonsultasi mengenai perhitungan zakat yang syar'i dan profesional.
                                </p>
                            </FadeInUp>
                        </div>

                        <div className="lg:col-span-5 space-y-6">
                            {[
                                { icon: MessageCircle, title: "WhatsApp Konsultasi", detail: "0812-3456-7890", action: "Chat Sekarang", color: "text-emerald-500", bg: "bg-emerald-50" },
                                { icon: Phone, title: "Telepon Kantor", detail: "(0286) 5962526", action: "Hubungi Kami", color: "text-blue-500", bg: "bg-blue-50" },
                                { icon: Mail, title: "Email Resmi", detail: "lazismubanjarnegara@gmail.com", action: "Kirim Email", color: "text-orange-500", bg: "bg-orange-50" },
                                { icon: Clock, title: "Jam Operasional", detail: "Senin - Sabtu, 08:00 - 16:00 WIB", action: "", color: "text-gray-400", bg: "bg-gray-100" },
                            ].map((item, i) => (
                                <FadeInUp key={i} delay={i * 0.1}>
                                    <div className="flex items-center gap-8 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all group">
                                        <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform`}>
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1.5">{item.title}</h4>
                                            <p className="text-gray-900 font-bold text-lg mb-2">{item.detail}</p>
                                            {item.action && (
                                                <button className={`text-xs font-bold ${item.color} uppercase tracking-widest hover:underline`}>
                                                    {item.action}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </FadeInUp>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-7">
                            <FadeInUp delay={0.2} className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight relative z-10">Kirim Pesan Cepat</h3>
                                <form className="space-y-8 relative z-10">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                                            <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all shadow-inner placeholder:text-gray-300" placeholder="Masukkan nama Anda" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Alamat Email</label>
                                            <input type="email" className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all shadow-inner placeholder:text-gray-300" placeholder="name@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Topik Konsultasi</label>
                                        <div className="relative">
                                            <select className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all shadow-inner appearance-none cursor-pointer">
                                                <option>Perhitungan Zakat Profesi</option>
                                                <option>Zakat Maal / Harta</option>
                                                <option>Informasi Program Donasi</option>
                                                <option>Konfirmasi Pembayaran</option>
                                                <option>Lainnya</option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Pesan Anda</label>
                                        <textarea rows={5} className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-3xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all shadow-inner resize-none placeholder:text-gray-300" placeholder="Tuliskan detail pertanyaan atau pesan Anda..."></textarea>
                                    </div>
                                    <button type="submit" className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 shadow-xl shadow-gray-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group/btn">
                                        <span>Kirim Sekarang</span>
                                        <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            </FadeInUp>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Konsultasi;
