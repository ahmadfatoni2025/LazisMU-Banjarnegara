import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import PageHero from '../ui/PageHero';
import { FileDown, CheckCircle, BarChart3, Users } from 'lucide-react';

const LaporanSemester = () => {
    const semesters = [
        { period: "Semester 2 - 2024", date: "Juli - Desember 2024", highlight: "Penyaluran Zakat meningkat 15% dibanding semester sebelumnya." },
        { period: "Semester 1 - 2024", date: "Januari - Juni 2024", highlight: "Fokus pada program Kado Ramadhan dan Tebar Takjil." },
        { period: "Semester 2 - 2023", date: "Juli - Desember 2023", highlight: "Pemberdayaan UMKM di 5 kecamatan binaan baru." },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <PageHero
                title="Laporan Semester"
                subtitle="Pantau perkembangan program dan akuntabilitas setiap tengah tahun."
            />

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {[
                            { icon: <BarChart3 className="w-6 h-6 text-orange-600" />, label: "Target Capaian", value: "92%" },
                            { icon: <Users className="w-6 h-6 text-blue-600" />, label: "Penerima Manfaat", value: "+5,200" },
                            { icon: <CheckCircle className="w-6 h-6 text-emerald-600" />, label: "Program Terlaksana", value: "12" },
                            { icon: <FileDown className="w-6 h-6 text-purple-600" />, label: "Laporan Valid", value: "100%" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
                            >
                                <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto space-y-8">
                        {semesters.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.period}</h3>
                                            <p className="text-orange-600 font-bold text-sm tracking-wide uppercase">{item.date}</p>
                                        </div>
                                        <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shrink-0">
                                            <FileDown className="w-5 h-5" /> Download Report
                                        </button>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-orange-500">
                                        <p className="text-gray-600 italic leading-relaxed">
                                            "{item.highlight}"
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LaporanSemester;
