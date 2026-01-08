import React from 'react';
import { motion } from 'framer-motion';
import navItem from '../ui/Navbar';

const Artikel = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel & Berita</h1>
                <p className="text-gray-600">Informasi terbaru seputar kegiatan dan inspirasi.</p>
            </motion.div>
        </div>
    );
};

export default Artikel;
