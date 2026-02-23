import React from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, Info, LogOut } from 'lucide-react';

const MainMenu = ({ onPlay }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="liquid-glass p-12 w-full max-w-md flex flex-col items-center gap-8 text-center"
            >
                <motion.h1
                    className="text-6xl font-extrabold glow-text mb-4 italic"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    DROPER
                </motion.h1>

                <p className="text-sm text-blue-400 font-bold tracking-widest uppercase mb-6">
                    Version 0.0.1 Alpha +
                </p>

                <div className="flex flex-col w-full gap-4">
                    <button
                        onClick={onPlay}
                        className="btn-primary flex items-center justify-center gap-3"
                    >
                        <Play size={24} fill="currentColor" />
                        Jouer
                    </button>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <button className="liquid-glass p-4 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <Settings size={20} />
                        </button>
                        <button className="liquid-glass p-4 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <Info size={20} />
                        </button>
                        <button className="liquid-glass p-4 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-xs text-gray-500">
                    DESIGNED BY mCOMPANY &copy; 2026
                </div>
            </motion.div>
        </div>
    );
};

export default MainMenu;
