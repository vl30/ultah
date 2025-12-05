import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  type: "circle" | "square" | "star" | "heart";
  rotation: number;
}

const colors = [
  "hsl(340, 65%, 75%)", // rose
  "hsl(270, 50%, 85%)", // lavender
  "hsl(160, 45%, 80%)", // mint
  "hsl(45, 80%, 65%)", // gold
  "hsl(340, 60%, 92%)", // rose-light
  "hsl(200, 70%, 70%)", // sky blue
];

const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 60; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 10,
        type: ["circle", "square", "star", "heart"][
          Math.floor(Math.random() * 4)
        ] as "circle" | "square" | "star" | "heart",
        rotation: Math.random() * 360,
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        >
          {piece.type === "circle" && (
            <div
              className="rounded-full"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.type === "square" && (
            <div
              className="rotate-45"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.type === "star" && (
            <span
              style={{
                fontSize: piece.size,
                color: piece.color,
              }}
            >
              ✦
            </span>
          )}
          {piece.type === "heart" && (
            <span
              style={{
                fontSize: piece.size,
                color: piece.color,
              }}
            >
              ♥
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Confetti;
