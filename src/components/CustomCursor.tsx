import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: mouseX, y: mouseY });
    };
    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-screen">
      {/* Main cursor (dot) */}
      <div 
        className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full"
        style={{ 
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)` 
        }}
      />
      {/* Outer ring */}
      <div 
        ref={ringRef}
        className={`absolute top-0 left-0 w-9 h-9 rounded-full border border-primary transition-all duration-300 ease-out flex items-center justify-center ${
          isHovering ? 'scale-150 bg-primary/10' : 'scale-100 bg-transparent'
        }`}
      />
    </div>
  );
}
