import React from 'react';
import HealthBar from './HealthBar';
import FloatingName from './FloatingName';

const UIOverlay = ({ player, bots }) => {
    if (!player) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-40 select-none">
            {/* Player HUD */}
            <div
                className="absolute transition-all duration-[16ms] ease-linear"
                style={{
                    left: player.x,
                    top: player.y - 45,
                    transform: 'translateX(-50%)'
                }}
            >
                <div className="flex flex-col items-center gap-1">
                    <FloatingName name={player.name} isPlayer={true} />
                    <HealthBar hp={player.hp} maxHp={player.maxHp} />
                </div>
            </div>

            {/* Bots HUD */}
            {bots.map((bot, idx) => (
                <div
                    key={`bot-hud-${idx}`}
                    className="absolute transition-all duration-[16ms] ease-linear"
                    style={{
                        left: bot.x,
                        top: bot.y - 40,
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="flex flex-col items-center">
                        <FloatingName name={bot.name} />
                        <HealthBar hp={bot.hp} maxHp={bot.maxHp} width={40} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UIOverlay;
