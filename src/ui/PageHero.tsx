import { motion } from 'framer-motion';

interface PageHeroProps {
    title: string;
    subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
    return (
        <section className="relative pt-32 pb-20 bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-linear-to-b from-orange-600/20 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default PageHero;
