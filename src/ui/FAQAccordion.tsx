import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className="border-b border-gray-100 last:border-none">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between gap-4 text-left transition-colors group"
            >
                <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-orange-600' : 'text-gray-900 group-hover:text-orange-500'}`}>
                    {question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-orange-600 text-white rotate-180' : 'bg-orange-50 text-orange-600'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-600 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "Apa itu Lazismu?",
            answer: "Lazismu adalah lembaga amil zakat nasional yang berkhidmat dalam pemberdayaan masyarakat melalui pendayagunaan secara produktif dana zakat, infaq, wakaf dan dana sosial keagamaan lainnya baik dari perseorangan, lembaga, perusahaan dan instansi lainnya."
        },
        {
            question: "Bagaimana cara berdonasi di Lazismu Banjarnegara?",
            answer: "Anda dapat berdonasi secara online melalui website ini dengan memilih program yang diinginkan, atau melalui transfer bank ke rekening resmi kami. Selain itu, Anda juga dapat datang langsung ke kantor layanan kami di Banjarnegara."
        },
        {
            question: "Apakah donasi di Lazismu amanah dan transparan?",
            answer: "Sangat amanah. Lazismu berkomitmen pada prinsip transparansi dan akuntabilitas. Seluruh dana dikelola secara profesional dan laporan keuangan diaudit secara berkala oleh Kantor Akuntan Publik (KAP) independen serta dipublikasikan kepada publik."
        },
        {
            question: "Apa saja pilar program utama Lazismu?",
            answer: "Lazismu memiliki 6 pilar program utama untuk menyalurkan dana ZIS: Pendidikan (Beasiswa Mentari), Kesehatan (Klinik Apung/Layanan Ambulans), Ekonomi (Pemberdayaan UMKM), Sosial Dakwah, Kemanusiaan (Respons Kebencanaan), dan Lingkungan."
        },
        {
            question: "Di mana lokasi kantor Lazismu Banjarnegara?",
            answer: "Kantor Lazismu Banjarnegara berlokasi di pusat kota Banjarnegara. Kami selalu terbuka bagi Anda yang ingin berkonsultasi mengenai zakat atau menyalurkan bantuan secara langsung."
        }
    ];

    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Side: Header */}
                    <div className="lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-6">
                                <HelpCircle className="w-4 h-4" />
                                <span className="text-sm font-bold uppercase tracking-wider">Tanya Jawab</span>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                Segala Hal yang Perlu Anda Ketahui
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Masih memiliki pertanyaan seputar Lazismu? Kami telah merangkum beberapa pertanyaan yang paling sering diajukan untuk membantu Anda.
                            </p>
                            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <p className="font-semibold text-gray-900 mb-2">Masih butuh bantuan?</p>
                                <p className="text-sm text-gray-500 mb-4">Tim kami siap membantu Anda secara langsung via WhatsApp.</p>
                                <a
                                    href="#"
                                    className="inline-flex items-center text-orange-600 font-bold hover:gap-2 transition-all"
                                >
                                    Hubungi Service Center →
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Accordion */}
                    <div className="lg:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-orange-900/5 border border-gray-100"
                        >
                            <div className="divide-y divide-gray-100">
                                {faqs.map((faq, index) => (
                                    <FAQItem
                                        key={index}
                                        question={faq.question}
                                        answer={faq.answer}
                                        isOpen={openIndex === index}
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQAccordion;
