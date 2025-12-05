import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Trophy, Heart } from "lucide-react";

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  popped: boolean;
}

interface BalloonPopGameProps {
  onComplete: () => void;
}

const BALLOON_COLORS = [
  "from-pink-400 to-rose-500",
  "from-purple-400 to-violet-500",
  "from-blue-400 to-cyan-500",
  "from-green-400 to-emerald-500",
  "from-yellow-400 to-orange-500",
  "from-red-400 to-pink-500",
];

const TARGET_SCORE = 16; // 16 for 16th birthday!

const BalloonPopGame = ({ onComplete }: BalloonPopGameProps) => {
  const [showIntro, setShowIntro] = useState(true);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [combo, setCombo] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const createBalloon = useCallback(() => {
    const newBalloon: Balloon = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: 110,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      size: 50 + Math.random() * 30,
      speed: 0.5 + Math.random() * 1,
      popped: false,
    };
    return newBalloon;
  }, []);

  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      setBalloons((prev) => {
        if (prev.length < 8) {
          return [...prev, createBalloon()];
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [gameActive, createBalloon]);

  useEffect(() => {
    if (!gameActive) return;

    const moveInterval = setInterval(() => {
      setBalloons((prev) =>
        prev
          .map((balloon) => ({
            ...balloon,
            y: balloon.y - balloon.speed,
          }))
          .filter((balloon) => balloon.y > -20 && !balloon.popped)
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameActive]);

  useEffect(() => {
    if (score >= TARGET_SCORE && gameActive) {
      setGameActive(false);
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [score, gameActive, onComplete]);

  const popBalloon = (balloon: Balloon, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    
    // Get position for particles
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Add particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 500);

    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b))
    );
    
    setScore((prev) => prev + 1);
    setCombo((prev) => prev + 1);
    
    // Reset combo after delay
    setTimeout(() => setCombo(0), 1000);

    // Play pop sound effect (visual feedback)
    const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU");
  };

  const startGame = () => {
    setShowIntro(false);
    setGameActive(true);
    setScore(0);
    setBalloons([]);
  };

  if (showIntro) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4 overflow-hidden">
        <div className="text-center max-w-md relative z-10">
          {/* Floating decorations */}
          <div className="absolute -top-20 -left-10 text-6xl animate-float opacity-50">🎈</div>
          <div className="absolute -top-10 -right-10 text-5xl animate-float-delayed opacity-50">🎉</div>
          <div className="absolute -bottom-10 -left-5 text-4xl animate-bounce-slow opacity-50">🎁</div>
          
          <div className="mb-6 animate-bounce-slow">
            <div className="relative inline-block">
              <span className="text-7xl md:text-8xl">🎈</span>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-gold animate-pulse" />
            </div>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-rose-dark mb-4 animate-fade-up">
            Hai Viny 💕
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-2 font-medium animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Ada kejutan spesial buatmu! 🎁
          </p>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6 shadow-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-muted-foreground mb-2">
              Tapi sebelumnya...
            </p>
            <p className="text-foreground font-medium">
              Pop <span className="text-rose-dark font-bold">16 balon</span> untuk membuka hadiahmu! 🎈
            </p>
            <p className="text-sm text-muted-foreground mt-2 italic">
              (16 karena kamu ulang tahun ke-16!)
            </p>
          </div>

          <button
            onClick={startGame}
            className="group relative bg-gradient-to-r from-rose to-secondary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            <span className="flex items-center gap-2">
              Mulai! 
              <span className="group-hover:animate-bounce inline-block">🎮</span>
            </span>
          </button>
        </div>

        {/* Background floating elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20 animate-balloon"
            style={{
              left: `${10 + i * 15}%`,
              bottom: "-50px",
              animationDelay: `${i * 0.5}s`,
            }}
          >
            🎈
          </div>
        ))}
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="text-center animate-scale-in">
          <div className="mb-6">
            <Trophy className="w-24 h-24 mx-auto text-gold animate-bounce-slow" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-rose-dark mb-4">
            Yeay! Berhasil! 🎉
          </h2>
          <p className="text-lg text-foreground/80 mb-2">
            Kamu hebat, Viny!
          </p>
          <p className="text-muted-foreground">
            Membuka hadiah spesialmu...
          </p>
          <div className="mt-6 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-6 h-6 text-rose animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
                fill="currentColor"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero overflow-hidden relative touch-none select-none">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft">
            <span className="font-bold text-foreground">
              🎈 {score}/{TARGET_SCORE}
            </span>
          </div>
          
          {combo > 1 && (
            <div className="bg-gold/90 px-4 py-2 rounded-full shadow-glow animate-pop">
              <span className="font-bold text-primary-foreground">
                Combo x{combo}! 🔥
              </span>
            </div>
          )}

          <div className="bg-card/90 backdrop-blur-sm rounded-full shadow-soft overflow-hidden w-32 h-8">
            <div
              className="h-full bg-gradient-to-r from-rose to-secondary transition-all duration-300 ease-out"
              style={{ width: `${(score / TARGET_SCORE) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Game area */}
      <div className="absolute inset-0 pt-20">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className={cn(
              "absolute cursor-pointer transition-transform duration-100 hover:scale-110 active:scale-90",
              balloon.popped && "opacity-0 scale-150"
            )}
            style={{
              left: `${balloon.x}%`,
              bottom: `${balloon.y}%`,
              width: balloon.size,
              height: balloon.size * 1.2,
              transform: "translateX(-50%)",
            }}
            onClick={(e) => popBalloon(balloon, e)}
            onTouchStart={(e) => popBalloon(balloon, e)}
          >
            <div
              className={cn(
                "w-full h-full rounded-full bg-gradient-to-b shadow-lg relative",
                balloon.color
              )}
            >
              {/* Balloon highlight */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full" />
              {/* Balloon string */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-400"
                style={{ transform: "translateX(-50%) translateY(100%)" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pop particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50"
          style={{ left: particle.x, top: particle.y }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gold animate-pop"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-20px)`,
                opacity: 0,
                animation: "particle-burst 0.5s ease-out forwards",
              }}
            />
          ))}
        </div>
      ))}

      {/* Instructions */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-muted-foreground text-sm md:text-base animate-pulse">
          Tap/klik balon untuk memecahkannya! 👆
        </p>
      </div>
    </div>
  );
};

export default BalloonPopGame;
