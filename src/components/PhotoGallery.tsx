import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface PhotoItem {
  id: number;
  image: string;
  caption: string;
  type: "memory" | "photo pribadi";
}

// Import gambar secara eksplisit
import vincilImg from "/assets/memory/vincil.jpg";
import vindeImg from "/assets/memory/vinde.jpg";
import awalImg from "/assets/memory/awal.jpg";
import photobotImg from "/assets/memory/photobot.jpg";
import hororImg from "/assets/memory/horor.jpg";
import muncakImg from "/assets/memory/muncak.jpg";

const photos: PhotoItem[] = [
  {
    id: 1,
    image: vincilImg,
    caption: "biadadari pas kecil lucu banget",
    type: "photo pribadi",
  },
  {
    id: 2,
    image: vindeImg,
    caption: "eh udah gede aja ya..",
    type: "photo pribadi",
  },
  {
    id: 3,
    image: awalImg,
    caption: "photo kita pas awal ketemu di map salon hehe",
    type: "memory",
  },
  {
    id: 4,
    image: photobotImg,
    caption: "photo kita di photobooth di roblokk",
    type: "memory",
  },
  {
    id: 5,
    image: hororImg,
    caption: "photo kamu pas maen horor roblok sama akuu",
    type: "memory",
  },
  {
    id: 6,
    image: muncakImg,
    caption: "photo kita pas muncakkkkk di roblokk",
    type: "memory",
  },
];

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextPhoto();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  const nextPhoto = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevPhoto = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
    }
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <h3 className="font-display text-2xl md:text-3xl text-center text-rose-dark mb-6">
        Momen Spesial 📸
      </h3>

      <div
        className="relative touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main photo display */}
        <div className="glass rounded-2xl md:rounded-3xl shadow-card overflow-hidden">
          <div 
            className={cn(
              "aspect-square bg-gradient-to-br from-rose-light to-lavender-light relative",
              "transition-all duration-300",
              isAnimating && "opacity-80 scale-95"
            )}
          >
            <img
              src={photos[currentIndex].image}
              alt={photos[currentIndex].caption}
              className="w-full h-full object-cover"
            />

            {/* Like button */}
            <button
              onClick={() => toggleLike(photos[currentIndex].id)}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm shadow-soft transition-transform hover:scale-110 active:scale-90"
            >
              <Heart
                className={cn(
                  "w-5 h-5 md:w-6 md:h-6 transition-colors",
                  liked.has(photos[currentIndex].id)
                    ? "text-rose fill-rose"
                    : "text-muted-foreground"
                )}
              />
            </button>
          </div>

          <div className="p-4 md:p-5 text-center">
            <p className="text-foreground font-medium text-sm md:text-base">
              {photos[currentIndex].caption}
            </p>
            <span
              className={cn(
                "inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium",
                photos[currentIndex].type === "memory"
                  ? "bg-mint-light text-accent-foreground"
                  : "bg-lavender-light text-secondary-foreground"
              )}
            >
              {photos[currentIndex].type === "memory" ? "✨ Kenangan" : "📷 Photo Pribadi"}
            </span>
          </div>
        </div>

        {/* Navigation buttons - Hidden on mobile, visible on desktop */}
        <button
          onClick={prevPhoto}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-card rounded-full shadow-soft items-center justify-center hover:bg-rose-light hover:shadow-glow transition-all"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={nextPhoto}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-card rounded-full shadow-soft items-center justify-center hover:bg-rose-light hover:shadow-glow transition-all"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Swipe hint for mobile */}
      <p className="text-center text-xs text-muted-foreground mt-3 md:hidden">
        ← Geser untuk melihat lebih banyak →
      </p>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 md:gap-2 mt-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 300);
              }
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-6 md:w-8 bg-rose"
                : "w-2 bg-muted hover:bg-rose/50"
            )}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
