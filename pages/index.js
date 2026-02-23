import React, { useState } from 'react';
import Head from 'next/head';
import MainMenu from '../src/components/ui/MainMenu';
import CanvasBoard from '../src/components/CanvasBoard';

export default function Home() {
    const [gameState, setGameState] = useState('MENU'); // 'MENU', 'PLAYING'

    const handlePlay = () => {
        setGameState('PLAYING');
    };

    return (
        <div className="min-h-screen bg-black overflow-hidden">
            <Head>
                <title>Droper | 2.5D Beta</title>
                <meta name="description" content="Droper - Jeu PC 2.5D moderne" />
            </Head>

            <main className="relative w-full h-screen">
                {gameState === 'MENU' && (
                    <MainMenu onPlay={handlePlay} />
                )}

                {gameState === 'PLAYING' && (
                    <CanvasBoard />
                )}

                {/* Background decorative elements */}
                <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
            </main>
        </div>
    );
}
