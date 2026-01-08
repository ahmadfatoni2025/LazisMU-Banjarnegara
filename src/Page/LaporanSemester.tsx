import React from 'react';
import { motion } from 'framer-motion';

const LaporanSemester = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center container mx-auto px-6"
            >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Laporan Semester 1</h1>
                <p className="text-gray-600">Laporan kegiatan dan keuangan semester 1.</p>
            </motion.div>
        </div>
    );
};

export default LaporanSemester;
