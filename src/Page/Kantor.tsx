
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Kantor = () => {
    const navigate = useNavigate();

    // Data Kantor Lazismu Banjarnegara (Real Data)
    const officeData = {
        address: "Jl. Pemuda No.83, Kutabanjarnegara, Kec. Banjarnegara, Kab. Banjarnegara, Jawa Tengah 53418",
        phone: "(0286) 5962526",
        wa: "6281234567890", // Sesuaikan dengan nomor WA admin
        email: "lazismubanjarnegara@gmail.com", // Email dummy (bisa disesuaikan)
        hours: [
            { day: "Senin - Jumat", time: "08.00 - 16.00 WIB" },
            { day: "Sabtu", time: "08.00 - 14.00 WIB" },
            { day: "Minggu", time: "Tutup" }
        ]
    };

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-poppins pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* TOMBOL KEMBALI */}
                <button 
                    onClick={handleBackHome}
                    className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors duration-200 mb-8 font-medium text-sm group"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform duration-200">&#8592;</span> 
                    Kembali ke Beranda
                </button>

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Kantor Layanan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kunjungi kantor kami untuk konsultasi zakat, layanan donasi, atau informasi program lebih lanjut.
                    </p>
                </motion.div>

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* KOLOM KIRI: Informasi Kantor */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="text-orange-500">📍</span> Lazismu Banjarnegara
                        </h3>
                        
                        {/* Alamat */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-2">Alamat Lengkap</h4>
                            <p className="text-gray-600 leading-relaxed">
                                {officeData.address}
                            </p>
                        </div>

                        {/* Kontak */}
                        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Telepon Kantor</h4>
                                <p className="text-gray-600">{officeData.phone}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                                <p className="text-gray-600">{officeData.email}</p>
                            </div>
                        </div>

                        {/* Jam Operasional */}
                        <div className="mb-8">
                            <h4 className="font-semibold text-gray-900 mb-3">Jam Operasional</h4>
                            <div className="space-y-2">
                                {officeData.hours.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                                        <span className="text-gray-600">{item.day}</span>
                                        <span className="font-medium text-gray-800">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tombol Action WA */}
                        <a 
                            href={`https://wa.me/${officeData.wa}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-green-200"
                        >
                            Hubungi via WhatsApp
                        </a>
                    </motion.div>

                    {/* KOLOM KANAN: Maps Embed */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-200 rounded-2xl overflow-hidden shadow-md h-[500px] relative"
                    >
                        {/* Google Maps Iframe */}
                        <iframe 
                            title="Peta Lazismu Banjarnegara"
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            loading="lazy" 
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            // URL Embed Otomatis ke Alamat Lazismu Banjarnegara
                            src="https://maps.google.com/maps?q=Lazismu+Banjarnegara,+Jl.+Pemuda+No.83&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Kantor;