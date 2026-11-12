const WORDS = [
  "Warmth",
  "Hooded comfort",
  "Soft thick lining",
  "10 colours",
  "$39 per piece",
  "Order fast on WhatsApp",
];

export function Marquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...WORDS, ...WORDS];
  return (
    <div aria-hidden="true" className="overflow-hidden bg-yellow py-4 text-ink">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl font-black md:text-3xl">
              {word}
            </span>
            <span className="size-2.5 rounded-full bg-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}
