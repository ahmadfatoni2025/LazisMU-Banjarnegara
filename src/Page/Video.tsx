import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { Play, Calendar, Eye, ArrowRight, X } from 'lucide-react';

const FadeInUp = ({ children, delay = 0, className = "", onClick }: { children: React.ReactNode, delay?: number, className?: string, onClick?: () => void }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
        onClick={onClick}
    >
        {children}
    </motion.div>
);

const Video = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const videos = [
        {
            title: "Profil Lazismu Banjarnegara 2024",
            desc: "Dokumentasi perjalanan dan pelayanan Lazismu selama satu tahun terakhir dalam membangun umat.",
            thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80",
            duration: "05:24",
            date: "10 Jan 2024",
            views: "1.2K",
            youtubeId: "ZRA2yYt7oXY" // Example ID
        },
        {
            title: "Program Pemberdayaan Ekonomi Masyarakat",
            desc: "Kisah sukses UMKM binaan Lazismu di pelosok Banjarnegara yang kini telah mandiri.",
            thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
            duration: "08:15",
            date: "15 Des 2023",
            views: "856",
            youtubeId: "ZRA2yYt7oXY"
        },
        {
            title: "Penyaluran Kado Ramadhan 1445 H",
            desc: "Kebahagiaan para Mustahik saat menerima bantuan di bulan suci Ramadhan kemarin.",
            thumbnail: "https://images.unsplash.com/photo-1591033594798-33227a05780d?auto=format&fit=crop&q=80",
            duration: "03:45",
            date: "02 Apr 2024",
            views: "2.5K",
            youtubeId: "ZRA2yYt7oXY"
        },
    ];

    const featuredVideoId = "ZRA2yYt7oXY";

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            {/* Video Player Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all border border-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Minimalist Page Header */}
            <section className="pt-40 pb-20 bg-white shadow-xs">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <FadeInUp>
                            <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-100 text-orange-600 px-4 py-1.5 rounded-full mb-8">
                                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                                <span className="text-xs font-bold tracking-widest uppercase">Galeri Visual</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Dokumentasi <br /> <span className="text-orange-600">Video</span> & Aksi
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                                Saksikan jejak langkah kebaikan dan dampak nyata dari setiap program yang telah kita jalankan bersama untuk Banjarnegara.
                            </p>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    {/* Featured Video */}
                    <FadeInUp className="relative rounded-[3rem] overflow-hidden shadow-2xl mb-24 aspect-video md:aspect-[21/9] group cursor-pointer"
                        onClick={() => setSelectedVideo(featuredVideoId)}
                    >
                        <img
                            src="https://lazismukabcirebon.org/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-17-at-12.37.35-1024x768.jpeg"
                            alt="Featured Video"
                            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-orange-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16">
                            <FadeInUp delay={0.2}>
                                <div className="text-orange-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">Video Pilihan</div>
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">Mewujudkan Harapan <br className="hidden md:block" /> di Setiap Pelosok</h2>
                                <p className="text-gray-300 text-lg max-w-2xl mb-10 font-light leading-relaxed">Video dokumentasi dampak penyaluran zakat terhadap pendidikan anak yatim dan dhuafa di wilayah terpencil Banjarnegara.</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedVideo(featuredVideoId); }}
                                    className="flex items-center gap-4 w-fit px-10 py-5 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 active:scale-95 group/play"
                                >
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover/play:scale-110 transition-transform">
                                        <Play className="w-4 h-4 fill-current ml-0.5" />
                                    </div>
                                    <span>Putar Dokumentasi</span>
                                </button>
                            </FadeInUp>
                        </div>
                    </FadeInUp>

                    <FadeInUp className="flex items-end justify-between mb-16 gap-6">
                        <div>
                            <div className="text-orange-600 font-bold tracking-widest uppercase text-[10px] mb-4">Archive</div>
                            <h3 className="text-4xl font-bold text-gray-900 tracking-tight">Eksplorasi Video</h3>
                        </div>
                        <div className="hidden md:block w-32 h-px bg-gray-100 mb-4"></div>
                    </FadeInUp>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video, index) => (
                            <FadeInUp
                                key={index}
                                delay={index * 0.1}
                                className="bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all group cursor-pointer"
                                onClick={() => setSelectedVideo(video.youtubeId)}
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-orange-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-600 scale-75 group-hover:scale-100 transition-all duration-500 shadow-xl">
                                            <Play className="w-6 h-6 fill-current ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-5 right-5 px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold rounded-full shadow-sm">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-[0.2em]">
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                            <Calendar className="w-3.5 h-3.5" /> {video.date}
                                        </div>
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                            <Eye className="w-3.5 h-3.5" /> {video.views} Dilihat
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors tracking-tight line-clamp-1">
                                        {video.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light line-clamp-2">
                                        {video.desc}
                                    </p>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedVideo(video.youtubeId); }}
                                            className="text-[10px] font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all"
                                        >
                                            Tonton Video <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>

                    <FadeInUp delay={0.4} className="mt-20 text-center">
                        <a
                            href="https://www.youtube.com/@lazismubanjarnegara"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white border border-gray-100 text-gray-900 rounded-2xl font-bold hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm hover:shadow-xl hover:shadow-orange-500/10 active:scale-95"
                        >
                            Lihat Channel YouTube Kami
                        </a>
                    </FadeInUp>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Video;
