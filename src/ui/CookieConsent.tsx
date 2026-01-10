import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ShieldCheck } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Always show on refresh as requested
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        localStorage.setItem('cookie-consent', 'accepted');
    };

    const handleReject = () => {
        setIsVisible(false);
        localStorage.setItem('cookie-consent', 'rejected');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-6 right-6 z-[60] mx-auto max-w-7xl"
                >
                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">

                        {/* Decorative background element */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-start gap-4 z-10">
                            <div className="p-3 bg-orange-100/50 rounded-xl text-orange-600">
                                <Cookie className="w-8 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    Kami Menghargai Privasi Anda
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                                    Website kami menggunakan cookies untuk meningkatkan pengalaman browsing Anda,
                                    menyajikan konten yang relevan, dan menganalisis trafik kami.
                                    Dengan mengklik "Accept All".
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto z-10">
                            <button
                                onClick={handleReject}
                                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 active:scale-95 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                Accept All
                            </button>
                        </div>

                        {/* Close button for subtle dismissal */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 md:hidden"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
