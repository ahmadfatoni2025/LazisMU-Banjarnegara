import { motion } from 'framer-motion';

const KalkulatorZakat = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Kalkulator Zakat</h1>
                <p className="text-gray-600">Hitung kewajiban zakat Anda dengan mudah dan tepat.</p>
            </motion.div>
        </div>
    );
};

export default KalkulatorZakat;
