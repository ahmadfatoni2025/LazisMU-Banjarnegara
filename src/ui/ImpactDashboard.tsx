
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, School, HeartPulse, Sprout } from 'lucide-react';
import FadeInUp from './FadeInUp';

const ImpactDashboard = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (sliderRef.current) {
            setWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
        }
    }, []);

    const cards = [
        {
            type: 'stats',
            title: 'Total Penerima Manfaat',
            value: '5,007',
            desc: 'Jiwa telah terbantu melalui berbagai program kebaikan',
            color: 'from-orange-500 to-yellow-500',
            icon: <Users className="w-6 h-6 text-white" />,
            colSpan: true
        },
        {
            type: 'program',
            title: 'Pilar Pendidikan',
            beneficiaries: '166',
            amount: 'Rp 1.178.756.523',
            icon: <School className="w-6 h-6 text-blue-600" />,
            iconBg: 'bg-blue-100',
            textColor: 'text-blue-600'
        },
        {
            type: 'program',
            title: 'Pilar Kesehatan',
            beneficiaries: '180',
            amount: 'Rp 862.462.852',
            icon: <HeartPulse className="w-6 h-6 text-green-600" />,
            iconBg: 'bg-green-100',
            textColor: 'text-green-600'
        },
        {
            type: 'program',
            title: 'Pilar Ekonomi',
            beneficiaries: '12',
            amount: 'Rp 38.540.000',
            icon: <Sprout className="w-6 h-6 text-purple-600" />,
            iconBg: 'bg-purple-100',
            textColor: 'text-purple-600'
        },
        {
            type: 'program',
            title: 'Pilar Sosial Dakwah',
            beneficiaries: '4436',
            amount: 'Rp 1.000.557.099',
            icon: <Users className="w-6 h-6 text-orange-600" />,
            iconBg: 'bg-orange-100',
            textColor: 'text-orange-600'
        }
    ];

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <FadeInUp className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Dampak Kebaikan Anda</h2>
                    <p className="text-gray-500">Transparansi penyaluran dana untuk penerima manfaat. Geser untuk melihat lebih banyak.</p>
                </FadeInUp>

                <motion.div
                    ref={sliderRef}
                    className="cursor-grab active:cursor-grabbing overflow-hidden"
                    whileTap={{ cursor: "grabbing" }}
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-6 w-max p-4"
                    >
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                className={`relative flex-shrink-0 ${card.colSpan ? 'w-[400px] md:w-[500px]' : 'w-[300px]'}`}
                            >
                                {card.type === 'stats' ? (
                                    <div className={`h-full bg-gradient-to-br ${card.color} rounded-3xl p-8 text-white shadow-xl shadow-orange-200 relative overflow-hidden flex flex-col justify-center`}>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                                    {card.icon}
                                                </div>
                                                <span className="text-orange-100 font-medium">{card.title}</span>
                                            </div>
                                            <div className="text-5xl font-bold mb-2">{card.value}</div>
                                            <p className="text-orange-100">{card.desc}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between select-none pointer-events-none">
                                        {/* pointer-events-none on inner content allows drag to work smoothly without text selection interference */}
                                        <div>
                                            <div className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                                                {card.icon}
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 mb-1">{card.beneficiaries}</div>
                                            <div className="text-sm text-gray-500 mb-4">Penerima Manfaat</div>
                                        </div>
                                        <div>
                                            <div className={`text-lg font-bold ${card.textColor}`}>{card.amount}</div>
                                            <div className="mt-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">{card.title}</div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ImpactDashboard;
