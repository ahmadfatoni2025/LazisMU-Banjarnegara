import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import {
    ShieldCheck,
    Heart,
    Target,
    Lightbulb,
    Users,
    Scale,
    Gavel,
    Layers,
    BarChart3,
    Briefcase,
    Zap
} from 'lucide-react';

// Consistent Animation Component from home.tsx
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

const VisiMisi = () => {
    const missions = [
        "Meningkatkan kualitas pengelolaan ZIS yang amanah, profesional, dan transparan",
        "Meningkatkan pendayagunaan ZIS yang kreatif, inovatif, dan produktif",
        "Meningkatkan pelayanan donatur"
    ];

    const principles = [
        {
            title: "Syariat Islam",
            desc: "Dalam menjalankan tugas dan fungsinya, harus berpedoman sesuai syariat Islam, mulai dari tata cara perekrutan pegawai hingga tata cara pendistribusian ZISKA.",
            icon: ShieldCheck
        },
        {
            title: "Amanah dan integritas",
            desc: "Harus menjadi lembaga yang dapat dipercaya, dengan memegang teguh kode etik dan prinsip-prinsip moral.",
            icon: Heart
        },
        {
            title: "Kemanfaatan",
            desc: "Memberikan manfaat yang besar bagi mustahik.",
            icon: Target
        },
        {
            title: "Keadilan",
            desc: "Mampu bertindak adil, yakni sikap memperlakukan secara setara di dalam memenuhi hak-hak yang timbul berdasarkan perjanjian serta peraturan perundangan yang berlaku.",
            icon: Scale
        },
        {
            title: "Kepastian hukum",
            desc: "Muzaki dan mustahik harus memiliki jaminan dan kepastian hukum dalam proses pengelolaan dana ZISKA.",
            icon: Gavel
        },
        {
            title: "Terintegrasi",
            desc: "Harus dilakukan secara heirarkis sehingga mampu meningkatkan kinerja pengumpulan, pendistribusian dan pendayagunaan dana ZISKA.",
            icon: Layers
        },
        {
            title: "Akuntabilitas",
            desc: "Pengelolaan dana ZISKA harus bisa dipertanggungjawabkan kepada masyarakat dan mudah diakses oleh masyarakat dan pihak lain yang berkepentingan.",
            icon: BarChart3
        },
        {
            title: "Profesional",
            desc: "Perilaku yang selalu mengedepankan sikap dan Tindakan yang dilandasi oleh tingkat kompetensi, kredibilitas dan komitmen yang tinggi.",
            icon: Briefcase
        },
        {
            title: "Transparansi",
            desc: "Tindakan menyampaikan informasi secara transparan, konsisten, dan kredibel untuk memberikan layanan yang lebih baik dan lebih cepat kepada pemangku kepentingan.",
            icon: Lightbulb
        },
        {
            title: "Sinergi",
            desc: "Sikap membangun dan memastikan hubungan kerja sama internal yang produktif serta kemitraan yang harmonis dengan para pemangku kepentingan dana ZISKA untuk menghasilkan karya yang bermanfaat dan berkualitas.",
            icon: Users
        },
        {
            title: "Berkemajuan",
            desc: "Melakukan sesuatu secara baik and benar yang berorientasi ke depan.",
            icon: Zap
        }
    ];

    const goals = [
        "Meningkatkan efektivitas dan efisiensi pelayanan dalam pengelolaan dana ZISKA dalam rangka mencapai maksud dan tujuan Persyarikatan;",
        "Meningkatkan manfaat dana ZISKA untuk mewujudkan kesejahteraan masyarakat dan penanggulangan kemiskinan dalam rangka mencapai maksud dan tujuan Persyarikatan;",
        "Meningkatkan kemampuan ekonomi umat melalui pemberdayaan usaha-usaha produktif."
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
                                <span className="text-xs font-bold tracking-widest uppercase">Tentang kami</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Landasan <span className="text-orange-600">Visi, Misi</span> <br /> & Perjuangan Kami
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Membangun kepercayaan melalui tata kelola yang profesional dan transparan demi mewujudkan kemandirian umat yang berkemajuan.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* Visi Section - Modern Bento Style */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-7">
                            <FadeInUp className="h-full bg-white p-12 md:p-16 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                                <div className="relative z-10">
                                    <div className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-6">Visi Utama</div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                                        "Menjadi Lembaga Amil Zakat <span className="text-orange-600 italic">Terpercaya</span>"
                                    </h2>
                                    <p className="text-lg text-gray-500 leading-relaxed font-light">
                                        Lazismu Banjarnegara bertekad untuk menjadi pelopor dalam pengelolaan zakat yang modern, mengedepankan nilai-nilai kepercayaan (trust) sebagai modal utama dalam melayani muzaki dan mustahik di seluruh Banjarnegara.
                                    </p>
                                </div>
                            </FadeInUp>
                        </div>
                        <div className="lg:col-span-5">
                            <FadeInUp delay={0.2} className="h-full relative overflow-hidden rounded-[2.5rem] min-h-[400px] shadow-lg group">
                                <img
                                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
                                    alt="Trust and Integrity"
                                    className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-orange-900/40 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-sm font-bold tracking-widest uppercase mb-1">Integritas</p>
                                    <p className="text-xs opacity-80">Melayani dengan Sepenuh Hati</p>
                                </div>
                            </FadeInUp>
                        </div>
                    </div>
                </div>
            </section>

            {/* Misi Section - Clean Cards */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <FadeInUp className="text-center mb-16">
                        <div className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4">Misi Strategis</div>
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">Langkah Nyata Mewujudkan Perubahan</h2>
                        <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full"></div>
                    </FadeInUp>

                    <div className="grid md:grid-cols-3 gap-8">
                        {missions.map((mission, index) => (
                            <FadeInUp key={index} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    className="h-full bg-gray-50/50 p-10 rounded-3xl border border-gray-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-orange-500/5"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-600 text-xl font-bold shadow-xs mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                        0{index + 1}
                                    </div>
                                    <p className="text-gray-900 font-semibold leading-relaxed text-lg flex-1">
                                        {mission}
                                    </p>
                                </motion.div>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prinsip Section - Refined Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
                        <FadeInUp className="max-w-xl">
                            <div className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4">Etika & Budaya Kerja</div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Prinsip Pengelolaan ZISKA</h2>
                            <p className="text-gray-500 text-lg font-light leading-relaxed">
                                Kami memegang teguh 11 prinsip dasar dalam setiap jengkal aktivitas kami untuk memastikan akuntabilitas spiritual dan profesional.
                            </p>
                        </FadeInUp>
                        <FadeInUp delay={0.2} className="hidden lg:block">
                            <div className="text-orange-600 italic text-2xl">Trust & Professionalism</div>
                        </FadeInUp>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {principles.map((principle, index) => (
                            <FadeInUp key={index} delay={index * 0.05}>
                                <div className="h-full bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group">
                                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                        <principle.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{principle.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light">
                                        {principle.desc}
                                    </p>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tujuan Section - Dark Elegant Finish */}
            <section className="py-24 mb-16">
                <div className="container mx-auto px-6">
                    <div className="bg-gray-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600 translate-x-1/4 skew-x-12 opacity-90" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-10 md:p-20">
                            <div>
                                <FadeInUp>
                                    <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                                        Our Purpose
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-10">
                                        Mewujudkan Kemaslahatan <br className="hidden md:block" /> Umat yang Mandiri
                                    </h2>
                                    <div className="space-y-8">
                                        {goals.map((goal, index) => (
                                            <div key={index} className="flex items-start gap-5">
                                                <div className="mt-1 w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 transition-transform group-hover:scale-125" />
                                                </div>
                                                <p className="text-gray-300 font-light leading-relaxed">
                                                    {goal}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </FadeInUp>
                            </div>
                            <FadeInUp delay={0.2} className="hidden lg:block relative">
                                <div className="aspect-4/5 rounded-3xl overflow-hidden border-8 border-white/5 rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
                                        alt="Impact"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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

export default VisiMisi;
