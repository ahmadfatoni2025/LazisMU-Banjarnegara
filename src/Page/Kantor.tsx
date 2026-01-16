import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageCircle, Navigation } from 'lucide-react';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

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

const Kantor = () => {
    const officeData = {
        name: "Lazismu Banjarnegara",
        address: "Jl. Pemuda No.83, Kutabanjarnegara, Kec. Banjarnegara, Kab. Banjarnegara, Jawa Tengah 53418",
        phone: "(0286) 5962526",
        wa: "6281234567890",
        email: "lazismubanjarnegara@gmail.com",
        hours: [
            { day: "Senin - Jumat", time: "08.00 - 16.00 WIB" },
            { day: "Sabtu", time: "08.00 - 14.00 WIB" },
            { day: "Minggu", time: "Tutup" }
        ]
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
                                <span className="text-xs font-bold tracking-widest uppercase">Kontak Kami</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Kantor <span className="text-orange-600">Layanan</span> <br /> & Lokasi
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Kunjungi kantor kami untuk konsultasi zakat, penyaluran donasi langsung, atau informasi program pemberdayaan.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Info Column */}
                        <div className="lg:col-span-6 space-y-12">
                            <FadeInUp>
                                <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">{officeData.name}</h2>
                                <p className="text-gray-500 leading-relaxed text-lg font-light mb-12">
                                    Pusat koordinasi pengelolaan dana ZISKA di wilayah Banjarnegara. Kami melayani dengan sepenuh hati demi kemaslahatan umat.
                                </p>
                            </FadeInUp>

                            <div className="grid gap-6">
                                <FadeInUp delay={0.1}>
                                    <div className="flex gap-8 p-8 bg-white rounded-[2.5rem] border border-gray-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group">
                                        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 shadow-xs group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                            <MapPin className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Alamat Utama</h4>
                                            <p className="text-gray-900 font-medium leading-relaxed">{officeData.address}</p>
                                        </div>
                                    </div>
                                </FadeInUp>

                                <FadeInUp delay={0.2}>
                                    <div className="flex gap-8 p-8 bg-white rounded-[2.5rem] border border-gray-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group text-balance">
                                        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 shadow-xs group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                            <Phone className="w-7 h-7" />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-8 w-full">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Telepon</h4>
                                                <p className="text-gray-900 font-bold text-lg">{officeData.phone}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Email</h4>
                                                <p className="text-gray-900 font-medium truncate">{officeData.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </FadeInUp>

                                <FadeInUp delay={0.3}>
                                    <div className="flex gap-8 p-8 bg-white rounded-[2.5rem] border border-gray-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group">
                                        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 shadow-xs group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                            <Clock className="w-7 h-7" />
                                        </div>
                                        <div className="w-full">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Jam Layanan</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {officeData.hours.map((item, index) => (
                                                    <div key={index}>
                                                        <p className="text-xs font-bold text-gray-900 tracking-tight">{item.day}</p>
                                                        <p className="text-sm text-gray-500 font-light">{item.time}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </FadeInUp>
                            </div>

                            <FadeInUp delay={0.4} className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a
                                    href={`https://wa.me/${officeData.wa}`}
                                    className="px-10 py-5 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                                >
                                    <MessageCircle className="w-6 h-6" /> Hubungi WhatsApp
                                </a>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=Lazismu+Banjarnegara`}
                                    className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 shadow-xl shadow-gray-950/20 active:scale-95 transition-all"
                                >
                                    <Navigation className="w-6 h-6" /> Petunjuk Arah
                                </a>
                            </FadeInUp>
                        </div>

                        {/* Map Column */}
                        <div className="lg:col-span-6">
                            <FadeInUp delay={0.4} className="relative">
                                <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl h-[700px] border-8 border-white group">
                                    <iframe
                                        title="Peta Lazismu Banjarnegara"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src="https://maps.google.com/maps?q=Lazismu+Banjarnegara,+Jl.+Pemuda+No.83&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                        className="grayscale-[0.2] contrast-[1.1] transition-all hover:grayscale-0"
                                    ></iframe>
                                </div>
                            </FadeInUp>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Kantor;