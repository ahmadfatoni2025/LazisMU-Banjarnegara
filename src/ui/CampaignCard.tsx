
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BadgeCheck, ArrowRight, Heart } from 'lucide-react';

interface CampaignCardProps {
    item: {
        title: string;
        org: string;
        collected: string;
        image: string;
        color: string;
    };
    onClick: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ item, onClick }) => {
    return (
        <motion.div
            whileHover="hover"
            initial="initial"
            className="group relative w-full h-[450px] rounded-[2rem] overflow-hidden bg-white/10 shadow-xl shadow-gray-200/40 cursor-pointer border border-gray-100/50"
            onClick={onClick}
        >
            {/* Background Image Area */}
            {/* 
         The image takes up the full space initially, but we cover the bottom with the white card.
         The white card is positioned absolute bottom.
      */}
            <div className="absolute inset-0 h-[75%] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                <motion.img
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} // Smooth ease
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />

                {/* Floating Badge - Glassmorphism */}
                <div className="absolute top-5 left-5 z-20">
                    <span className="bg-white/90 backdrop-blur-md border border-white/40 text-orange-600 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                        Mendesak
                    </span>
                </div>
            </div>

            {/* Action Button (Top Right) */}
            <motion.button
                variants={{
                    initial: { scale: 0.8, opacity: 0, y: -10 },
                    hover: { scale: 1, opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
                className="absolute top-5 right-5 z-20 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 transition-colors shadow-lg hover:bg-orange-600 hover:text-white"
            >
                <ArrowRight className="w-5 h-5 -rotate-45" />
            </motion.button>

            {/* Content Container - Sliding Sheet */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 bg-white z-20"
                style={{ borderRadius: "32px 0 0 0" }} // Matches the 2rem (32px)
            >
                {/* Floating FAB 'Scoop' Effect */}
                {/* Adjusted to be smoother and better positioned */}
                <div className="absolute -top-[52px] right-0 w-[52px] h-[52px] z-10 pointer-events-none">
                    {/* The white corner filler to create the scoop. 
                 If the card corner is 32px, we want the scoop to mimic that curve.
             */}
                    <div className="absolute bottom-0 right-0 w-full h-full bg-transparent rounded-br-[32px] shadow-[10px_10px_0_white]" />
                </div>

                {/* The Heart Button */}
                <div className="absolute -top-5 right-5 z-30">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)" }}
                        className="w-12 h-12 bg-orange-500 rounded-full text-white flex items-center justify-center shadow-orange-200 transition-all duration-300"
                    >
                        <Heart className="w-5 h-5 fill-current" />
                    </motion.button>
                </div>


                <div className="pt-8 px-7 pb-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-2 mb-3">
                        <BadgeCheck className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.org}</span>
                    </div>

                    {/* Title - Clean & Modern */}
                    <h3 className="text-lg font-bold text-gray-900 leading-snug mb-5 line-clamp-2 min-h-[3rem] tracking-tight group-hover:text-orange-600 transition-colors">
                        {item.title}
                    </h3>

                    {/* Progress Section - Minimalist */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm items-end">
                            <span className="text-gray-400 font-medium text-xs uppercase tracking-wide">Terkumpul</span>
                            <span className="font-bold text-gray-900 text-base">{item.collected}</span>
                        </div>
                        <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "45%" }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full shadow-lg shadow-orange-200"
                            />
                        </div>
                    </div>

                    {/* Interaction State - Hidden Details */}
                    {/* We animate the height from 0 to auto */}
                    <motion.div
                        variants={{
                            initial: { height: 0, opacity: 0, marginTop: 0 },
                            hover: { height: "auto", opacity: 1, marginTop: 24 }
                        }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 border-t border-dashed border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-[2px] border-white bg-gray-100 flex items-center justify-center overflow-hidden ring-1 ring-gray-50">
                                            <Users className="w-3.5 h-3.5 text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs font-semibold text-gray-400">+124 Donatur</span>
                            </div>

                            <button className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors group/btn">
                                Donasi <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CampaignCard;
