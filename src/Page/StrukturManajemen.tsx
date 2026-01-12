import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { User, Mail, CheckCircle2 } from 'lucide-react';

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

const StrukturManajemen = () => {
    const management = [
        { name: "Nama Ketua", role: "Ketua Badan Pengurus", image: "./img/Toni.jpeg" },
        { name: "Nama Sekretaris", role: "Sekretaris", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" },
        { name: "Nama Bendahara", role: "Bendahara", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
        { name: "Nama Manajer", role: "Manajer Eksekutif", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" },
    ];

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
                                <span className="text-xs font-bold tracking-widest uppercase">Mengenal Tim Kami</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Struktur <span className="text-orange-600">Manajemen</span> <br /> & Profesionalitas
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Sinergi tim profesional yang berdedikasi tinggi dalam mengawal amanah umat di Lazismu Banjarnegara.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <FadeInUp className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Badan Pengurus & Eksekutif</h2>
                        <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full" />
                    </FadeInUp>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                        {management.map((person, index) => (
                            <FadeInUp
                                key={index}
                                delay={index * 0.1}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all group"
                            >
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-orange-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors cursor-pointer">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors cursor-pointer">
                                                <User className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 text-center bg-white border-t border-gray-50 relative z-10">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                                        {person.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest opacity-70">
                                        <span>{person.role}</span>
                                    </div>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>

                    <FadeInUp>
                        <div className="p-12 md:p-16 bg-gray-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600 translate-x-1/4 skew-x-12 opacity-90" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20" />

                            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                                        Kolaborasi Strategis
                                    </div>
                                    <h3 className="text-4xl font-bold text-white mb-6 leading-tight">Kemitraan & Divisi Kerja</h3>
                                    <p className="text-gray-300 text-lg font-light leading-relaxed mb-10">
                                        Selain manajemen inti, Lazismu Banjarnegara didukung oleh berbagai divisi operasional yang fokus pada penyaluran bantuan di pilar-pilar strategis.
                                    </p>
                                    <button className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 transform hover:-translate-y-1">
                                        Lihat Detail Divisi
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {["Divisi Zakat", "Divisi Infaq", "Divisi Program", "Divisi Media"].map((tag, i) => (
                                        <div key={i} className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[1.5rem] text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                                            <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                            <span className="font-bold tracking-tight">{tag}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeInUp>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default StrukturManajemen;
