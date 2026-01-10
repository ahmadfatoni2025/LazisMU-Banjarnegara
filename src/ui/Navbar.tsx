import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'Beranda', path: '/' },
    {
        name: 'Tentang Kami',
        path: '#',
        children: [
            { name: 'Latar Belakang', path: '/latar-belakang' },
            { name: 'Visi, Misi, Prinsip, dan Tujuan', path: '/visi-misi' },
            { name: 'Struktur Manajemen', path: '/struktur-manajemen' },
            { name: 'Laporan Keuangan', path: '/laporan-keuangan' },
            { name: 'Kantor', path: '/kantor' },
        ]
    },
    {
        name: 'Info',
        path: '#',
        children: [
            { name: 'Artikel', path: '/artikel' },
            { name: 'Berita', path: '/berita' },
            { name: 'Konsultasi', path: '/konsultasi' },
            { name: 'Video', path: '/video' },
            { name: 'Laporan Semester 1 Lazismu Banjarnegara', path: '/laporan-semester' },
            { name: 'Dokumentasi Bulanan', path: '/dokumentasi-bulanan' },
        ]
    },
    { name: 'Program', path: '/program' },
    { name: 'Kantor Layanan', path: '/kantor' },
    { name: 'Kalkulator Zakat', path: '/kalkulator-zakat', variant: 'primary' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    return (
        <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm py-2 text-gray-800' : 'bg-transparent py-2 text-white'}`}>
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className={` w-16 h-16 flex items-center justify-center transition-all   `}>
                            <a href="./home"><img src="https://lazismubanjarnegara.org/wp-content/uploads/2024/11/lazismu-logo.png" alt="Logo Lazismu Banjarnegara" /></a>
                        </div>
                        <div>
                            <h1 className={`text-lg font-bold tracking-tight leading-none transition-colors ${scrolled ? 'text-gray-900 group-hover:text-orange-600' : 'text-white'}`}>
                                Lazis Muhammadiyah
                            </h1>
                            <p className={`text-[10px] font-medium tracking-widest uppercase transition-colors ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>Banjarnegara</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.children ? (
                                    <button
                                        className={`flex items-center gap-1 text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-orange-600' : 'text-white/90 hover:text-white'}`}
                                        onMouseEnter={() => setActiveDropdown(item.name)}
                                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                    >
                                        {item.name}
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${scrolled ? '' : 'text-white/70'} group-hover:rotate-180`} />
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={
                                            item.variant === 'primary'
                                                ? `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md transform hover:-translate-y-0.5 ${scrolled
                                                    ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-500/30'
                                                    : 'bg-white text-orange-600 hover:bg-orange-50'
                                                }`
                                                : `text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-orange-600' : 'text-white/90 hover:text-white'
                                                }`
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {item.children && (
                                    <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-64 z-50">
                                        <div className="bg-white rounded-xl shadow-xl shadow-orange-500/10 border border-gray-100 overflow-hidden py-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    to={child.path}
                                                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 font-medium transition-colors"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ width: 'auto' }}
                            initial={{ width: '2.5rem' }}
                            className={`hidden lg:flex items-center overflow-hidden h-10 rounded-full transition-all duration-300 ${scrolled
                                    ? 'bg-gray-100/50 hover:bg-white text-gray-800 shadow-sm border border-transparent hover:border-orange-100 hover:shadow-md'
                                    : 'bg-white/10 hover:bg-white text-white hover:text-orange-600 backdrop-blur-sm'
                                }`}
                        >
                            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 cursor-pointer">
                                <Search className="w-5 h-5" />
                            </div>
                            <span className="whitespace-nowrap pr-4 text-sm font-medium opacity-0 hover:opacity-100 transition-opacity duration-300">
                                Cari di LazisMU...
                            </span>
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-white/80'}`}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
                    >
                        <div className="container mx-auto px-6 py-6 max-h-[80vh] overflow-y-auto">
                            <div className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <div key={item.name}>
                                        {item.children ? (
                                            <div className="py-2">
                                                <button
                                                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                                    className="w-full flex items-center justify-between text-lg font-medium text-gray-900 py-2 border-b border-gray-50"
                                                >
                                                    {item.name}
                                                    <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {activeDropdown === item.name && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="flex flex-col gap-2 pl-4 py-2 bg-gray-50 rounded-lg mt-2"
                                                        >
                                                            {item.children.map((child) => (
                                                                <Link
                                                                    key={child.name}
                                                                    to={child.path}
                                                                    className="text-gray-600 py-2 text-sm font-medium hover:text-orange-600"
                                                                >
                                                                    {child.name}
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className={`block text-lg font-medium py-3 border-b border-gray-50 last:border-0 ${item.variant === 'primary'
                                                    ? 'text-orange-600 font-bold'
                                                    : 'text-gray-900 hover:text-orange-600'
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        if (location.pathname === '/') {
                                            setTimeout(() => {
                                                const donationSection = document.getElementById('donasi-section');
                                                donationSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }, 300);
                                        } else {
                                            window.location.href = '/#donasi-section';
                                        }
                                    }}
                                    className="w-full py-4 bg-orange-600 text-white rounded-xl font-semibold mt-6 shadow-lg shadow-orange-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
                                >
                                    <span>Donasi Sekarang</span>
                                    <Heart className="w-4 h-4" fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;