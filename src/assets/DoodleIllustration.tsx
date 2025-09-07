// Hand-drawn style SVG illustrations for the mood journal

export const WelcomeDoodle = () => (
  <svg
    viewBox="0 0 400 300"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Sun */}
    <circle
      cx="350"
      cy="50"
      r="25"
      fill="hsl(var(--soft-yellow))"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
    />
    {/* Sun rays */}
    <g stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
      <line x1="350" y1="15" x2="350" y2="5" />
      <line x1="375" y1="25" x2="385" y2="15" />
      <line x1="385" y1="50" x2="395" y2="50" />
      <line x1="375" y1="75" x2="385" y2="85" />
      <line x1="350" y1="85" x2="350" y2="95" />
      <line x1="325" y1="75" x2="315" y2="85" />
      <line x1="315" y1="50" x2="305" y2="50" />
      <line x1="325" y1="25" x2="315" y2="15" />
    </g>

    {/* Cloud */}
    <path
      d="M80 80 Q70 70, 90 70 Q110 60, 130 70 Q140 65, 145 75 Q150 85, 135 90 Q125 95, 115 90 Q95 95, 85 90 Q75 85, 80 80 Z"
      fill="white"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
    />

    {/* Flower */}
    <g transform="translate(50, 200)">
      {/* Petals */}
      <ellipse cx="0" cy="-15" rx="6" ry="12" fill="hsl(var(--baby-pink))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <ellipse cx="15" cy="0" rx="12" ry="6" fill="hsl(var(--baby-pink))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <ellipse cx="0" cy="15" rx="6" ry="12" fill="hsl(var(--baby-pink))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <ellipse cx="-15" cy="0" rx="12" ry="6" fill="hsl(var(--baby-pink))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      {/* Center */}
      <circle cx="0" cy="0" r="5" fill="hsl(var(--soft-yellow))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      {/* Stem */}
      <line x1="0" y1="15" x2="0" y2="50" stroke="hsl(var(--mint))" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Heart */}
    <path
      d="M200 150 C200 140, 190 130, 180 130 C170 130, 160 140, 160 150 C160 140, 150 130, 140 130 C130 130, 120 140, 120 150 C120 170, 160 200, 160 200 C160 200, 200 170, 200 150 Z"
      fill="hsl(var(--lavender))"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      transform="translate(40, -30)"
    />

    {/* Butterfly */}
    <g transform="translate(300, 150)">
      {/* Wings */}
      <ellipse cx="-8" cy="-8" rx="12" ry="8" fill="hsl(var(--mint))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <ellipse cx="8" cy="-8" rx="12" ry="8" fill="hsl(var(--sky-blue))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <ellipse cx="-6" cy="6" rx="8" ry="6" fill="hsl(var(--baby-pink))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <ellipse cx="6" cy="6" rx="8" ry="6" fill="hsl(var(--lavender))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      {/* Body */}
      <line x1="0" y1="-15" x2="0" y2="15" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      {/* Antennae */}
      <path d="M-2 -15 Q-5 -20, -3 -22" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M2 -15 Q5 -20, 3 -22" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>

    {/* Stars */}
    <g fill="hsl(var(--soft-yellow))" stroke="hsl(var(--primary))" strokeWidth="1">
      <path d="M250 50 L252 56 L258 56 L253 60 L255 66 L250 62 L245 66 L247 60 L242 56 L248 56 Z" />
      <path d="M100 120 L101 124 L105 124 L102 127 L103 131 L100 128 L97 131 L98 127 L95 124 L99 124 Z" />
      <path d="M320 220 L321 224 L325 224 L322 227 L323 231 L320 228 L317 231 L318 227 L315 224 L319 224 Z" />
    </g>
  </svg>
);

export const MoodEmoji = ({ mood, className = "w-8 h-8" }: { mood: string; className?: string }) => {
  const emojiMap: { [key: string]: string } = {
    Happy: "😊",
    Sad: "😢",
    Excited: "🤩",
    Angry: "😠",
    Stressed: "😰",
    Calm: "😌",
    Anxious: "😰",
    Grateful: "🙏",
    Tired: "😴",
    Energetic: "⚡",
  };

  return (
    <span className={`${className} text-2xl`} role="img" aria-label={mood}>
      {emojiMap[mood] || "😊"}
    </span>
  );
};

export const QuoteBubble = ({ children }: { children: React.ReactNode }) => (
  <div className="relative bg-white p-6 rounded-3xl border-2 border-primary/30 shadow-lg">
    {children}
    {/* Speech bubble tail */}
    <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white"></div>
    <div className="absolute -bottom-1 left-8 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-primary/30"></div>
  </div>
);