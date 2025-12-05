import { useEffect, useState } from "react";

interface Balloon {
  id: number;
  left: number;
  delay: number;
  size: number;
  color: string;
  duration: number;
}

const BALLOON_COLORS = ["🎈", "🩷", "💜", "💙", "💚", "💛"];

const FloatingBalloons = () => {
  const [balloonElements, setBalloonElements] = useState<Balloon[]>([]);

  useEffect(() => {
    const elements: Balloon[] = [];
    for (let i = 0; i < 10; i++) {
      elements.push({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 3,
        size: 24 + Math.random() * 24,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        duration: 6 + Math.random() * 4,
      });
    }
    setBalloonElements(elements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {balloonElements.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute animate-balloon"
          style={{
            left: `${balloon.left}%`,
            bottom: `-${balloon.size + 20}px`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
            fontSize: balloon.size,
            opacity: 0.6,
          }}
        >
          {balloon.color}
        </div>
      ))}
    </div>
  );
};

export default FloatingBalloons;
