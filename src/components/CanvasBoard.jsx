import React, { useEffect, useRef, useState } from 'react';
import { GameEngine } from '../game/GameEngine';
import { useInputs } from '../hooks/useInputs';
import UIOverlay from './ui/UIOverlay';

const CanvasBoard = ({ onGameOver }) => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const [hudData, setHudData] = useState({ player: null, bots: [] });
    const inputs = useInputs();

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const engine = new GameEngine(canvas, inputs, onGameOver);
            engineRef.current = engine;
            engine.start();

            const handleResize = () => {
                engine.resize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            // Sync loop for HUD (React state)
            let animId;
            const syncHUD = () => {
                if (engine.isRunning) {
                    setHudData(engine.getHUDData());
                }
                animId = requestAnimationFrame(syncHUD);
            };
            syncHUD();

            return () => {
                engine.stop();
                window.removeEventListener('resize', handleResize);
                cancelAnimationFrame(animId);
            };
        }
    }, [onGameOver]); // Re-init engine if onGameOver changes (e.g. restart)

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="canvas-container cursor-crosshair"
            />
            <UIOverlay player={hudData.player} bots={hudData.hudData?.bots || hudData.bots} />
        </div>
    );
};

export default CanvasBoard;
