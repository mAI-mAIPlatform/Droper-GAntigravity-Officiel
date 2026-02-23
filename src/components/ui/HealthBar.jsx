import React from 'react';

const HealthBar = ({ hp, maxHp, width = 60 }) => {
    const percentage = Math.max(0, (hp / maxHp) * 100);

    // Color based on health percentage
    const getColor = () => {
        if (percentage > 50) return '#00e5ff'; // Neon Cyan
        if (percentage > 25) return '#ffea00'; // Yellow
        return '#ff3d00'; // Toxic Red
    };

    return (
        <div className="flex flex-col items-center gap-1 pointer-events-none" style={{ width }}>
            <div
                className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5"
            >
                <div
                    className="h-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(0,229,255,0.5)]"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: getColor(),
                        boxShadow: `0 0 10px ${getColor()}80`
                    }}
                />
            </div>
        </div>
    );
};

export default HealthBar;
