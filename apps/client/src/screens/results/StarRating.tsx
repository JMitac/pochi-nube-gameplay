import { SparkleIcon, StarIcon } from '../../art/icons/icons';

const STARS = [
  { size: 64, delay: 0.5, glowDelay: 1.8 },
  { size: 84, delay: 0.85, glowDelay: 2 },
  { size: 64, delay: 1.2, glowDelay: 2.2 },
];

/** Three stars that spin in one after the other; earned ones glow. */
export function StarRating({ stars }: { stars: 0 | 1 | 2 | 3 }) {
  return (
    <div className="relative flex items-end gap-2.5" role="img" aria-label={`${stars} de 3 estrellas`}>
      <SparkleIcon
        size={22}
        style={{ position: 'absolute', left: -26, top: -4, animation: 'sparkle 1.4s ease-in-out 1.4s infinite both' }}
      />
      <SparkleIcon
        size={18}
        style={{ position: 'absolute', right: -22, top: 8, animation: 'sparkle 1.4s ease-in-out 1.9s infinite both' }}
      />
      {STARS.map((star, index) => {
        const earned = index < stars;
        const spin = `star-spin-in 0.7s cubic-bezier(0.3, 1.5, 0.5, 1) ${star.delay}s both`;
        return (
          <StarIcon
            key={star.delay}
            size={star.size}
            filled={earned}
            style={{ animation: earned ? `${spin}, star-glow 2.2s ease-in-out ${star.glowDelay}s infinite` : spin }}
          />
        );
      })}
    </div>
  );
}
