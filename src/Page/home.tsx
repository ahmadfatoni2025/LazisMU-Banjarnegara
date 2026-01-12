import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import CookieConsent from '../ui/CookieConsent';
import FAQAccordion from '../ui/FAQAccordion';
import HeroSlider from '../ui/HeroSlider';
import AnnualRecap from '../ui/AnnualRecap';
import CampaignCard from '../ui/CampaignCard';
import ImpactDashboard from '../ui/ImpactDashboard';
import backgroundVideo from '../assets/Backgroundvideo.mp4';
import Berdonasi from './Berdonasi';

// Animation Components
const FadeInUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-linear-to-b from-gray-50 to-white overflow-hidden">
      <Navbar />

      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black" id="Hero">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black/20" />
          <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-full">
            <video
              className="absolute top-1/2 left-1/2 w-[300%] h-[300%] 
                     -translate-x-1/2 -translate-y-1/2 
                     object-cover pointer-events-none opacity-60"
              src={backgroundVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full mb-8">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide uppercase">Lazismu Banjarnegara</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-8">
              Peduli Untuk
              <span className="text-transparent pl-4 bg-clip-text bg-linear-to-r from-orange-400 to-yellow-300">
                Negeri
              </span>
            </h1>

            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Wujudkan kepedulianmu menjadi aksi nyata. Bersama membangun harapan dan kehidupan yang lebih baik bagi sesama.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="min-w-[200px] bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                <span><a href="#donasi-section">Donasi Sekarang</a></span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="min-w-[200px] px-8 py-4 rounded-full font-bold text-lg text-white border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <span>
                  <a href="https://www.youtube.com/watch?v=_r38G3swC9o" target="_blank" rel="noopener noreferrer">Lihat Video Profil</a>
                </span>
                <div className="w-8 h-8 rounded-full bg-white text-orange-900 flex items-center justify-center">
                  <div className="border-t-4 border-l-8 border-b-4 border-transparent border-l-current ml-1"></div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Impact Dashboard (Bento Style) */}
      <ImpactDashboard />

      {/* Hero Slider Banner */}
      <FadeInUp>
        <HeroSlider />
      </FadeInUp>

      <Berdonasi />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl font-bold text-orange-600 mb-2">Info Terkini Lazismu</h2>
            <p className="text-gray-500 uppercase tracking-wide text-sm font-semibold">Berita Terbaru Dari Lazismu</p>
          </FadeInUp>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Tim SAR Muhammadiyah Beserta SAR Gabungan Terus Berupaya Mencari Korban Longsor",
                date: "Januari 24, 2025",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/Tim-SAR-Muhammadiyah-bersama-SAR-Gabungan-Terus-Berupaya-Mencari-Korban-Longsor-Petungkriyono-750x536-1.jpeg",
                desc: "Tim SAR gabungan terus melakukan pencarian korban longsor di Banjarnegara dengan mengerahkan alat berat dan personel tambahan..."
              },
              {
                title: "SITUATION REPORT: Bencana Alam Banjarnegara",
                date: "Januari 23, 2025",
                image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/df9a9c3d-4bc6-4cc3-9cd9-7a3fe254917e.jpg",
                desc: "Laporan situasi terkini penanganan bencana alam yang terjadi di beberapa titik wilayah Banjarnegara."
              }
            ].map((news, index) => (
              <FadeInUp key={index} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors z-10" />
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-orange-600 transition-colors cursor-pointer leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-gray-500 mb-6 line-clamp-2">{news.desc}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <button className="text-orange-600 font-semibold text-sm hover:underline uppercase tracking-wider">
                        Read More
                      </button>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{news.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeInUp>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/berita"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30"
            >
              Lihat Berita Lainnya
            </Link>
          </div>
        </div>
      </section>

      {/* Zakat CTA Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-6 text-center">
          <FadeInUp>
            <h2 className="text-3xl font-bold text-orange-600 mb-4">Masih bingung untuk berzakat ?</h2>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
              Untuk membantu Anda, maka terlebih dahulu klik button dibawah ini untuk mendapatkan panduan dan konsultasi seputar zakat.
            </p>
          </FadeInUp>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 text-lg"
            >
              Konsultasi Zakat
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-amber-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-600 shadow-lg shadow-amber-500/20 text-lg"
            >
              Kalkulator Zakat
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 text-lg"
            >
              Artikel Zakat
            </motion.button>
          </div>
        </div>
      </section>

      {/* Laporan Tahunan - New Design */}
      <AnnualRecap />

      <FAQAccordion />

      {/* Footer */}
      <Footer />
      <CookieConsent />

    </div>
  );
};

export default Home;