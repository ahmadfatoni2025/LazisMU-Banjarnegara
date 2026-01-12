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
];

const Navbar = () => {
    const [isWindowScrolled, setIsWindowScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    // Determine visibility state:
    // Solid background (isScrolled true) if:
    // 1. User has scrolled down (isWindowScrolled)
    // 2. OR we are NOT on the homepage (location.pathname !== '/')
    const isScrolled = isWindowScrolled || location.pathname !== '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsWindowScrolled(window.scrollY > 50);
        };
        // Check immediately on mount
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            // Implement search logic here, e.g., navigate to search page or filter content
            // window.location.href = `/search?q=${searchQuery}`;
        }
    };

    return (
        <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm py-3 text-gray-800' : 'bg-transparent py-4 text-white'}`}>
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo - Flex Shrink allowed to keep size but give space */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className={`w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center transition-all p-1`}>
                                <img src="https://lazismubanjarnegara.org/wp-content/uploads/2024/11/lazismu-logo.png" alt="Logo Lazismu Banjarnegara" className="w-full h-full object-contain" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className={`text-lg font-bold tracking-tight leading-none transition-colors ${isScrolled ? 'text-gray-900 group-hover:text-orange-600' : 'text-white'}`}>
                                    Lazis Muhammadiyah
                                </h1>
                                <p className={`text-[10px] font-medium tracking-widest uppercase transition-colors ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>Banjarnegara</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <nav className="hidden lg:flex items-center justify-center gap-6 flex-1">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                                onMouseLeave={() => item.children && setActiveDropdown(null)}
                            >
                                {item.children ? (
                                    <button
                                        className={`flex items-center gap-1 text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-orange-600' : 'text-white/90 hover:text-white'} ${activeDropdown === item.name ? 'text-orange-600' : ''}`}
                                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                    >
                                        {item.name}
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isScrolled ? '' : 'text-white/70'} ${activeDropdown === item.name ? 'rotate-180 text-orange-600' : ''}`} />
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-orange-600' : 'text-white/90 hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {item.children && activeDropdown === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, x: '-50%' }}
                                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                                            exit={{ opacity: 0, y: 10, x: '-50%' }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 pt-4 min-w-[240px] z-50"
                                        >
                                            <div className="bg-white rounded-xl shadow-xl shadow-orange-500/10 border border-gray-100 overflow-hidden py-2 cursor-default">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        to={child.path}
                                                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 font-medium transition-colors text-center"
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>

                    {/* Actions and Mobile Menu */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Search Component - Expandable */}
                        <div
                            className={`hidden lg:flex items-center transition-all duration-300 ease-out ${isSearchOpen ? 'w-72 bg-opacity-100' : 'w-10 bg-opacity-0'
                                } ${isScrolled
                                    ? 'bg-white text-gray-800'
                                    : 'bg-white/10 text-white'
                                } rounded-full relative overflow-hidden ${isSearchOpen && isScrolled ? 'shadow-md border border-gray-100' : ''}`}
                        >
                            <button
                                onClick={() => {
                                    if (!isSearchOpen) {
                                        setIsSearchOpen(true);
                                        setTimeout(() => document.getElementById('search-input')?.focus(), 100);
                                    }
                                }}
                                className={`w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
                                    }`}
                            >
                                <Search className={`w-4 h-4 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
                            </button>

                            <form
                                onSubmit={handleSearch}
                                className={`flex-1 transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                            >
                                <input
                                    id="search-input"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari..."
                                    className={`w-full bg-transparent border-none focus:ring-0 text-sm px-2 h-10 ${isScrolled ? 'text-gray-800 placeholder-gray-400' : 'text-white placeholder-white/70'
                                        }`}
                                />
                            </form>

                            {/* Close Button */}
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setIsSearchOpen(false);
                                }}
                                className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible w-0'
                                    } ${isScrolled ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-white/20 text-white'}`}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Zakat Calculator Button */}
                        <Link
                            to="/kalkulator-zakat"
                            className={`hidden lg:flex px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md transform hover:-translate-y-0.5 whitespace-nowrap ${isScrolled
                                ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-500/30'
                                : 'bg-white text-orange-600 hover:bg-orange-50'
                                }`}
                        >
                            Kalkulator Zakat
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-white/80'}`}
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
                                {/* Mobile Search */}
                                <div className="mb-4 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari di Lazismu..."
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

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
                                                className="block text-lg font-medium py-3 border-b border-gray-50 last:border-0 text-gray-900 hover:text-orange-600"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}

                                <Link
                                    to="/kalkulator-zakat"
                                    className="w-full py-3 bg-white border border-orange-600 text-orange-600 rounded-xl font-semibold mt-4 flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors"
                                >
                                    Kalkulator Zakat
                                </Link>

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
                                    className="w-full py-4 bg-orange-600 text-white rounded-xl font-semibold mt-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
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