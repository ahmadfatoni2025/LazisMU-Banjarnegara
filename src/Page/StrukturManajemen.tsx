import { motion } from 'framer-motion';

const StrukturManajemen = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center container mx-auto px-6"
            >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Struktur Manajemen</h1>
                <p className="text-gray-600">Struktur organisasi dan manajemen Lazismu Banjarnegara.</p>
            </motion.div>
        </div>
    );
};

export default StrukturManajemen;
