import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home } from 'lucide-react';

const GameOverScreen = ({ onRestart, onMenu }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/70 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="liquid-glass p-12 w-full max-w-sm flex flex-col items-center gap-8 text-center border-red-500/30"
            >
                <h2 className="text-5xl font-extrabold text-red-500 glow-text italic mb-2">
                    GAME OVER
                </h2>

                <p className="text-gray-400 text-sm mb-6">
                    L'IA a pris le dessus. Volt a été neutralisé.
                </p>

                <div className="flex flex-col w-full gap-4">
                    <button
                        onClick={onRestart}
                        className="btn-primary flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500"
                    >
                        <RotateCcw size={24} />
                        Recommencer
                    </button>

                    <button
                        onClick={onMenu}
                        className="liquid-glass p-4 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                    >
                        <Home size={20} />
                        Menu Principal
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default GameOverScreen;
