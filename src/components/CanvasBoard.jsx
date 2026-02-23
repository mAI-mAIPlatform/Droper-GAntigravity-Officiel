import React, { useEffect, useRef } from 'react';
import { GameEngine } from '../game/GameEngine';
import { useInputs } from '../hooks/useInputs';

const CanvasBoard = ({ onGameOver }) => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
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

            return () => {
                engine.stop();
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="canvas-container cursor-crosshair"
        />
    );
};

export default CanvasBoard;
