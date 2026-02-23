import React from 'react';

const FloatingName = ({ name, isPlayer = false }) => {
    return (
        <div className={`text-[10px] font-bold tracking-widest uppercase pointer-events-none
      ${isPlayer ? 'text-white' : 'text-red-400 opacity-80'}
      drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]`}
        >
            {name}
        </div>
    );
};

export default FloatingName;
