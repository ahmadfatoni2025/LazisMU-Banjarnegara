import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
    {
        question: "Apa itu Lazismu Banjarnegara?",
        answer: "Lazismu adalah lembaga zakat, infaq, dan sharada tingkat nasional yang berkhidmat dalam pemberdayaan masyarakat melalui pendayagunaan secara produktif dana zakat, infaq, wakaf dan dana sosial keagamaan lainnya."
    },
    {
        question: "Bagaimana cara menyalurkan donasi?",
        answer: "Anda dapat menyalurkan donasi melalui transfer bank (BSI, Bank Jateng Syariah, Muamalat), QRIS, atau datang langsung ke kantor layanan kami."
    },
    {
        question: "Apakah donasi saya disalurkan tepat sasaran?",
        answer: "Tentu. Kami memiliki sistem audit berkala dan menyalurkan dana melalui 6 pilar program utama: Pendidikan, Kesehatan, Ekonomi, Sosial Dakwah, Kemanusiaan, dan Lingkungan."
    },
    {
        question: "Bagaimana cara mendapatkan bukti setor zakat?",
        answer: "Konfirmasi melalui WhatsApp admin dengan melampirkan bukti transfer. Kami akan mengirimkan Bukti Setor Zakat (BSZ) resmi secara digital."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) => (
    <div className={`mb-4 border rounded-3xl overflow-hidden transition-all duration-500 ${isOpen ? 'bg-white border-orange-200 shadow-2xl shadow-orange-500/10' : 'bg-gray-50/50 border-gray-100 hover:border-orange-100'}`}>
        <button onClick={onClick} className="w-full px-8 py-6 text-left flex items-center justify-between gap-4 focus:outline-none">
            <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-orange-600 text-white rotate-12' : 'bg-white text-gray-400 shadow-sm'}`}>
                    <HelpCircle size={24} />
                </div>
                <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-gray-900' : 'text-gray-600'}`}>
                    {question}
                </span>
            </div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={isOpen ? 'text-orange-600' : 'text-gray-300'}>
                <ChevronDown size={28} />
            </motion.div>
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}>
                    <div className="px-8 pb-8 pt-2 ml-16 md:ml-20">
                        <p className="text-gray-500 text-lg leading-relaxed border-l-2 border-orange-100 pl-6">
                            {answer}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Dynamic Background Accents */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-linear-to-bl from-orange-100/30 via-transparent to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-linear-to-tr from-blue-50/40 via-transparent to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-20">
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs font-black tracking-widest uppercase mb-6 shadow-sm border border-orange-100">
                        <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                        Pusat Bantuan
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
                        Pertanyaan <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-500">Populer.</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed">
                        Semua yang perlu Anda ketahui tentang berdonasi dan transparansi di Lazismu Banjarnegara.
                    </motion.p>
                </div>

                <div className="grid gap-2">
                    {faqs.map((faq, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                            <FAQItem
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mt-8 p-1 bg-linear-to-r from-orange-500 to-amber-400 rounded-4xl shadow-2xl shadow-orange-500/20">
                    <div className="bg-white rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Masih punya pertanyaan?</h4>
                            <p className="text-gray-500 text-lg">Tim kami siap membantu Anda 24/7 melalui layanan WhatsApp.</p>
                        </div>
                        <a href="https://wa.me/6281393024399" className="group relative px-10 py-5 bg-gray-900 text-white rounded-4xl font-bold flex items-center gap-3 overflow-hidden transition-all hover:scale-105 hover:bg-orange-600">
                            <MessageCircle className="w-6 h-6" />
                            <span>Hubungi Sekarang</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQAccordion;
