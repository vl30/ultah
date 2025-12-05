import { useState } from "react";
import { cn } from "@/lib/utils";
import cakeIcon from "@/assets/cake-icon.png";
import { Sparkles } from "lucide-react";

interface BirthdayCakeProps {
  onBlow?: () => void;
}

const BirthdayCake = ({ onBlow }: BirthdayCakeProps) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;

    setIsBlowing(true);

    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      setShowMessage(true);
      onBlow?.();
    }, 500);
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setShowMessage(false);
  };

  return (
    <div className="text-center">
      <div
        className={cn(
          "relative inline-block cursor-pointer transition-transform duration-300",
          "hover:scale-105 active:scale-95",
          isBlowing && "animate-shake"
        )}
        onClick={handleBlowCandles}
      >
        <img
          src={cakeIcon}
          alt="Birthday Cake"
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain drop-shadow-lg"
        />

        {/* Candle flames overlay */}
        {candlesLit && (
          <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="relative"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-2 h-4 sm:w-3 sm:h-5 bg-gradient-to-t from-gold to-yellow-300 rounded-full animate-candle-flicker" />
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse opacity-80" />
              </div>
            ))}
          </div>
        )}

        {/* Glow effect when lit */}
        {candlesLit && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-gold/30 rounded-full blur-xl animate-pulse" />
        )}

        {/* Blown effect */}
        {!candlesLit && !showMessage && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-xs opacity-50 animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                💨
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 min-h-[80px]">
        {candlesLit ? (
          <p className="text-muted-foreground text-sm md:text-base animate-pulse">
            Klik kue untuk tiup lilinnya! 🎂
          </p>
        ) : showMessage ? (
          <div className="animate-scale-in">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-gold animate-pulse" />
              <p className="text-rose-dark font-bold text-base md:text-lg">
                yeay pinter kamu, semoga harapan kamu terkabul yaaaa
              </p>
              <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            </div>
            <button
              onClick={relightCandles}
              className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Nyalakan lagi?
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BirthdayCake;
