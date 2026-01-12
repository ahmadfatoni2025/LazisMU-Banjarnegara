import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { ArrowRight, GraduationCap, HeartPulse, Sprout, HandHelping } from 'lucide-react';

interface ProgramData {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    slug: string;
    icon: React.ReactNode;
    color: string;
}

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

const Program = () => {
    const programs: ProgramData[] = [
        {
            id: 1,
            title: "Pendidikan: Beasiswa Mentari",
            category: "Pendidikan",
            icon: <GraduationCap className="w-8 h-8" />,
            color: "orange",
            image: "https://images.unsplash.com/photo-1497633275055-64e402fae477?auto=format&fit=crop&q=80",
            description: "Memberikan akses pendidikan berkualitas bagi anak yatim dan dhuafa di Banjarnegara agar tetap bisa meraih cita-cita.",
            slug: "beasiswa-mentari"
        },
        {
            id: 2,
            title: "Kesehatan: Mobile Clinic",
            category: "Kesehatan",
            icon: <HeartPulse className="w-8 h-8" />,
            color: "emerald",
            image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80",
            description: "Layanan pemeriksaan kesehatan gratis dan jemput bola bagi masyarakat di pelosok desa yang sulit menjangkau faskes.",
            slug: "mobile-clinic"
        },
        {
            id: 3,
            title: "Ekonomi: Pemberdayaan UMKM",
            category: "Ekonomi",
            icon: <Sprout className="w-8 h-8" />,
            color: "amber",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
            description: "Bantuan modal usaha dan pendampingan bisnis bagi pedagang kecil untuk meningkatkan kemandirian ekonomi keluarga.",
            slug: "pemberdayaan-umkm"
        },
        {
            id: 4,
            title: "Sosial: Kemanusiaan",
            category: "Sosial",
            icon: <HandHelping className="w-8 h-8" />,
            color: "blue",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
            description: "Respon cepat tanggap darurat bencana dan bantuan pangan untuk lansia sebatang kara serta kaum dhuafa.",
            slug: "kemanusiaan"
        }
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
                                <span className="text-xs font-bold tracking-widest uppercase">Pilar Strategis</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Program <span className="text-orange-600">Unggulan</span> <br /> & Pemberdayaan
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Transformasi zakat, infaq dan sedekah menjadi solusi nyata melalui empat pilar utama pembangunan masyarakat.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* Program Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {programs.map((item, index) => (
                            <FadeInUp
                                key={item.id}
                                delay={index * 0.1}
                                className="group relative h-[550px] rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-1000"
                            >
                                {/* Background Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                />

                                {/* Overlay Gradient - More subtle and professional */}
                                <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent group-hover:from-gray-950 group-hover:via-gray-950/60 transition-all duration-700" />

                                {/* Content */}
                                <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-end text-white">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-orange-600 group-hover:border-transparent group-hover:scale-110 transition-all duration-500">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-4xl font-bold mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 tracking-tight">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-300 text-lg mb-12 opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100 leading-relaxed font-light line-clamp-3">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                                        <Link
                                            to={`/program/${item.slug}`}
                                            className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-orange-600 hover:text-white transition-all flex items-center gap-3 shadow-xl active:scale-95"
                                        >
                                            Ekspor Program <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">{item.category}</span>
                                    </div>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Statement - Redesigned to be like an elegant bento/CTA */}
            <section className="py-24 mb-16">
                <div className="container mx-auto px-6">
                    <FadeInUp>
                        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600 translate-x-1/4 skew-x-12 opacity-90" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20" />

                            <div className="relative z-10 max-w-4xl mx-auto">
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                                    Menciptakan Dampak <br className="hidden md:block" /> yang <span className="italic text-orange-400">Berkelanjutan</span>.
                                </h2>
                                <p className="text-gray-400 text-xl mb-16 leading-relaxed font-light">
                                    Setiap kontribusi Anda adalah investasi masa depan bagi mereka yang membutuhkan. Mari bersama Lazismu Banjarnegara membangun kemandirian umat melalui program-program strategis kami.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-6">
                                    <Link to="/#donasi-section" className="px-12 py-5 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-700 shadow-xl shadow-orange-600/20 active:scale-95 transition-all">
                                        Berdonasi Sekarang
                                    </Link>
                                    <Link to="/laporan-keuangan" className="px-12 py-5 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                                        Lihat Laporan Dampak
                                    </Link>
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

export default Program;