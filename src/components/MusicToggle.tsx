import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Note: Actual music implementation would require an audio file
    // This is a visual toggle for the UI
  };

  return (
    <button
      onClick={toggleMusic}
      className={cn(
        "fixed bottom-4 right-4 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full",
        "bg-card/90 backdrop-blur-sm shadow-card",
        "flex items-center justify-center",
        "transition-all duration-300 hover:scale-110",
        "border-2",
        isPlaying ? "border-rose" : "border-transparent"
      )}
      aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-rose" />
      ) : (
        <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
      )}
      {isPlaying && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose rounded-full animate-pulse" />
      )}
    </button>
  );
};

export default MusicToggle;
