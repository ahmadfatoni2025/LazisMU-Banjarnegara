import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { Download, FileText, PieChart, TrendingUp } from 'lucide-react';

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

const LaporanKeuangan = () => {
    const reports = [
        { year: "2024", title: "Laporan Tahunan 2024", status: "Audited", size: "4.5 MB" },
        { year: "2023", title: "Laporan Tahunan 2023", status: "Audited", size: "3.8 MB" },
        { year: "2022", title: "Laporan Tahunan 2022", status: "Audited", size: "4.2 MB" },
        { year: "2021", title: "Laporan Tahunan 2021", status: "Audited", size: "3.5 MB" },
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
                                <span className="text-xs font-bold tracking-widest uppercase">Transparansi Publik</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Laporan <br /> <span className="text-orange-600">Keuangan</span> & Audit
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Komitmen kami dalam menjaga amanah melalui pelaporan keuangan yang transparan, akuntabel, dan profesional.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8 mb-24">
                        {[
                            { icon: PieChart, label: "Total Penyaluran", value: "Rp 24.5 M", color: "text-blue-600", bg: "bg-blue-50/50" },
                            { icon: TrendingUp, label: "Target 2025", value: "Rp 30.0 M", color: "text-emerald-600", bg: "bg-emerald-50/50" },
                            { icon: FileText, label: "Jumlah Donatur", value: "12,450+", color: "text-orange-600", bg: "bg-orange-50/50" },
                        ].map((stat, i) => (
                            <FadeInUp
                                key={i}
                                delay={i * 0.1}
                                className={`${stat.bg} p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/20 transition-all group`}
                            >
                                <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${stat.color} mb-8 shadow-xs group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-7 h-7" />
                                </div>
                                <div className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2 opacity-70">{stat.label}</div>
                                <div className="text-4xl font-bold text-gray-900 tracking-tight">{stat.value}</div>
                            </FadeInUp>
                        ))}
                    </div>

                    <FadeInUp>
                        <div className="bg-white rounded-[3rem] p-8 lg:p-16 border border-gray-100 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 text-center md:text-left">
                                <div className="max-w-xl mx-auto md:mx-0">
                                    <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Arsip Laporan</h2>
                                    <p className="text-gray-500 font-light text-lg">Unduh detail laporan keuangan tahunan dalam format digital (PDF).</p>
                                </div>
                                <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shadow-inner w-full md:w-auto">
                                    <button className="flex-1 px-8 py-3 bg-white text-orange-600 rounded-xl font-bold shadow-sm">Tahunan</button>
                                    <button className="flex-1 px-8 py-3 text-gray-500 font-bold hover:text-orange-600 transition-colors">Bulanan</button>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {reports.map((report, index) => (
                                    <FadeInUp
                                        key={index}
                                        delay={index * 0.05}
                                        className="bg-gray-50/50 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between border border-transparent hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 group transition-all"
                                    >
                                        <div className="flex items-center gap-8 mb-6 sm:mb-0">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xs group-hover:bg-orange-600 transition-colors duration-300">
                                                <FileText className="w-8 h-8 text-gray-400 group-hover:text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{report.title}</h3>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">{report.status}</span>
                                                    <span className="text-xs font-medium text-gray-400">{report.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95 group-hover:shadow-orange-600/20">
                                            <Download className="w-5 h-5" />
                                            <span>Download PDF</span>
                                        </button>
                                    </FadeInUp>
                                ))}
                            </div>
                        </div>
                    </FadeInUp>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LaporanKeuangan;
