import { useState, useEffect } from "react";
import { Calendar, Clock, Star } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(currentYear, 11, 5); // December 5th

      // If birthday has passed this year, use next year
      if (now > birthday) {
        birthday = new Date(currentYear + 1, 11, 5);
      }

      // Check if it's birthday today
      const today = new Date();
      if (today.getMonth() === 11 && today.getDate() === 5) {
        setIsBirthday(true);
        return null;
      }

      const difference = birthday.getTime() - now.getTime();

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isBirthday) {
    return (
      <section className="py-12 md:py-16 px-4 relative z-20">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-gradient-to-br from-gold/20 to-rose/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-glow border border-gold/30">
            <Star className="w-12 h-12 mx-auto text-gold mb-4 animate-bounce-slow" fill="currentColor" />
            <h3 className="font-display text-3xl md:text-4xl text-rose-dark mb-2">
              Hari Ini! 🎉
            </h3>
            <p className="text-lg text-foreground/80">
              Selamat ulang tahun yang ke-16, Viny..
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {["🎂", "🎁", "🎈", "🎉", "💖"].map((emoji, i) => (
                <span
                  key={i}
                  className="text-2xl md:text-3xl animate-bounce-slow"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!timeLeft) return null;

  return (
    <section className="py-12 md:py-16 px-4 relative z-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Calendar className="w-8 h-8 mx-auto text-rose mb-2" />
          <h3 className="font-display text-2xl md:text-3xl text-rose-dark">
            Hitung Mundur ke 17! 🎂
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            5 Desember tahun depan
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {[
            { value: timeLeft.days, label: "Hari" },
            { value: timeLeft.hours, label: "Jam" },
            { value: timeLeft.minutes, label: "Menit" },
            { value: timeLeft.seconds, label: "Detik" },
          ].map((item, index) => (
            <div
              key={item.label}
              className="bg-card/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-card text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="font-display text-2xl md:text-4xl lg:text-5xl text-rose-dark mb-1">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
