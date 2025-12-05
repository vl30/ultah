import { useState, useEffect, useRef } from "react";
import BalloonPopGame from "@/components/BalloonPopGame";
import Confetti from "@/components/Confetti";
import BirthdayCake from "@/components/BirthdayCake";
import PhotoGallery from "@/components/PhotoGallery";
import FloatingBalloons from "@/components/FloatingBalloons";
import ParticleBackground from "@/components/ParticleBackground";
import CountdownSection from "@/components/CountdownSection";
import InteractiveWishes from "@/components/InteractiveWishes";
import MusicToggle from "@/components/MusicToggle";
import heroImage from "@/assets/birthday-hero.png";
import giftBox from "@/assets/gift-box.png";
import { ChevronDown, Heart, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameCompleted) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [gameCompleted]);

  const handleCandleBlow = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const scrollToMain = () => {
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!gameCompleted) {
    return <BalloonPopGame onComplete={() => setGameCompleted(true)} />;
  }

  return (
    <div className="min-h-screen gradient-hero relative overflow-x-hidden">
      {showConfetti && <Confetti />}
      <FloatingBalloons />
      <ParticleBackground />
      <MusicToggle />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Birthday celebration"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        </div>

        <div className="relative z-20 text-center max-w-2xl mx-auto px-4">
          {/* Animated emoji header */}
          <div className="mb-4 md:mb-6 flex items-center justify-center gap-2 md:gap-4">
            <span className="text-3xl md:text-5xl animate-float" style={{ animationDelay: "0s" }}>🎈</span>
            <span className="text-4xl md:text-7xl animate-bounce-slow">🎂</span>
            <span className="text-3xl md:text-5xl animate-float" style={{ animationDelay: "0.5s" }}>🎈</span>
          </div>

          <div className="animate-fade-up">
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-rose-dark mb-3 md:mb-4 leading-tight">
              Selamat Ulang Tahun
              <br />
              <span className="text-gradient">ke-16!</span>
            </h1>

            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-rose-dark mb-4 md:mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-gold animate-pulse" />
              <span>Vinyta Aura Shaqira</span>
              <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-gold animate-pulse" />
            </h2>

            <p className="text-base md:text-xl text-foreground/80 mb-4 flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-gold" fill="currentColor" />
              5 Desember 2009 — 5 Desember 2025
              <Star className="w-4 h-4 text-gold" fill="currentColor" />
            </p>
          </div>

          {/* Birthday message card */}
          <div 
            className="glass rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-card max-w-lg mx-auto animate-fade-up card-hover"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-foreground leading-relaxed text-sm md:text-base">
              <span className="text-2xl md:text-3xl">Hai Viny yang paling manis dan cantik 💕</span>
              <br /><br />
              ciee dah Sweet sixteen nih Semoga di umur yang ke-16 ini, semua impian dan harapan kamu tercapai. 
              Tetap jadi anak yang baik, rajin belajar, dan jangan lupa bahagia terus yaa...
              <br /><br />
              <span className="font-semibold text-rose-dark text-base md:text-lg flex items-center justify-center gap-1">
                Happy Birthday, cantik! 
                <Heart className="w-4 h-4 md:w-5 md:h-5 inline animate-heartbeat" fill="currentColor" />
              </span>
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToMain}
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Scroll ke bawah
            </span>
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-rose" />
          </div>
        </button>
      </section>

      <div ref={mainRef}>
        {/* Interactive Cake Section */}
        <section className="py-12 md:py-16 px-4 relative z-20">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl text-rose-dark mb-2">
              Make a Wish! ✨
            </h3>
            <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
              Tutup mata, buat permohonan, lalu tiup lilinnya~
            </p>
            <BirthdayCake onBlow={handleCandleBlow} />
          </div>
        </section>

        {/* Interactive Wishes Section */}
        <InteractiveWishes />

        {/* Photo Gallery Section */}
        <section className="py-12 md:py-16 px-4 bg-card/30 backdrop-blur-sm relative z-20">
          <div className="max-w-4xl mx-auto">
            <PhotoGallery />
          </div>
        </section>

        {/* Special Message Section */}
        <section className="py-12 md:py-16 px-4 relative z-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-4 md:mb-6">
              <img
                src={giftBox}
                alt="Gift"
                className="w-20 h-20 md:w-24 md:h-24 mx-auto animate-float"
              />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-rose-dark mb-4 md:mb-6">
              Pesan Spesial 💝
            </h3>
            <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-card card-hover">
              <p className="text-foreground leading-relaxed text-sm md:text-lg">
                "Di hari yang spesial ini, aku cuma mau bilang...
                <br /><br />
                Kamu itu kayak matahari — selalu bikin hari-hari jadi lebih cerah 
                Makasih udah jadi kamu yang apa adanya. Jangan pernah berubah yaaa 
                <br /><br />
                Semoga tahun ini penuh dengan kebahagiaan, dan semoga kamu lebih baik dari tahun sebelum nya
                <br /><br />
                <span className="font-display text-xl md:text-2xl text-rose-dark flex items-center justify-center gap-2">
                  Love you, Viny 
                  <Heart className="w-5 h-5 md:w-6 md:h-6 animate-heartbeat" fill="currentColor" />
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Fun Facts Section */}
        <section className="py-12 md:py-16 px-4 bg-card/30 backdrop-blur-sm relative z-20">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-display text-2xl md:text-3xl text-center text-rose-dark mb-6 md:mb-8">
              Fun Facts: 16 Tahun! 🎯
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                { emoji: "📅", label: "5.844", desc: "Hari sejak lahir" },
                { emoji: "❤️", label: "140.256", desc: "Jam sudah hidup" },
                { emoji: "🌙", label: "192", desc: "Bulan di dunia" },
                { emoji: "⭐", label: "Sweet 16", desc: "Tahun istimewa" },
                { emoji: "🎂", label: "16", desc: "Lilin di kue" },
                { emoji: "💫", label: "∞", desc: "Potensi masa depan" },
              ].map((fact, index) => (
                <div
                  key={index}
                  className={cn(
                    "glass rounded-xl md:rounded-2xl p-3 md:p-4 shadow-soft text-center",
                    "card-hover animate-fade-up"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-2xl md:text-3xl mb-1 md:mb-2 block">{fact.emoji}</span>
                  <p className="font-bold text-foreground text-sm md:text-base">{fact.label}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{fact.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <CountdownSection />

        {/* Footer */}
        <footer className="py-8 md:py-12 px-4 text-center relative z-20 bg-gradient-to-t from-rose-light/30 to-transparent">
          <p className="text-muted-foreground text-xs md:text-sm">
            Dibuat dengan 💖 untuk Vinyta Aura Shaqira
          </p>
          <p className="font-display text-xl md:text-2xl text-rose-dark mt-2">
            Happy 16th Birthday! 🎉
          </p>
          <div className="mt-4 flex justify-center gap-2 md:gap-3">
            {["🎈", "🎂", "🎁", "🎉", "💖"].map((emoji, i) => (
              <span
                key={i}
                className="text-xl md:text-2xl animate-bounce-slow cursor-pointer hover:scale-125 transition-transform"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
          
          {/* Social sharing hint */}
          <p className="mt-6 text-xs text-muted-foreground">
            Share kebahagiaan ini! ✨
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
