import { useEffect, useRef } from 'react';

export const useInputs = () => {
    const inputs = useRef({
        keys: new Set(),
        mouse: { x: 0, y: 0, down: false },
    });

    useEffect(() => {
        const handleKeyDown = (e) => inputs.current.keys.add(e.code);
        const handleKeyUp = (e) => inputs.current.keys.delete(e.code);
        const handleMouseMove = (e) => {
            inputs.current.mouse.x = e.clientX;
            inputs.current.mouse.y = e.clientY;
        };
        const handleMouseDown = () => (inputs.current.mouse.down = true);
        const handleMouseUp = () => (inputs.current.mouse.down = false);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return inputs;
};
