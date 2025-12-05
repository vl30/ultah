import { useState } from "react";
import { Heart, Star, Sparkles, Gift, Cake, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

interface Wish {
  id: number;
  icon: React.ReactNode;
  title: string;
  message: string;
  color: string;
}

const wishes: Wish[] = [
  {
    id: 1,
    icon: <Heart className="w-6 h-6" fill="currentColor" />,
    title: "Cinta",
    message: "Semoga selalu dikelilingi cinta dari keluarga dan temen-temen 💕",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 2,
    icon: <Star className="w-6 h-6" fill="currentColor" />,
    title: "Sukses",
    message: "Semoga sukses selalu dan tercpai cita cita kamu dan semoga kebeli yaa motor h2 nya 🏍",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 3,
    icon: <Sparkles className="w-6 h-6" />,
    title: "Kebahagiaan",
    message: "Semoga kamu bahagia terus walaupun engga sama aku hehe yang penting kamu bahagia dan jangan sedih terus okey?",
    color: "from-purple-400 to-violet-500",
  },
  {
    id: 4,
    icon: <Gift className="w-6 h-6" />,
    title: "Berkah",
    message: "Semoga di umur segini kamu selalu diberi berkah dan rejeki yang melimpah, dan menjadi pribadi yang lebih baik lagi",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 5,
    icon: <Cake className="w-6 h-6" />,
    title: "Kesehatan",
    message: "Semoga selalu sehat walaupun suka begadang, jangan lupa jaga kesehatan yaaa, kalau kamu sakit nanti kita nda bisa ketemu :(",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 6,
    icon: <PartyPopper className="w-6 h-6" />,
    title: "Harapan pribadi aku",
    message: "Semoga tahun ini kamu lebih baik baik yaa sama aku dan juga kamu jangan sering sering ninggalin aku :(, dan juga terimakasih untuk selama 5 atau 6 bulan ini untuk sabar ke aku dan baik sama aku",
    color: "from-red-400 to-pink-500",
  },
];

const InteractiveWishes = () => {
  const [selectedWish, setSelectedWish] = useState<number | null>(null);
  const [revealedWishes, setRevealedWishes] = useState<Set<number>>(new Set());

  const handleWishClick = (wishId: number) => {
    setSelectedWish(wishId);
    setRevealedWishes((prev) => new Set([...prev, wishId]));
  };

  return (
    <section className="py-12 md:py-16 px-4 relative z-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="font-display text-2xl md:text-3xl text-rose-dark mb-2">
            Kumpulan Doa & Harapan 🙏
          </h3>
          <p className="text-muted-foreground text-sm">
            Klik untuk membuka setiap doa spesial untukmu!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {wishes.map((wish, index) => (
            <button
              key={wish.id}
              onClick={() => handleWishClick(wish.id)}
              className={cn(
                "relative group p-4 md:p-6 rounded-2xl transition-all duration-300",
                "hover:scale-105 hover:shadow-glow active:scale-95",
                "animate-fade-up",
                revealedWishes.has(wish.id)
                  ? "bg-card shadow-card"
                  : `bg-gradient-to-br ${wish.color} text-white shadow-soft`
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={cn(
                  "flex flex-col items-center gap-2 transition-all duration-300",
                  revealedWishes.has(wish.id) ? "text-foreground" : "text-white"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-full",
                    revealedWishes.has(wish.id)
                      ? `bg-gradient-to-br ${wish.color} text-white`
                      : "bg-white/20"
                  )}
                >
                  {wish.icon}
                </div>
                <span className="font-bold text-sm md:text-base">{wish.title}</span>
                {!revealedWishes.has(wish.id) && (
                  <span className="text-xs opacity-80">Klik untuk buka!</span>
                )}
              </div>

              {/* Sparkle effect on unrevealed */}
              {!revealedWishes.has(wish.id) && (
                <div className="absolute top-2 right-2 animate-pulse">
                  <Sparkles className="w-4 h-4 text-white/60" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Selected wish message */}
        {selectedWish && (
          <div className="mt-6 animate-scale-in">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-card text-center">
              <p className="text-foreground text-lg leading-relaxed">
                {wishes.find((w) => w.id === selectedWish)?.message}
              </p>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {revealedWishes.size} dari {wishes.length} doa terbuka
          </p>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
            <div
              className="h-full bg-gradient-to-r from-rose to-secondary transition-all duration-500"
              style={{ width: `${(revealedWishes.size / wishes.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveWishes;
