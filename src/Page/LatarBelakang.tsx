import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { History, Target, ShieldCheck } from 'lucide-react';

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

const LatarBelakang = () => {
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
                                Latar Belakang <br /> & <span className="text-orange-600">Sejarah Kami</span>
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Memahami sejarah berdirinya Lazismu dan komitmen kami dalam mengelola amanah umat dengan profesionalisme tinggi.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
                        <div className="lg:col-span-7">
                            <FadeInUp className="bg-white p-12 md:p-16 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                                <div className="relative z-10">
                                    <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Sejarah Berdiri</h2>
                                    <div className="space-y-6">
                                        <p className="text-gray-600 leading-relaxed text-lg font-light">
                                            Lazismu adalah lembaga zakat tingkat nasional yang berkhidmat dalam pemberdayaan masyarakat melalui pengelolaan dana zakat, infaq, sedekah serta dana sosial keagamaan lainnya (ZISKA) dari perseorangan, lembaga, perusahaan dan instansi lainnya yang didirikan oleh Muhammadiyah pada tahun 2002.
                                        </p>
                                        <p className="text-gray-600 leading-relaxed text-lg font-light">
                                            Di Banjarnegara, Lazismu hadir untuk merespon berbagai persoalan kemiskinan dan kesenjangan sosial yang masih menjadi tantangan besar. Dengan semangat transparansi dan profesionalisme, kami berkomitmen untuk menjadi jembatan kebaikan antara Muzakki dan Mustahik.
                                        </p>
                                    </div>
                                </div>
                            </FadeInUp>
                        </div>
                        <div className="lg:col-span-5">
                            <FadeInUp delay={0.2} className="relative h-full">
                                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                                    <img
                                        src="https://pwmjateng.com/wp-content/uploads/2017/03/Lazismu-768x511.jpg"
                                        alt="Lazismu History"
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-orange-950/40 to-transparent" />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-8 rounded-3xl shadow-xl hidden md:block rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <p className="text-5xl font-bold mb-1 tracking-tighter">20+</p>
                                    <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-80">Tahun Mengabdi</p>
                                </div>
                            </FadeInUp>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: History,
                                title: "Nilai Dasar",
                                desc: "Keadilan, Integritas, dan Profesionalitas dalam setiap penyaluran dana untuk umat."
                            },
                            {
                                icon: Target,
                                title: "Fokus Utama",
                                desc: "Pemberdayaan ekonomi, kesehatan, pendidikan, dan layanan sosial dakwah."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Akuntabilitas",
                                desc: "Laporan keuangan yang teraudit dan dapat diakses oleh publik secara berkala dan transparan."
                            }
                        ].map((item, index) => (
                            <FadeInUp
                                key={index}
                                delay={index * 0.1}
                                className="p-10 bg-white rounded-[2rem] border border-gray-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group"
                            >
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-light">{item.desc}</p>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LatarBelakang;
