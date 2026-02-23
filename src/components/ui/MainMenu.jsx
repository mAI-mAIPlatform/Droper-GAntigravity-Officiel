import React from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, Info, LogOut, Shield, Zap, Target } from 'lucide-react';

const MainMenu = ({ onPlay }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#050505] overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-blue-500/10 rounded-full blur-xl"
                        animate={{
                            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: Math.random() * 200 + 100,
                            height: Math.random() * 200 + 100,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 liquid-glass p-1 w-full max-w-lg bg-gradient-to-b from-white/10 to-transparent"
            >
                <div className="bg-black/80 backdrop-blur-2xl rounded-[19px] p-12 flex flex-col items-center border border-white/5">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="mb-8 relative"
                    >
                        <motion.h1
                            className="text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                            animate={{
                                filter: ["hue-rotate(0deg)", "hue-rotate(20deg)", "hue-rotate(0deg)"]
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            DROPER
                        </motion.h1>
                        <div className="absolute -bottom-2 right-0 bg-cyan-500 text-black text-[10px] font-black px-2 py-0.5 rounded italic">
                            ALPHA 0.0.5 +
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-3 gap-8 mb-12 w-full px-4">
                        <div className="flex flex-col items-center gap-2">
                            <Zap className="text-cyan-400" size={20} />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Rapidité</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 border-x border-white/10">
                            <Target className="text-blue-400" size={20} />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Précision</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Shield className="text-purple-400" size={20} />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Impact</span>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-5">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onPlay}
                            className="btn-primary group relative overflow-hidden py-6"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                <Play size={28} fill="currentColor" stroke="none" className="group-hover:rotate-12 transition-transform" />
                                LANCER LA SIMULATION
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                        </motion.button>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: <Settings size={22} />, label: "Settings" },
                                { icon: <Info size={22} />, label: "Stats" },
                                { icon: <LogOut size={22} />, label: "Exit" }
                            ].map((item, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", y: -2 }}
                                    className="liquid-glass py-4 flex flex-col items-center justify-center gap-2 border-white/5 transition-all"
                                >
                                    {item.icon}
                                    <span className="text-[9px] uppercase font-bold text-gray-500">{item.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-1">
                        <p className="text-[9px] text-gray-600 font-bold tracking-[0.3em] uppercase">
                            Propulsé par mAI-mAI Platform
                        </p>
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                    </div>
                </div>
            </motion.div>

            {/* Decorative scanlines or grain */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>
    );
};

export default MainMenu;
