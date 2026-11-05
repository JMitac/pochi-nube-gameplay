import type { DuckPoseValues } from './duckPose';

/** Pochi as drawn in the design (Personaje: Pochi). Pose values come from buildDuckPose. */
export function PochiArt({ pose }: { pose: DuckPoseValues }) {
  return (
    <g transform={pose.flipTransform}>
      <g className={pose.shadowClass}>
        <ellipse cx="100" cy="208" rx={pose.shadowRadiusX} ry="8" fill="#4A3424" opacity={pose.shadowOpacity} />
      </g>
      <g className={pose.jumpClass}>
        <g transform={pose.bodyTransform}>
          <g className={pose.bodyClass}>
            <g transform={pose.frontFootTransform}>
              <g className={pose.frontFootClass}>
                <path
                  d="M86 178 L86 194 Q76 196 72 203 L100 203 Q98 196 92 194 L92 178 Z"
                  fill="#F0A341"
                  stroke="#4A3424"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <g transform={pose.backFootTransform}>
              <g className={pose.backFootClass}>
                <path
                  d="M118 178 L118 194 Q108 196 104 203 L132 203 Q130 196 124 194 L124 178 Z"
                  fill="#F0A341"
                  stroke="#4A3424"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <path
              d="M24 98 Q40 110 54 116 Q80 106 106 110 C116 104 112 88 113 72 C114 44 132 30 150 32 C168 34 178 48 177 64 C176 76 172 84 166 92 C160 100 158 108 162 118 C178 128 180 166 146 184 C116 198 64 196 42 176 C28 164 26 136 36 124 Q28 112 24 98 Z"
              fill="#F6EBD7"
            />
            <g>
              <path d="M44 134 Q62 120 106 118 Q140 120 164 134 Q140 128 106 128 Q70 130 44 144 Z" fill="#E6CDA4" />
              <ellipse cx="50" cy="128" rx="6" ry="3.5" fill="#A87A4F" />
              <ellipse cx="66" cy="120" rx="7" ry="4" fill="#8A5F3C" />
              <ellipse cx="84" cy="128" rx="6" ry="3.5" fill="#C9A27A" />
              <ellipse cx="98" cy="118" rx="6" ry="3.5" fill="#A87A4F" />
              <ellipse cx="116" cy="124" rx="7" ry="4" fill="#8A5F3C" />
              <ellipse cx="138" cy="120" rx="6" ry="3.5" fill="#C9A27A" />
              <ellipse cx="156" cy="130" rx="6" ry="3.5" fill="#A87A4F" />
              <ellipse cx="166" cy="146" rx="5" ry="3" fill="#8A5F3C" />
              <ellipse cx="158" cy="162" rx="5" ry="3" fill="#C9A27A" />
              <ellipse cx="146" cy="174" rx="4" ry="2.5" fill="#A87A4F" />
              <ellipse cx="40" cy="146" rx="5" ry="3" fill="#A87A4F" />
              <ellipse cx="60" cy="140" rx="5" ry="3" fill="#C9A27A" />
              <ellipse cx="138" cy="104" rx="4" ry="2.5" fill="#C9A27A" />
              <path d="M117 58 C119 40 134 34 150 35 C164 36 172 44 174 55 C158 49 134 50 117 58 Z" fill="#8A5F3C" />
              <path d="M121 76 Q148 68 171 72" stroke="#8A5F3C" strokeWidth="5" fill="none" strokeLinecap="round" />
            </g>
            <path
              d="M24 98 Q40 110 54 116 Q80 106 106 110 C116 104 112 88 113 72 C114 44 132 30 150 32 C168 34 178 48 177 64 C176 76 172 84 166 92 C160 100 158 108 162 118 C178 128 180 166 146 184 C116 198 64 196 42 176 C28 164 26 136 36 124 Q28 112 24 98 Z"
              fill="none"
              stroke="#4A3424"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path d="M90 108 Q120 126 112 166" stroke="#5E6833" strokeWidth="6" fill="none" strokeLinecap="round" />
            <g transform="rotate(-6 69 116)">
              <rect x="46" y="94" width="46" height="44" rx="13" fill="#7A8445" stroke="#4A3424" strokeWidth="4" />
              <path d="M46 112 Q69 96 92 112" fill="#8C9752" stroke="#4A3424" strokeWidth="4" strokeLinejoin="round" />
              <rect x="58" y="120" width="22" height="12" rx="5" fill="#68723A" stroke="#4A3424" strokeWidth="3" />
              <path d="M52 138 L50 150" stroke="#4A3424" strokeWidth="2.5" />
              <circle cx="51" cy="140" r="2.5" fill="#F0C24A" stroke="#4A3424" strokeWidth="1.5" />
              <path
                d="M40 158 Q40 150 50 150 Q60 150 60 158 L60 170 L40 170 Z"
                fill="#F3D9A4"
                stroke="#B9814A"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path d="M44 158 L56 158 L56 167 L44 167 Z" fill="#FFF3D6" />
            </g>
            <g transform={pose.wingTransform}>
              <g className={pose.wingClass}>
                <path
                  d="M140 132 C143 152 135 170 112 176 L100 177 Q94 181 88 177 Q82 180 77 175 Q70 176 67 169 Q61 166 63 159 Q72 136 104 126 Q126 120 140 132 Z"
                  fill="#E7D2AE"
                />
                <g>
                  <path
                    d="M100 177 Q94 181 88 177 Q82 180 77 175 Q70 176 67 169 Q61 166 63 159 Q76 164 88 168 Q96 171 100 177 Z"
                    fill="#B98A5E"
                  />
                  <path
                    d="M88 176 L83 168 M77 174 L73 166"
                    stroke="#8A5F3C"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M134 150 Q114 160 90 160 Q88 164 92 168 Q116 168 132 158 Z"
                    fill="#2F4F86"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M124 159 Q112 164 99 164" stroke="#6F93C9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path
                    d="M134 138 q-6 7 -12 3 q-6 7 -12 3 q-6 7 -12 3 q-6 7 -12 3"
                    stroke="#C9A27A"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M128 130 q-6 6 -12 2 q-6 6 -12 2"
                    stroke="#D2B48A"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <ellipse cx="122" cy="131" rx="10" ry="3.5" fill="#FFF6E6" opacity="0.8" />
                </g>
                <path
                  d="M140 132 C143 152 135 170 112 176 L100 177 Q94 181 88 177 Q82 180 77 175 Q70 176 67 169 Q61 166 63 159 Q72 136 104 126 Q126 120 140 132 Z"
                  fill="none"
                  stroke="#4A3424"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <g className={pose.eyeClass}>
              <circle cx="154" cy="58" r="7" fill="#2A1C12" />
              <circle cx="156.5" cy="55.5" r="2.6" fill="#FFFFFF" />
            </g>
            <ellipse cx="150" cy="80" rx="8" ry="5" fill="#F4A9A0" opacity="0.85" />
            <g transform={pose.beakTransform}>
              <g className={pose.beakClass}>
                <path
                  d="M172 76 Q190 76 196 79 Q192 89 172 86 Z"
                  fill="#E9C85E"
                  stroke="#4A3424"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <path
              d="M170 60 Q198 58 199 70 Q192 78 172 78 Z"
              fill="#F3DB7A"
              stroke="#4A3424"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle cx="185" cy="65" r="1.8" fill="#4A3424" />
          </g>
        </g>
      </g>
    </g>
  );
}
