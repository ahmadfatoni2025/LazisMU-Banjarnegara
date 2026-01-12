import {
    Heart,
    Phone, Mail, MapPin, Facebook,
    Instagram, Youtube, MessageCircle,
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-linear-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-emerald-500 w-10 h-10 rounded-xl flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-xl font-bold">LAZISMU</div>
                                <div className="text-emerald-400 text-sm">Banjarnegara</div>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Mengelola zakat, infaq, dan sedekah secara profesional untuk
                            kemaslahatan umat dan pembangunan masyarakat.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
                                { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
                                { icon: <Youtube className="w-5 h-5" />, label: 'YouTube' },
                                { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp' },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors text-white"
                                    title={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Tautan Cepat</h3>
                        <ul className="space-y-3">
                            {['Tentang Kami', 'Program', 'Laporan Keuangan', 'Artikel', 'Kalkulator Zakat', 'Kontak'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Kontak Kami</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-emerald-400 mt-1" />
                                <span className="text-gray-400">Jl. Pemuda No.83, Kutabanjarnegara, Kec. Banjarnegara, Kab. Banjarnegara, Jawa Tengah 53418</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-emerald-400" />
                                <span className="text-gray-400">(0286) 5962526</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-emerald-400" />
                                <span className="text-gray-400">lazismubanjarnegara@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Berlangganan Update</h3>
                        <p className="text-gray-400 mb-4">
                            Dapatkan informasi program dan laporan terbaru
                        </p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Email Anda"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900 outline-none text-white"
                            />
                            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors">
                                Berlangganan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="text-gray-400 text-sm mb-4 lg:mb-0">
                            © {new Date().getFullYear()} Lazismu Banjarnegara. Semua hak dilindungi.
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Kebijakan Privasi</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Syarat & Ketentuan</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Sertifikasi</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
