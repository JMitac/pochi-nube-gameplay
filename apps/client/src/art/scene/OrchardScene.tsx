import type { SceneArtProps } from './sceneArtProps';

/** Orchard background, drawn exactly as in the design (Escena · orchard). */
export function OrchardScene({ skyColor, sunDisplay, nightDisplay }: SceneArtProps) {
  return (
    <svg width="1280" height="720" viewBox="0 0 1280 720" className="block" aria-hidden="true">
      <rect width="1280" height="720" fill={skyColor} />
      <g transform="translate(1090 120)" display={sunDisplay}>
        <g className="orchard-sun-rays" stroke="#FFB65C" strokeWidth="8" strokeLinecap="round">
          <path d="M0 -100 V-80 M0 80 V100 M-100 0 H-80 M80 0 H100 M-70 -70 L-56 -56 M56 56 L70 70 M-70 70 L-56 56 M56 -56 L70 -70" />
        </g>
        <g className="orchard-sun">
          <circle r="66" fill="#FFC36B" opacity="0.4" />
          <circle r="52" fill="#FFB65C" stroke="#4A3424" strokeWidth="4" />
          <circle cx="-14" cy="-6" r="4" fill="#4A3424" />
          <circle cx="14" cy="-6" r="4" fill="#4A3424" />
          <path d="M-10 10 Q0 18 10 10" stroke="#4A3424" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>
      </g>
      <g fill="#FFF8EC" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round">
        <g className="orchard-cloud-1">
          <path d="M160 130 Q160 100 192 100 Q204 76 236 82 Q266 68 286 96 Q320 96 320 124 Q320 142 298 142 L176 142 Q160 142 160 130 Z" />
        </g>
        <g className="orchard-cloud-2">
          <path d="M640 90 Q640 66 666 66 Q678 46 704 52 Q728 42 742 66 Q768 66 768 88 Q768 102 752 102 L654 102 Q640 102 640 90 Z" />
        </g>
      </g>
      <path d="M0 330 Q300 280 640 300 Q980 270 1280 300 L1280 720 L0 720 Z" fill="#E7E3A6" />
      <path d="M0 420 L1280 300 L1280 720 L0 720 Z" fill="#CFE08F" stroke="#4A3424" strokeWidth="4" />
      <path d="M0 540 Q400 470 760 500 Q1040 520 1280 440 L1280 720 L0 720 Z" fill="#B9D27A" />
      <g stroke="#B9814A" strokeWidth="3" opacity="0.6">
        <path d="M0 470 L1280 350 M0 520 L1280 400" fill="none" />
      </g>
      <g stroke="#4A3424" strokeWidth="4" strokeLinejoin="round">
        <path d="M0 404 L1280 284" stroke="#9C6B45" strokeWidth="10" />
        <path d="M0 434 L1280 314" stroke="#9C6B45" strokeWidth="10" />
        <rect x="70" y="372" width="18" height="70" rx="5" fill="#C08A5A" />
        <rect x="370" y="344" width="18" height="70" rx="5" fill="#C08A5A" />
        <rect x="670" y="316" width="18" height="70" rx="5" fill="#C08A5A" />
        <rect x="970" y="288" width="18" height="70" rx="5" fill="#C08A5A" />
        <rect x="1240" y="262" width="18" height="70" rx="5" fill="#C08A5A" />
      </g>
      <g transform="translate(200 440) scale(0.85)">
        <path
          d="M-34 0 Q-18 -6 -16 -40 L-14 -116 Q-40 -136 -62 -166 L-50 -174 Q-30 -150 -8 -136 L-6 -168 L8 -168 L10 -134 Q34 -150 54 -176 L64 -168 Q44 -138 18 -116 L18 -40 Q20 -6 36 0 Z"
          fill="#9C6B45"
          stroke="#4A3424"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <g className="orchard-tree-crown">
          <g fill="#5E9A4C" stroke="#4A3424" strokeWidth="4">
            <circle cx="-74" cy="-190" r="54" />
            <circle cx="74" cy="-192" r="54" />
            <circle cx="-42" cy="-254" r="52" />
            <circle cx="46" cy="-256" r="52" />
            <circle cx="0" cy="-228" r="72" />
          </g>
          <g fill="#78B464">
            <circle cx="-56" cy="-200" r="44" />
            <circle cx="58" cy="-200" r="44" />
            <circle cx="-30" cy="-256" r="40" />
            <circle cx="34" cy="-258" r="40" />
            <circle cx="0" cy="-226" r="58" />
          </g>
          <g fill="#9CCB7E">
            <ellipse cx="-44" cy="-262" rx="20" ry="12" />
            <ellipse cx="-70" cy="-212" rx="14" ry="9" />
          </g>
          <g stroke="#4A3424" strokeWidth="3" strokeLinejoin="round">
            <path d="M-62 -172 q-10 2 -10 16 q2 14 12 14 q10 0 12 -14 q0 -14 -10 -16 Z" fill="#C9DB6A" />
            <path d="M30 -178 q-10 2 -10 16 q2 14 12 14 q10 0 12 -14 q0 -14 -10 -16 Z" fill="#C9DB6A" />
            <path d="M74 -226 q-10 2 -10 16 q2 14 12 14 q10 0 12 -14 q0 -14 -10 -16 Z" fill="#DCE47A" />
            <path d="M-24 -236 q-10 2 -10 16 q2 14 12 14 q10 0 12 -14 q0 -14 -10 -16 Z" fill="#C9DB6A" />
            <path d="M10 -200 q-10 2 -10 16 q2 14 12 14 q10 0 12 -14 q0 -14 -10 -16 Z" fill="#DCE47A" />
          </g>
        </g>
      </g>
      <g transform="translate(590 380) scale(0.78)">
        <path
          d="M-34 0 Q-18 -6 -16 -40 L-14 -116 Q-40 -136 -62 -166 L-50 -174 Q-30 -150 -8 -136 L-6 -168 L8 -168 L10 -134 Q34 -150 54 -176 L64 -168 Q44 -138 18 -116 L18 -40 Q20 -6 36 0 Z"
          fill="#9C6B45"
          stroke="#4A3424"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <g className="orchard-tree-crown-alt">
          <g fill="#5E9A4C" stroke="#4A3424" strokeWidth="4">
            <circle cx="-74" cy="-190" r="54" />
            <circle cx="74" cy="-192" r="54" />
            <circle cx="-42" cy="-254" r="52" />
            <circle cx="46" cy="-256" r="52" />
            <circle cx="0" cy="-228" r="72" />
          </g>
          <g fill="#78B464">
            <circle cx="-56" cy="-200" r="44" />
            <circle cx="58" cy="-200" r="44" />
            <circle cx="-30" cy="-256" r="40" />
            <circle cx="34" cy="-258" r="40" />
            <circle cx="0" cy="-226" r="58" />
          </g>
          <g fill="#9CCB7E">
            <ellipse cx="-44" cy="-262" rx="20" ry="12" />
            <ellipse cx="-70" cy="-212" rx="14" ry="9" />
          </g>
          <g stroke="#4A3424" strokeWidth="3">
            <circle cx="-60" cy="-160" r="13" fill="#F5A86B" />
            <circle cx="34" cy="-168" r="13" fill="#F5A86B" />
            <circle cx="70" cy="-222" r="13" fill="#F7B97E" />
            <circle cx="-26" cy="-232" r="13" fill="#F5A86B" />
            <circle cx="8" cy="-196" r="13" fill="#F7B97E" />
          </g>
          <g stroke="#E9806A" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M-60 -170 v20 M34 -178 v20 M70 -232 v20 M-26 -242 v20 M8 -206 v20" />
          </g>
        </g>
      </g>
      <g transform="translate(910 420)">
        <g stroke="#4A3424" strokeWidth="4" strokeLinejoin="round">
          <ellipse cx="0" cy="-50" rx="34" ry="52" fill="#6FA35A" />
          <ellipse cx="-44" cy="-110" rx="26" ry="40" transform="rotate(-24 -44 -110)" fill="#7DB167" />
          <ellipse cx="40" cy="-118" rx="26" ry="42" transform="rotate(20 40 -118)" fill="#7DB167" />
          <ellipse cx="-4" cy="-138" rx="22" ry="34" fill="#6FA35A" />
          <ellipse cx="-60" cy="-156" rx="10" ry="14" fill="#D9466E" />
          <ellipse cx="54" cy="-166" rx="10" ry="14" fill="#D9466E" />
          <ellipse cx="-6" cy="-178" rx="10" ry="14" fill="#E25D7E" />
          <ellipse cx="24" cy="-150" rx="9" ry="12" fill="#F28C28" />
        </g>
        <g fill="#4A3424">
          <circle cx="-10" cy="-60" r="2" />
          <circle cx="12" cy="-40" r="2" />
          <circle cx="6" cy="-80" r="2" />
          <circle cx="-44" cy="-110" r="2" />
          <circle cx="40" cy="-120" r="2" />
          <circle cx="-2" cy="-140" r="2" />
        </g>
      </g>
      <g transform="translate(1160 390) scale(0.95)">
        <path
          d="M-34 0 Q-18 -6 -16 -40 L-14 -116 Q-40 -136 -62 -166 L-50 -174 Q-30 -150 -8 -136 L-6 -168 L8 -168 L10 -134 Q34 -150 54 -176 L64 -168 Q44 -138 18 -116 L18 -40 Q20 -6 36 0 Z"
          fill="#9C6B45"
          stroke="#4A3424"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <g className="orchard-tree-crown">
          <g fill="#5E9A4C" stroke="#4A3424" strokeWidth="4">
            <circle cx="-74" cy="-190" r="54" />
            <circle cx="74" cy="-192" r="54" />
            <circle cx="-42" cy="-254" r="52" />
            <circle cx="46" cy="-256" r="52" />
            <circle cx="0" cy="-228" r="72" />
          </g>
          <g fill="#78B464">
            <circle cx="-56" cy="-200" r="44" />
            <circle cx="58" cy="-200" r="44" />
            <circle cx="-30" cy="-256" r="40" />
            <circle cx="34" cy="-258" r="40" />
            <circle cx="0" cy="-226" r="58" />
          </g>
          <g fill="#9CCB7E">
            <ellipse cx="-44" cy="-262" rx="20" ry="12" />
          </g>
          <g stroke="#4A3424" strokeWidth="3">
            <circle cx="-60" cy="-160" r="13" fill="#F5A86B" />
            <circle cx="34" cy="-168" r="13" fill="#F5A86B" />
            <circle cx="70" cy="-222" r="13" fill="#F7B97E" />
            <circle cx="-26" cy="-232" r="13" fill="#F5A86B" />
          </g>
        </g>
      </g>
      <g stroke="#4A3424" strokeWidth="3">
        <g transform="translate(120 640)">
          <g fill="#6FA85C">
            <ellipse cx="0" cy="0" rx="46" ry="20" />
            <ellipse cx="90" cy="-6" rx="46" ry="20" />
            <ellipse cx="180" cy="-10" rx="46" ry="20" />
          </g>
          <g fill="#E8525A">
            <path d="M-14 -6 q-6 2 -4 10 q4 6 8 0 q2 -8 -4 -10 Z" />
            <path d="M16 -10 q-6 2 -4 10 q4 6 8 0 q2 -8 -4 -10 Z" />
            <path d="M80 -14 q-6 2 -4 10 q4 6 8 0 q2 -8 -4 -10 Z" />
            <path d="M106 -8 q-6 2 -4 10 q4 6 8 0 q2 -8 -4 -10 Z" />
            <path d="M170 -18 q-6 2 -4 10 q4 6 8 0 q2 -8 -4 -10 Z" />
            <path d="M196 -12 q-6 2 -4 10 q4 6 8 0 q2 -8 -4 -10 Z" />
          </g>
        </g>
        <g transform="translate(900 600)">
          <g fill="#6FA85C">
            <ellipse cx="0" cy="0" rx="46" ry="20" />
            <ellipse cx="90" cy="-6" rx="46" ry="20" />
            <ellipse cx="180" cy="-10" rx="46" ry="20" />
          </g>
          <g fill="#5C6FC2">
            <circle cx="-14" cy="-6" r="6" />
            <circle cx="10" cy="-10" r="6" />
            <circle cx="80" cy="-14" r="6" />
            <circle cx="100" cy="-8" r="6" />
            <circle cx="170" cy="-16" r="6" />
            <circle cx="192" cy="-12" r="6" />
          </g>
        </g>
      </g>
      <ellipse cx="560" cy="610" rx="70" ry="18" fill="#8ACBE2" stroke="#4A3424" strokeWidth="4" />
      <path d="M528 606 Q546 600 564 606" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g display={nightDisplay}>
        <rect width="1280" height="720" fill="#2A2266" opacity="0.42" style={{ mixBlendMode: 'multiply' }} />
        <g fill="#FFF6C8">
          <path
            className="orchard-night-twinkle"
            transform="translate(300 40)"
            d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
          />
          <path
            className="orchard-night-twinkle"
            transform="translate(400 112)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-0.9s' }}
          />
          <path
            className="orchard-night-twinkle"
            transform="translate(480 46)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-1.7s' }}
          />
          <path
            className="orchard-night-twinkle"
            transform="translate(800 50)"
            d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
            style={{ animationDelay: '-0.5s' }}
          />
          <path
            className="orchard-night-twinkle"
            transform="translate(860 150)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-2.1s' }}
          />
          <path
            className="orchard-night-twinkle"
            transform="translate(1100 30)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-1.3s' }}
          />
          <path
            className="orchard-night-twinkle"
            transform="translate(120 60)"
            d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
            style={{ animationDelay: '-2.4s' }}
          />
          <path
            className="orchard-night-twinkle"
            transform="translate(560 180)"
            d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z"
            style={{ animationDelay: '-0.3s' }}
          />
        </g>
        <g transform="translate(970 96)">
          <g className="orchard-moon">
            <circle r="72" fill="#FFE9C2" opacity="0.14" />
            <circle r="58" fill="#FFE9C2" opacity="0.22" />
            <circle r="44" fill="#FFE9C2" stroke="#4A3424" strokeWidth="4" />
            <circle cx="-16" cy="-18" r="7" fill="#EED6A6" />
            <circle cx="18" cy="-8" r="5" fill="#EED6A6" />
            <circle cx="12" cy="22" r="6" fill="#EED6A6" />
            <path d="M-20 2 Q-14 8 -8 2 M8 2 Q14 8 20 2" stroke="#4A3424" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M-6 16 Q0 20 6 16" stroke="#4A3424" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </g>
        <g>
          <circle className="orchard-firefly" cx="300" cy="560" r="10" fill="#FFF27A" opacity="0.35" />
          <circle className="orchard-firefly" cx="300" cy="560" r="4" fill="#FFF8B8" />
          <circle
            className="orchard-firefly"
            cx="460"
            cy="480"
            r="10"
            fill="#FFF27A"
            opacity="0.35"
            style={{ animationDelay: '-1.2s' }}
          />
          <circle className="orchard-firefly" cx="460" cy="480" r="4" fill="#FFF8B8" style={{ animationDelay: '-1.2s' }} />
          <circle
            className="orchard-firefly"
            cx="760"
            cy="520"
            r="10"
            fill="#FFF27A"
            opacity="0.35"
            style={{ animationDelay: '-2.2s' }}
          />
          <circle className="orchard-firefly" cx="760" cy="520" r="4" fill="#FFF8B8" style={{ animationDelay: '-2.2s' }} />
          <circle
            className="orchard-firefly"
            cx="1000"
            cy="440"
            r="10"
            fill="#FFF27A"
            opacity="0.35"
            style={{ animationDelay: '-0.6s' }}
          />
          <circle className="orchard-firefly" cx="1000" cy="440" r="4" fill="#FFF8B8" style={{ animationDelay: '-0.6s' }} />
          <circle
            className="orchard-firefly"
            cx="640"
            cy="640"
            r="10"
            fill="#FFF27A"
            opacity="0.35"
            style={{ animationDelay: '-1.8s' }}
          />
          <circle className="orchard-firefly" cx="640" cy="640" r="4" fill="#FFF8B8" style={{ animationDelay: '-1.8s' }} />
        </g>
      </g>
    </svg>
  );
}
