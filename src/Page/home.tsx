import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import ImpactDashboard from '../ui/ImpactDashboard';
import backgroundVideo from '../assets/Backgroundvideo.mp4';
import Berdonasi from './Berdonasi';
import Berita from './Berita';

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
  const containerRef = useRef(null);
  const [latestNews, setLatestNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/berita');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setLatestNews(data.slice(0, 2)); // Ambil 2 berita terbaru
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };
    fetchLatestNews();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden font-sans">
      <Navbar />

      {/* Hero Section - Vibrant Dark */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black" id="Hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-orange-900/20 to-black/80 mix-blend-multiply" />
          <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-full">
            <video
              className="absolute top-1/2 left-1/2 w-full h-full min-w-[150%] min-h-[150%] object-cover -translate-x-1/2 -translate-y-1/2 opacity-70 contrast-110 saturate-110"
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
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">Lazismu Banjarnegara</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-8">
              Peduli Untuk <br />
              <span className="text-orange-500">Negeri.</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Wujudkan kepedulianmu menjadi aksi nyata. Bersama membangun harapan dan kehidupan yang lebih baik bagi sesama.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/donasi"
                className="group relative px-8 py-4 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 w-full sm:w-auto overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Donasi Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <a
                href="https://www.youtube.com/watch?v=_r38G3swC9o"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg border border-white/20 hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm w-full sm:w-auto flex items-center justify-center gap-3"
              >
                <span>Lihat Profil</span>
                <div className="w-6 h-6 rounded-full bg-white text-gray-900 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-current border-b-4 border-b-transparent ml-0.5"></div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Dashboard - Clean Integration */}
      <ImpactDashboard />

      {/* Hero Banner / Slider */}
      <div className="bg-gray-50 pb-20">
        <FadeInUp>
          <HeroSlider />
        </FadeInUp>
      </div>

      {/* Donation Section Wrapper */}
      <div id='berdonasi' className="scroll-mt-24">
        <Berdonasi />
      </div>

      {/* Latest News - Minimalist */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <FadeInUp>
              <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Kabar Terbaru</h2>
              <p className="text-gray-500 font-medium">Informasi terkini dari kegiatan Lazismu Banjarnegara</p>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <Link
                to="/berita"
                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors group"
              >
                Lihat Semua Berita <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeInUp>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {latestNews.length > 0 ? latestNews.map((news, index) => (
              <FadeInUp key={index} delay={index * 0.2}>
                <Link to={`/berita/${news.id}`} className="group block">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                      <img
                        src={news.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
                        alt={news.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 relative z-10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-4 text-sm text-gray-400 font-bold uppercase tracking-wider">
                        <span className="text-orange-600">{news.category || 'Berita'}</span> • <Calendar className="w-4 h-4" /> {formatDate(news.created_at)}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-500 mb-0 line-clamp-2 leading-relaxed font-medium">{news.excerpt}</p>
                    </div>
                  </motion.div>
                </Link>
              </FadeInUp>
            )) : (
              <div className="col-span-2 text-center py-20 bg-gray-50 rounded-4xl">

              </div>
            )}
          </div>
        </div>
      </section>

      {/* Zakat Services - Clean Cards */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <FadeInUp>
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-orange-400">
              Layanan Zakat
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6">Tunaikan Zakat dengan Mudah</h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
              Optimalkan ibadah harta Anda dengan layanan konsultasi dan perhitungan zakat yang akurat.
            </p>
          </FadeInUp>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Konsultasi Zakat', link: '/konsultasi', color: 'bg-orange-600', hover: 'hover:bg-orange-700' },
              { title: 'Kalkulator Zakat', link: '/kalkulator-zakat', color: 'bg-white text-gray-900', hover: 'hover:bg-gray-100' },
              { title: 'Artikel & Edukasi', link: '/artikel', color: 'bg-gray-800', hover: 'hover:bg-gray-700' }
            ].map((item, idx) => (
              <FadeInUp key={idx} delay={idx * 0.1}>
                <Link
                  to={item.link}
                  className={`block w-full py-6 px-4 rounded-3xl font-black text-lg ${item.color} ${item.hover} transition-all duration-300 transform hover:-translate-y-1 shadow-2xl`}
                >
                  {item.title}
                </Link>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <AnnualRecap />
      <FAQAccordion />
      <Footer />
      <CookieConsent />

    </div>
  );
};

export default Home;