interface TitleLetter {
  character: string;
  delaySeconds: number;
  isConnector?: boolean;
}

const TITLE_LETTERS: TitleLetter[] = [
  { character: 'P', delaySeconds: 0.05 },
  { character: 'o', delaySeconds: 0.12 },
  { character: 'c', delaySeconds: 0.19 },
  { character: 'h', delaySeconds: 0.26 },
  { character: 'i', delaySeconds: 0.33 },
  { character: 'y', delaySeconds: 0.45, isConnector: true },
  { character: 'N', delaySeconds: 0.57 },
  { character: 'u', delaySeconds: 0.64 },
  { character: 'b', delaySeconds: 0.71 },
  { character: 'e', delaySeconds: 0.78 },
];

/** "Pochi y Nube" with each letter dropping in, as on the cover. */
export function GameTitle() {
  return (
    <h1
      aria-label="Pochi y Nube"
      className="font-display text-cream m-0 flex text-[132px] font-extrabold leading-none tracking-[1px]"
      style={{ WebkitTextStroke: '12px #4A3424', paintOrder: 'stroke fill', textShadow: '0 10px 0 #4A3424' }}
    >
      {TITLE_LETTERS.map((letter) => (
        <span
          key={`${letter.character}-${letter.delaySeconds}`}
          aria-hidden="true"
          className={`title-letter ${letter.isConnector ? 'text-honey mx-[34px]' : ''}`}
          style={{ animationDelay: `${letter.delaySeconds}s` }}
        >
          {letter.character}
        </span>
      ))}
    </h1>
  );
}
