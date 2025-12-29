import React from 'react';

const QuantumLoopLoader = () => {
  // CORRECTED: This new path creates a classic, "pinched" figure-eight that
  // crosses over in the middle for a true infinity symbol shape.
  const infinityPathData =
    'M50,25 C35,10 10,10 10,25 C10,40 35,40 50,25 C65,10 90,10 90,25 C90,40 65,40 50,25 Z';

  const keyframes = `
    @keyframes trace-path {
      from { offset-distance: 0%; }
      to { offset-distance: 100%; }
    }

    @keyframes quantum-rotate {
      0% { transform: rotateY(0deg) rotateX(20deg); }
      50% { transform: rotateY(180deg) rotateX(20deg); }
      100% { transform: rotateY(360deg) rotateX(20deg); }
    }

    @keyframes reveal-text {
      from {
        opacity: 0;
        transform: translateY(15px);
        filter: blur(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
      }
    }
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-lg">
      <style>{keyframes}</style>

      <div className="flex flex-col items-center justify-center gap-8">
        {/* Animation Container */}
        <div
          className="relative w-32 h-16"
          style={{
            animation: 'quantum-rotate 12s ease-in-out infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Faint SVG path guide */}
          <svg
            className="absolute inset-0 w-full h-full text-cyan-400/10"
            viewBox="0 0 100 50" // viewBox is suitable for the new path
            fill="none"
          >
            <path
              d={infinityPathData}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          {/* Tracer Orbs */}
          <div
            className="absolute w-4 h-4 rounded-full bg-cyan-300"
            style={{
              offsetPath: `path('${infinityPathData}')`,
              animation: 'trace-path 4s linear infinite',
              boxShadow:
                '0 0 5px #67e8f9, 0 0 10px #22d3ee, 0 0 20px #06b6d488',
            }}
          />
          <div
            className="absolute w-3 h-3 rounded-full bg-white"
            style={{
              offsetPath: `path('${infinityPathData}')`,
              animation: 'trace-path 3.8s linear infinite',
              animationDelay: '-2s',
              boxShadow: '0 0 4px #fff, 0 0 8px #fff, 0 0 12px #ffffff88',
            }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-fuchsia-400"
            style={{
              offsetPath: `path('${infinityPathData}')`,
              animation: 'trace-path 3s linear infinite',
              animationDelay: '-3s',
              boxShadow: '0 0 4px #f0abfc, 0 0 8px #e879f9',
            }}
          />
        </div>

        {/* Animated "Loading..." Text */}
        <div className="text-sm font-medium tracking-widest text-white/80">
          {'Loading...'.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: `reveal-text 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                animationDelay: `${0.6 + i * 0.06}s`,
                opacity: 0,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuantumLoopLoader;
