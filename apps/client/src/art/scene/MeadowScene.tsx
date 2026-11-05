import type { SceneArtProps } from './sceneArtProps';

/** Meadow background, drawn exactly as in the design (Escena · meadow). */
export function MeadowScene({ skyColor, sunDisplay, nightDisplay }: SceneArtProps) {
  return (
    <svg width="1280" height="720" viewBox="0 0 1280 720" className="block" aria-hidden="true">
      <rect width="1280" height="720" fill={skyColor} />
      <g transform="translate(1110 104)" display={sunDisplay}>
        <g className="meadow-sun-rays" stroke="#FFD36B" strokeWidth="8" strokeLinecap="round">
          <path d="M0 -96 V-76 M0 76 V96 M-96 0 H-76 M76 0 H96 M-68 -68 L-54 -54 M54 54 L68 68 M-68 68 L-54 54 M54 -54 L68 -68" />
        </g>
        <g className="meadow-sun">
          <circle r="62" fill="#FFE29A" opacity="0.45" />
          <circle r="48" fill="#FFD36B" stroke="#4A3424" strokeWidth="4" />
          <circle cx="-14" cy="-6" r="4" fill="#4A3424" />
          <circle cx="14" cy="-6" r="4" fill="#4A3424" />
          <path d="M-10 10 Q0 18 10 10" stroke="#4A3424" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="-24" cy="8" rx="6" ry="4" fill="#F4A9A0" />
          <ellipse cx="24" cy="8" rx="6" ry="4" fill="#F4A9A0" />
        </g>
      </g>
      <g fill="#FFFFFF" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round">
        <g className="meadow-cloud-1">
          <path d="M120 150 Q120 118 152 118 Q164 92 196 98 Q226 84 246 112 Q280 112 280 142 Q280 160 258 160 L136 160 Q120 160 120 150 Z" />
        </g>
        <g className="meadow-cloud-2">
          <path d="M820 92 Q820 66 846 66 Q858 46 884 52 Q908 42 922 66 Q948 66 948 88 Q948 102 932 102 L834 102 Q820 102 820 92 Z" />
        </g>
        <g className="meadow-cloud-3">
          <path d="M500 214 Q500 196 520 196 Q530 180 550 184 Q568 176 580 196 Q600 196 600 210 Q600 220 588 220 L510 220 Q500 220 500 214 Z" />
        </g>
      </g>
      <path d="M0 372 Q160 318 330 350 Q520 300 720 342 Q900 300 1080 330 Q1190 312 1280 330 L1280 720 L0 720 Z" fill="#D5EBC0" />
      <path
        d="M0 410 Q200 336 450 392 Q690 444 930 380 Q1110 336 1280 372 L1280 720 L0 720 Z"
        fill="#B9DC9A"
        stroke="#4A3424"
        strokeWidth="4"
      />
      <path d="M0 500 Q320 452 640 486 Q960 520 1280 470 L1280 720 L0 720 Z" fill="#9FCB80" />
      <g transform="translate(130 440) scale(0.92)">
        <path
          d="M-34 0 Q-18 -6 -16 -40 L-14 -116 Q-40 -136 -62 -166 L-50 -174 Q-30 -150 -8 -136 L-6 -168 L8 -168 L10 -134 Q34 -150 54 -176 L64 -168 Q44 -138 18 -116 L18 -40 Q20 -6 36 0 Z"
          fill="#9C6B45"
          stroke="#4A3424"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M-4 -26 Q0 -58 -4 -92 M8 -48 Q12 -72 8 -100"
          stroke="#7A4F30"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <g className="meadow-tree-crown">
          <g fill="#5E9A4C" stroke="#4A3424" strokeWidth="4">
            <circle cx="-74" cy="-190" r="54" />
            <circle cx="74" cy="-192" r="54" />
            <circle cx="-42" cy="-254" r="52" />
            <circle cx="46" cy="-256" r="52" />
            <circle cx="0" cy="-228" r="72" />
            <circle cx="0" cy="-292" r="44" />
          </g>
          <g fill="#78B464">
            <circle cx="-56" cy="-200" r="44" />
            <circle cx="58" cy="-200" r="44" />
            <circle cx="-30" cy="-256" r="40" />
            <circle cx="34" cy="-258" r="40" />
            <circle cx="0" cy="-226" r="58" />
            <circle cx="0" cy="-284" r="32" />
          </g>
          <g fill="#9CCB7E">
            <ellipse cx="-44" cy="-262" rx="20" ry="12" />
            <ellipse cx="-70" cy="-212" rx="14" ry="9" />
            <ellipse cx="-6" cy="-298" rx="14" ry="8" />
          </g>
          <g stroke="#4A7D3B" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M30 -220 q6 -6 12 0 M-20 -190 q6 -6 12 0 M60 -250 q6 -6 12 0" />
          </g>
          <g stroke="#4A3424" strokeWidth="3" strokeLinejoin="round">
            <path d="M-62 -172 q-10 2 -10 16 q2 14 12 14 q10 0 12 -14 q0 -14 -10 -16 Z" fill="#C9DB6A" />
            <path d="M30 -178 q-10 2 -10 16 q2 14 12 14 q10 0 12 -14 q0 -14 -10 -16 Z" fill="#C9DB6A" />
            <path d="M74 -226 q-10 2 -10 16 q2 14 12 14 q10 0 12 -14 q0 -14 -10 -16 Z" fill="#DCE47A" />
            <path d="M-24 -236 q-10 2 -10 16 q2 14 12 14 q10 0 12 -14 q0 -14 -10 -16 Z" fill="#C9DB6A" />
          </g>
        </g>
      </g>
      <g transform="translate(1160 430)">
        <path
          d="M-34 0 Q-18 -6 -16 -40 L-14 -116 Q-40 -136 -62 -166 L-50 -174 Q-30 -150 -8 -136 L-6 -168 L8 -168 L10 -134 Q34 -150 54 -176 L64 -168 Q44 -138 18 -116 L18 -40 Q20 -6 36 0 Z"
          fill="#9C6B45"
          stroke="#4A3424"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M-4 -26 Q0 -58 -4 -92 M8 -48 Q12 -72 8 -100"
          stroke="#7A4F30"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <g className="meadow-tree-crown-alt">
          <g fill="#5E9A4C" stroke="#4A3424" strokeWidth="4">
            <circle cx="-74" cy="-190" r="54" />
            <circle cx="74" cy="-192" r="54" />
            <circle cx="-42" cy="-254" r="52" />
            <circle cx="46" cy="-256" r="52" />
            <circle cx="0" cy="-228" r="72" />
            <circle cx="0" cy="-292" r="44" />
          </g>
          <g fill="#78B464">
            <circle cx="-56" cy="-200" r="44" />
            <circle cx="58" cy="-200" r="44" />
            <circle cx="-30" cy="-256" r="40" />
            <circle cx="34" cy="-258" r="40" />
            <circle cx="0" cy="-226" r="58" />
            <circle cx="0" cy="-284" r="32" />
          </g>
          <g fill="#9CCB7E">
            <ellipse cx="-44" cy="-262" rx="20" ry="12" />
            <ellipse cx="-70" cy="-212" rx="14" ry="9" />
            <ellipse cx="-6" cy="-298" rx="14" ry="8" />
          </g>
          <g stroke="#4A7D3B" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M30 -220 q6 -6 12 0 M-20 -190 q6 -6 12 0 M60 -250 q6 -6 12 0" />
          </g>
          <g stroke="#4A3424" strokeWidth="3">
            <circle cx="-60" cy="-160" r="12" fill="#F5A86B" />
            <circle cx="34" cy="-168" r="12" fill="#F5A86B" />
            <circle cx="70" cy="-222" r="12" fill="#F7B97E" />
            <circle cx="-26" cy="-232" r="12" fill="#F5A86B" />
            <circle cx="8" cy="-280" r="11" fill="#F7B97E" />
          </g>
          <g stroke="#E9806A" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M-60 -170 v20 M34 -178 v20 M70 -232 v20 M-26 -242 v20" />
          </g>
        </g>
      </g>
      <g transform="translate(330 470)">
        <g fill="#6FA85C" stroke="#4A3424" strokeWidth="4">
          <circle cx="-26" cy="-14" r="26" />
          <circle cx="22" cy="-16" r="28" />
          <circle cx="0" cy="-34" r="28" />
        </g>
        <g stroke="#4A3424" strokeWidth="2.5">
          <path d="M-30 -20 q-6 2 -4 10 q4 6 8 0 q2 -8 -4 -10 Z" fill="#E8525A" />
          <path d="M14 -30 q-6 2 -4 10 q4 6 8 0 q2 -8 -4 -10 Z" fill="#E8525A" />
          <path d="M24 -8 q-6 2 -4 10 q4 6 8 0 q2 -8 -4 -10 Z" fill="#E8525A" />
        </g>
      </g>
      <g transform="translate(960 462)">
        <g fill="#6FA85C" stroke="#4A3424" strokeWidth="4">
          <circle cx="-26" cy="-14" r="26" />
          <circle cx="22" cy="-16" r="28" />
          <circle cx="0" cy="-34" r="28" />
        </g>
        <g fill="#5C6FC2" stroke="#4A3424" strokeWidth="2.5">
          <circle cx="-24" cy="-22" r="6" />
          <circle cx="-12" cy="-16" r="6" />
          <circle cx="16" cy="-34" r="6" />
          <circle cx="28" cy="-22" r="6" />
          <circle cx="4" cy="-46" r="6" />
        </g>
      </g>
      <ellipse cx="640" cy="640" rx="250" ry="58" fill="#8ACBE2" stroke="#4A3424" strokeWidth="4" />
      <g className="meadow-water-shine" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M500 632 Q540 622 580 632" />
        <path d="M690 650 Q720 642 750 650" />
        <path d="M610 616 Q630 610 650 616" />
      </g>
      <g stroke="#4A3424" strokeWidth="3">
        <path d="M540 656 a20 9 0 1 0 40 0 a20 9 0 1 0 -40 0 Z M560 656 l18 -4" fill="#6FA85C" />
        <path d="M730 624 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 Z" fill="#6FA85C" />
        <circle cx="742" cy="620" r="6" fill="#F7B7C4" />
      </g>
      <g stroke="#4A3424" strokeWidth="3.5" strokeLinecap="round">
        <path d="M404 640 V578 M418 646 V570 M890 640 V582 M876 646 V574" fill="none" />
        <rect x="398" y="566" width="12" height="26" rx="6" fill="#9C6B45" />
        <rect x="412" y="558" width="12" height="26" rx="6" fill="#9C6B45" />
        <rect x="884" y="570" width="12" height="26" rx="6" fill="#9C6B45" />
        <rect x="870" y="562" width="12" height="26" rx="6" fill="#9C6B45" />
      </g>
      <g stroke="#4A3424" strokeWidth="3">
        <g className="meadow-flower">
          <path d="M210 576 V560" stroke="#5E9A4C" />
          <circle cx="210" cy="556" r="8" fill="#FFFFFF" />
          <circle cx="210" cy="556" r="3" fill="#F5C64F" stroke="none" />
        </g>
        <g className="meadow-flower">
          <path d="M300 626 V610" stroke="#5E9A4C" />
          <circle cx="300" cy="606" r="8" fill="#F7B7C4" />
        </g>
        <g className="meadow-flower">
          <path d="M1010 576 V560" stroke="#5E9A4C" />
          <circle cx="1010" cy="556" r="8" fill="#FFFFFF" />
          <circle cx="1010" cy="556" r="3" fill="#F5C64F" stroke="none" />
        </g>
        <g className="meadow-flower">
          <path d="M1090 630 V614" stroke="#5E9A4C" />
          <circle cx="1090" cy="610" r="8" fill="#F7B7C4" />
        </g>
        <g className="meadow-flower">
          <path d="M470 520 V506" stroke="#5E9A4C" />
          <circle cx="470" cy="502" r="7" fill="#FFFFFF" />
        </g>
        <g className="meadow-flower">
          <path d="M820 512 V498" stroke="#5E9A4C" />
          <circle cx="820" cy="494" r="7" fill="#F7B7C4" />
        </g>
      </g>
      <g display={nightDisplay}>
        <rect width="1280" height="720" fill="#1E2A63" opacity="0.42" style={{ mixBlendMode: 'multiply' }} />
        <g fill="#FFF6C8">
          <path
            className="meadow-night-twinkle"
            transform="translate(330 50)"
            d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(420 124)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-0.8s' }}
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(520 40)"
            d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
            style={{ animationDelay: '-1.6s' }}
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(612 96)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-0.4s' }}
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(700 34)"
            d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
            style={{ animationDelay: '-2s' }}
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(760 160)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-1.2s' }}
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(1000 50)"
            d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
            style={{ animationDelay: '-0.6s' }}
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(1200 40)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-1.8s' }}
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(80 40)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-2.2s' }}
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(270 240)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-1s' }}
          />
          <path
            className="meadow-night-twinkle"
            transform="translate(660 220)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-2.4s' }}
          />
        </g>
        <g transform="translate(880 100)">
          <g className="meadow-moon">
            <circle r="76" fill="#FFF1BF" opacity="0.14" />
            <circle r="60" fill="#FFF1BF" opacity="0.22" />
            <circle r="46" fill="#FFF1BF" stroke="#4A3424" strokeWidth="4" />
            <circle cx="-18" cy="-18" r="7" fill="#F1DFA0" />
            <circle cx="20" cy="-10" r="5" fill="#F1DFA0" />
            <circle cx="14" cy="24" r="6" fill="#F1DFA0" />
            <path d="M-20 2 Q-14 8 -8 2 M8 2 Q14 8 20 2" stroke="#4A3424" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M-6 16 Q0 20 6 16" stroke="#4A3424" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="-24" cy="14" rx="6" ry="4" fill="#F4A9A0" />
            <ellipse cx="24" cy="14" rx="6" ry="4" fill="#F4A9A0" />
          </g>
          <text
            className="meadow-moon-snore"
            x="50"
            y="-34"
            fontFamily="'Baloo 2', sans-serif"
            fontWeight="800"
            fontSize="22"
            fill="#FFF6C8"
          >
            z
          </text>
          <text
            className="meadow-moon-snore"
            x="62"
            y="-52"
            fontFamily="'Baloo 2', sans-serif"
            fontWeight="800"
            fontSize="16"
            fill="#FFF6C8"
            style={{ animationDelay: '-1.5s' }}
          >
            z
          </text>
        </g>
        <g>
          <circle className="meadow-firefly" cx="240" cy="520" r="10" fill="#FFF27A" opacity="0.35" />
          <circle className="meadow-firefly" cx="240" cy="520" r="4" fill="#FFF8B8" />
          <circle
            className="meadow-firefly"
            cx="380"
            cy="580"
            r="10"
            fill="#FFF27A"
            opacity="0.35"
            style={{ animationDelay: '-1s' }}
          />
          <circle className="meadow-firefly" cx="380" cy="580" r="4" fill="#FFF8B8" style={{ animationDelay: '-1s' }} />
          <circle
            className="meadow-firefly"
            cx="900"
            cy="560"
            r="10"
            fill="#FFF27A"
            opacity="0.35"
            style={{ animationDelay: '-2s' }}
          />
          <circle className="meadow-firefly" cx="900" cy="560" r="4" fill="#FFF8B8" style={{ animationDelay: '-2s' }} />
          <circle
            className="meadow-firefly"
            cx="1050"
            cy="500"
            r="10"
            fill="#FFF27A"
            opacity="0.35"
            style={{ animationDelay: '-0.5s' }}
          />
          <circle className="meadow-firefly" cx="1050" cy="500" r="4" fill="#FFF8B8" style={{ animationDelay: '-0.5s' }} />
          <circle
            className="meadow-firefly"
            cx="560"
            cy="470"
            r="10"
            fill="#FFF27A"
            opacity="0.35"
            style={{ animationDelay: '-2.6s' }}
          />
          <circle className="meadow-firefly" cx="560" cy="470" r="4" fill="#FFF8B8" style={{ animationDelay: '-2.6s' }} />
          <circle
            className="meadow-firefly"
            cx="760"
            cy="600"
            r="10"
            fill="#FFF27A"
            opacity="0.35"
            style={{ animationDelay: '-1.6s' }}
          />
          <circle className="meadow-firefly" cx="760" cy="600" r="4" fill="#FFF8B8" style={{ animationDelay: '-1.6s' }} />
        </g>
      </g>
    </svg>
  );
}
