
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate

// Tipe Data
interface ProgramData {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    slug: string;
}

const Program = () => {
    const navigate = useNavigate(); // 2. Init Hook Navigasi

    // Fungsi Balik ke Home
    const handleBackHome = () => {
        navigate('/');
    };

    // DATA DUMMY (Kosongkan array ini [] jika ingin mode kosong/empty state)
    const programs: ProgramData[] = [
        {
            id: 1,
            title: "Beasiswa Mentari",
            category: "Pendidikan",
            image: "https://placehold.co/600x400/orange/white?text=Pendidikan",
            description: "Program bantuan biaya pendidikan bagi siswa kurang mampu yang berprestasi di Banjarnegara.",
            slug: "beasiswa-mentari"
        },
        {
            id: 2,
            title: "Peduli Bencana Alam",
            category: "Kemanusiaan",
            image: "https://placehold.co/600x400/red/white?text=Bencana",
            description: "Tanggap darurat dan bantuan logistik untuk korban bencana alam di wilayah sekitar.",
            slug: "peduli-bencana"
        },
        {
            id: 3,
            title: "Jumat Berkah",
            category: "Sosial Dakwah",
            image: "https://placehold.co/600x400/green/white?text=Jumat+Berkah",
            description: "Berbagi nasi bungkus dan kebutuhan pokok setiap hari Jumat untuk kaum dhuafa.",
            slug: "jumat-berkah"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            {/* --- HEADER SECTION --- */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    
                    {/* 3. TOMBOL KEMBALI KE BERANDA (Posisi Kiri Atas) */}
                    <button 
                        onClick={handleBackHome}
                        className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors duration-200 mb-6 font-medium text-sm group"
                    >
                        <span className="transform group-hover:-translate-x-1 transition-transform duration-200">&#8592;</span> 
                        Kembali ke Beranda
                    </button>

                    <div className="text-center pb-4">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-gray-800 mb-2"
                        >
                            Program Lazismu
                        </motion.h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Berbagai inisiatif kebaikan untuk memberdayakan umat dan membantu sesama.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- CONTENT GRID SECTION --- */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                
                {programs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                            >
                                {/* Gambar Program */}
                                <div className="h-48 overflow-hidden bg-gray-200 relative">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        {item.category}
                                    </div>
                                </div>

                                {/* Konten Program */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                        {item.description}
                                    </p>
                                    
                                    <Link 
                                        to={`/program/${item.slug}`} 
                                        className="inline-block text-center mt-auto w-full py-2 px-4 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    // --- TAMPILAN JIKA KOSONG (Empty State) ---
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">📭</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700">Belum ada program saat ini</h3>
                        <p className="text-gray-500 mt-2">Nantikan program-program kebaikan terbaru dari kami.</p>
                        
                        {/* Tombol Balik di Empty State juga (Opsional, buat jaga-jaga) */}
                        <button 
                            onClick={handleBackHome}
                            className="mt-6 px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-colors"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Program;