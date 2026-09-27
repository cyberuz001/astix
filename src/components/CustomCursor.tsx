import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktops)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[100] transition-transform duration-100 ease-out hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: -12,
        top: -12,
      }}
    >
      <div
        className={`rounded-full transition-all duration-300 flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 -ml-2.5 -mt-2.5 bg-[#B51222]/20 border border-[#B51222] backdrop-blur-[1px] scale-125'
            : 'w-6 h-6 border border-black/40 bg-black/5'
        }`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
            isHovered ? 'bg-[#B51222]' : 'bg-[#111111]'
          }`}
        />
      </div>
    </div>
  );
};
