import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { errorReporter } from '../../utils/ErrorReporter';

const ErrorNotification = () => {
    const [error, setError] = useState(null);

    useEffect(() => {
        return errorReporter.subscribe((message) => {
            setError(message);
            // Auto-clear after 10 seconds
            setTimeout(() => setError(null), 10000);
        });
    }, []);

    if (!error) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed bottom-8 right-8 z-[100] max-w-md"
            >
                <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-950/20 p-4 shadow-2xl backdrop-blur-2xl">
                    {/* Liquid Glass Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 rounded-xl bg-red-500/20 p-2 text-red-400">
                            <AlertTriangle className="h-6 w-6" />
                        </div>

                        <div className="flex-grow pt-1">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-red-400">
                                Erreur Système
                            </h3>
                            <p className="mt-1 text-sm text-red-200/80 leading-relaxed font-mono">
                                {error}
                            </p>
                        </div>

                        <button
                            onClick={() => setError(null)}
                            className="flex-shrink-0 text-red-400/50 hover:text-red-400 transition-colors p-1"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Animating progress bar for auto-close */}
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 10, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-red-500/40"
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ErrorNotification;
