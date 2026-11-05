import type { SceneArtProps } from './sceneArtProps';

/** Lagoon background, drawn exactly as in the design (Escena · lagoon). */
export function LagoonScene({ skyColor, sunDisplay, nightDisplay }: SceneArtProps) {
  return (
    <svg width="1280" height="720" viewBox="0 0 1280 720" className="block" aria-hidden="true">
      <rect width="1280" height="720" fill={skyColor} />
      <g transform="translate(1100 110)" display={sunDisplay}>
        <g className="lagoon-sun">
          <circle r="60" fill="#FFF6DD" opacity="0.6" />
          <circle r="44" fill="#FFF1C9" stroke="#4A3424" strokeWidth="4" />
          <circle cx="-12" cy="-4" r="3.5" fill="#4A3424" />
          <circle cx="12" cy="-4" r="3.5" fill="#4A3424" />
          <path d="M-8 10 Q0 15 8 10" stroke="#4A3424" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </g>
      <g fill="#FFFFFF" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round">
        <g className="lagoon-cloud-1">
          <path d="M200 140 Q200 110 232 110 Q244 86 276 92 Q306 78 326 106 Q360 106 360 134 Q360 152 338 152 L216 152 Q200 152 200 140 Z" />
        </g>
        <g className="lagoon-cloud-2">
          <path d="M960 150 Q960 126 986 126 Q998 106 1024 112 Q1048 102 1062 126 Q1088 126 1088 148 Q1088 162 1072 162 L974 162 Q960 162 960 150 Z" />
        </g>
      </g>
      <g stroke="#4A3424" strokeWidth="4" strokeLinejoin="round">
        <path d="M60 380 L260 170 L460 380 Z" fill="#C9D9E8" />
        <path d="M200 233 L260 170 L320 233 L296 222 L278 238 L260 224 L242 240 L224 224 Z" fill="#FFFFFF" />
        <path d="M380 380 L620 140 L860 380 Z" fill="#B7CBDD" />
        <path d="M548 212 L620 140 L692 212 L664 202 L644 220 L620 204 L598 222 L576 204 Z" fill="#FFFFFF" />
        <path d="M760 380 L960 200 L1180 380 Z" fill="#C9D9E8" />
        <path d="M906 249 L960 200 L1016 250 L994 242 L978 256 L960 244 L944 258 L926 244 Z" fill="#FFFFFF" />
      </g>
      <path
        d="M0 400 Q240 350 520 390 Q800 420 1060 370 Q1180 350 1280 380 L1280 720 L0 720 Z"
        fill="#F4F7FA"
        stroke="#4A3424"
        strokeWidth="4"
      />
      <path d="M0 520 Q300 480 640 500 Q980 520 1280 480 L1280 720 L0 720 Z" fill="#E6EEF5" />
      <ellipse cx="640" cy="600" rx="330" ry="86" fill="#BFE3F2" stroke="#4A3424" strokeWidth="4" />
      <g stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M520 590 L560 600 L590 584 M700 620 L730 606 L770 612 M620 560 L640 572" />
      </g>
      <g className="lagoon-ice-sparkle" fill="#FFFFFF">
        <path d="M480 572 l6 -12 l6 12 l-6 12 Z" />
        <path d="M780 590 l5 -10 l5 10 l-5 10 Z" />
        <path d="M650 636 l4 -8 l4 8 l-4 8 Z" />
      </g>
      <g stroke="#4A3424" strokeWidth="3.5">
        <ellipse cx="190" cy="560" rx="70" ry="18" fill="#A9D8EC" />
        <ellipse cx="1080" cy="560" rx="80" ry="20" fill="#A9D8EC" />
        <ellipse cx="360" cy="660" rx="60" ry="16" fill="#A9D8EC" />
        <ellipse cx="930" cy="670" rx="64" ry="16" fill="#A9D8EC" />
      </g>
      <g fill="#CDB89A" stroke="#4A3424" strokeWidth="3">
        <ellipse cx="300" cy="500" rx="26" ry="10" />
        <ellipse cx="350" cy="520" rx="22" ry="9" />
        <ellipse cx="960" cy="500" rx="26" ry="10" />
        <ellipse cx="1010" cy="520" rx="22" ry="9" />
      </g>
      <g transform="translate(110 470)">
        <g className="lagoon-pine">
          <rect x="-10" y="-30" width="20" height="34" rx="4" fill="#9C6B45" stroke="#4A3424" strokeWidth="4" />
          <path d="M-80 -28 L0 -130 L80 -28 Z" fill="#4F8A6B" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-64 -96 L0 -190 L64 -96 Z" fill="#5C9A78" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-46 -160 L0 -240 L46 -160 Z" fill="#6AA886" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-80 -28 Q-40 -44 0 -36 Q40 -44 80 -28 L60 -50 Q30 -60 0 -54 Q-30 -60 -60 -50 Z" fill="#FFFFFF" />
          <path d="M-64 -96 Q-30 -110 0 -102 Q30 -110 64 -96 L46 -116 Q20 -124 0 -118 Q-20 -124 -46 -116 Z" fill="#FFFFFF" />
          <path d="M-20 -206 L0 -240 L20 -206 Q10 -212 0 -208 Q-10 -212 -20 -206 Z" fill="#FFFFFF" />
        </g>
      </g>
      <g transform="translate(1190 460) scale(1.1)">
        <g className="lagoon-pine">
          <rect x="-10" y="-30" width="20" height="34" rx="4" fill="#9C6B45" stroke="#4A3424" strokeWidth="4" />
          <path d="M-80 -28 L0 -130 L80 -28 Z" fill="#4F8A6B" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-64 -96 L0 -190 L64 -96 Z" fill="#5C9A78" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-46 -160 L0 -240 L46 -160 Z" fill="#6AA886" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-80 -28 Q-40 -44 0 -36 Q40 -44 80 -28 L60 -50 Q30 -60 0 -54 Q-30 -60 -60 -50 Z" fill="#FFFFFF" />
          <path d="M-64 -96 Q-30 -110 0 -102 Q30 -110 64 -96 L46 -116 Q20 -124 0 -118 Q-20 -124 -46 -116 Z" fill="#FFFFFF" />
          <path d="M-20 -206 L0 -240 L20 -206 Q10 -212 0 -208 Q-10 -212 -20 -206 Z" fill="#FFFFFF" />
        </g>
      </g>
      <g transform="translate(250 430) scale(0.7)">
        <g className="lagoon-pine">
          <rect x="-10" y="-30" width="20" height="34" rx="4" fill="#9C6B45" stroke="#4A3424" strokeWidth="4" />
          <path d="M-80 -28 L0 -130 L80 -28 Z" fill="#4F8A6B" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-64 -96 L0 -190 L64 -96 Z" fill="#5C9A78" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-80 -28 Q-40 -44 0 -36 Q40 -44 80 -28 L60 -50 Q30 -60 0 -54 Q-30 -60 -60 -50 Z" fill="#FFFFFF" />
          <path d="M-30 -160 L0 -190 L30 -160 Q14 -168 0 -164 Q-14 -168 -30 -160 Z" fill="#FFFFFF" />
        </g>
      </g>
      <g transform="translate(1050 430) scale(0.75)">
        <g className="lagoon-pine">
          <rect x="-10" y="-30" width="20" height="34" rx="4" fill="#9C6B45" stroke="#4A3424" strokeWidth="4" />
          <path d="M-80 -28 L0 -130 L80 -28 Z" fill="#4F8A6B" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-64 -96 L0 -190 L64 -96 Z" fill="#5C9A78" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M-80 -28 Q-40 -44 0 -36 Q40 -44 80 -28 L60 -50 Q30 -60 0 -54 Q-30 -60 -60 -50 Z" fill="#FFFFFF" />
          <path d="M-30 -160 L0 -190 L30 -160 Q14 -168 0 -164 Q-14 -168 -30 -160 Z" fill="#FFFFFF" />
        </g>
      </g>
      <g stroke="#4A3424" strokeWidth="3">
        <g transform="translate(450 470)">
          <g fill="#7DA88E">
            <circle cx="-20" cy="-10" r="22" />
            <circle cx="18" cy="-12" r="24" />
            <circle cx="0" cy="-28" r="22" />
          </g>
          <path d="M-38 -24 Q0 -56 38 -26 Q20 -36 0 -34 Q-20 -36 -38 -24 Z" fill="#FFFFFF" />
          <g fill="#5C6FC2">
            <circle cx="-18" cy="-8" r="5" />
            <circle cx="8" cy="-14" r="5" />
            <circle cx="22" cy="-4" r="5" />
          </g>
        </g>
        <g transform="translate(830 470)">
          <g fill="#7DA88E">
            <circle cx="-20" cy="-10" r="22" />
            <circle cx="18" cy="-12" r="24" />
            <circle cx="0" cy="-28" r="22" />
          </g>
          <path d="M-38 -24 Q0 -56 38 -26 Q20 -36 0 -34 Q-20 -36 -38 -24 Z" fill="#FFFFFF" />
          <g fill="#5C6FC2">
            <circle cx="-18" cy="-8" r="5" />
            <circle cx="8" cy="-14" r="5" />
            <circle cx="22" cy="-4" r="5" />
          </g>
        </g>
      </g>
      <g fill="#FFFFFF" stroke="#B7CBDD" strokeWidth="1.5">
        <circle className="lagoon-snowflake" cx="60" cy="0" r="5" style={{ animationDelay: '-1s' }} />
        <circle className="lagoon-snowflake" cx="180" cy="0" r="4" style={{ animationDelay: '-6s', animationDuration: '11s' }} />
        <circle className="lagoon-snowflake" cx="300" cy="0" r="6" style={{ animationDelay: '-3s' }} />
        <circle className="lagoon-snowflake" cx="420" cy="0" r="4" style={{ animationDelay: '-8s', animationDuration: '12s' }} />
        <circle className="lagoon-snowflake" cx="540" cy="0" r="5" style={{ animationDelay: '-2s', animationDuration: '10s' }} />
        <circle className="lagoon-snowflake" cx="660" cy="0" r="4" style={{ animationDelay: '-5s' }} />
        <circle className="lagoon-snowflake" cx="780" cy="0" r="6" style={{ animationDelay: '-7s', animationDuration: '11s' }} />
        <circle className="lagoon-snowflake" cx="900" cy="0" r="4" style={{ animationDelay: '-4s' }} />
        <circle className="lagoon-snowflake" cx="1020" cy="0" r="5" style={{ animationDelay: '-9s', animationDuration: '12s' }} />
        <circle
          className="lagoon-snowflake"
          cx="1140"
          cy="0"
          r="4"
          style={{ animationDelay: '-1.5s', animationDuration: '10s' }}
        />
        <circle className="lagoon-snowflake" cx="1240" cy="0" r="5" style={{ animationDelay: '-6.5s' }} />
        <circle
          className="lagoon-snowflake"
          cx="120"
          cy="0"
          r="3"
          style={{ animationDelay: '-4.5s', animationDuration: '13s' }}
        />
        <circle className="lagoon-snowflake" cx="480" cy="0" r="3" style={{ animationDelay: '-10s', animationDuration: '13s' }} />
        <circle
          className="lagoon-snowflake"
          cx="840"
          cy="0"
          r="3"
          style={{ animationDelay: '-2.5s', animationDuration: '13s' }}
        />
        <circle
          className="lagoon-snowflake"
          cx="1200"
          cy="0"
          r="3"
          style={{ animationDelay: '-7.5s', animationDuration: '13s' }}
        />
      </g>
      <g display={nightDisplay}>
        <rect width="1280" height="720" fill="#1A2B66" opacity="0.38" style={{ mixBlendMode: 'multiply' }} />
        <g className="lagoon-aurora" fill="none" strokeLinecap="round">
          <path d="M80 90 Q260 30 440 80 T800 70 T1040 60" stroke="#7FE3C4" strokeWidth="26" opacity="0.32" />
          <path d="M140 110 Q320 60 500 100 T860 90 T1000 84" stroke="#B49CF0" strokeWidth="16" opacity="0.28" />
        </g>
        <g fill="#FFF6C8">
          <path
            className="lagoon-night-twinkle"
            transform="translate(60 40)"
            d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
          />
          <path
            className="lagoon-night-twinkle"
            transform="translate(380 30)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-1s' }}
          />
          <path
            className="lagoon-night-twinkle"
            transform="translate(560 130)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-2s' }}
          />
          <path
            className="lagoon-night-twinkle"
            transform="translate(720 26)"
            d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
            style={{ animationDelay: '-0.6s' }}
          />
          <path
            className="lagoon-night-twinkle"
            transform="translate(900 130)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-1.5s' }}
          />
          <path
            className="lagoon-night-twinkle"
            transform="translate(1240 60)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-2.4s' }}
          />
          <path
            className="lagoon-night-twinkle"
            transform="translate(230 150)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-0.3s' }}
          />
        </g>
        <g transform="translate(1100 110)">
          <g className="lagoon-moon">
            <circle r="72" fill="#F2F6FF" opacity="0.14" />
            <circle r="58" fill="#F2F6FF" opacity="0.22" />
            <circle r="44" fill="#F2F6FF" stroke="#4A3424" strokeWidth="4" />
            <circle cx="-16" cy="-18" r="7" fill="#DCE4F2" />
            <circle cx="18" cy="-8" r="5" fill="#DCE4F2" />
            <circle cx="12" cy="22" r="6" fill="#DCE4F2" />
            <path d="M-20 2 Q-14 8 -8 2 M8 2 Q14 8 20 2" stroke="#4A3424" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M-6 16 Q0 20 6 16" stroke="#4A3424" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path
              d="M-34 -30 Q-20 -46 0 -46 Q22 -46 34 -30 L28 -24 Q0 -36 -28 -24 Z"
              fill="#C8664A"
              stroke="#4A3424"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="0" cy="-50" r="7" fill="#FFFFFF" stroke="#4A3424" strokeWidth="3" />
          </g>
        </g>
      </g>
    </svg>
  );
}
