import type { DuckPoseValues } from './duckPose';

/** Nube as drawn in the design (Personaje: Nube). Pose values come from buildDuckPose. */
export function NubeArt({ pose }: { pose: DuckPoseValues }) {
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
                  fill="#F28C28"
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
                  fill="#F28C28"
                  stroke="#4A3424"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <path
              d="M28 104 Q42 112 54 118 Q80 108 104 112 C114 104 108 88 109 72 C110 42 130 26 150 28 C170 30 180 46 179 62 C178 76 172 86 166 94 C160 102 160 110 164 118 q10 4 12 14 q8 6 4 16 q4 8 -2 16 q-2 10 -14 14 q-6 8 -18 8 q-10 6 -24 4 q-12 4 -26 0 q-14 2 -24 -6 q-14 -2 -18 -12 C34 160 28 138 38 126 Q30 114 28 104 Z"
              fill="#FFFFFF"
              stroke="#4A3424"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M150 140 q6 4 6 10 M158 160 q4 4 2 10 M62 160 q-6 4 -6 10 M44 136 q-4 4 -2 10"
              stroke="#E2DCD2"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M132 30 q-2 -12 8 -14 q-2 8 4 10 q2 -10 12 -8 q-6 6 -2 12"
              fill="#FFFFFF"
              stroke="#4A3424"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <g transform={pose.wingTransform}>
              <g className={pose.wingClass}>
                <path
                  d="M142 134 C145 154 137 172 114 178 L102 179 Q96 183 90 179 Q84 182 79 177 Q72 178 69 171 Q63 168 65 161 Q74 138 106 128 Q128 122 142 134 Z"
                  fill="#FFFFFF"
                />
                <g>
                  <path
                    d="M102 179 Q96 183 90 179 Q84 182 79 177 Q72 178 69 171 Q63 168 65 161 Q78 166 90 170 Q98 173 102 179 Z"
                    fill="#F2ECE2"
                  />
                  <path
                    d="M90 178 L85 170 M79 176 L75 168"
                    stroke="#DCD6CC"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M136 152 q-6 7 -12 3 q-6 7 -12 3 q-6 7 -12 3 q-6 7 -12 3"
                    stroke="#E2DCD2"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M136 141 q-6 7 -12 3 q-6 7 -12 3 q-6 7 -12 3 q-6 7 -12 3"
                    stroke="#E2DCD2"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M130 132 q-6 6 -12 2 q-6 6 -12 2"
                    stroke="#ECE6DC"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <ellipse cx="112" cy="160" rx="7" ry="3" fill="#F7D3C7" opacity="0.7" />
                </g>
                <path
                  d="M142 134 C145 154 137 172 114 178 L102 179 Q96 183 90 179 Q84 182 79 177 Q72 178 69 171 Q63 168 65 161 Q74 138 106 128 Q128 122 142 134 Z"
                  fill="none"
                  stroke="#4A3424"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <path
              d="M106 94 Q136 108 168 96 L166 110 Q136 122 108 108 Z"
              fill="#C8664A"
              stroke="#4A3424"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M124 112 L118 126 L126 122 L130 128 L130 114 Z"
              fill="#B4553B"
              stroke="#4A3424"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M128 110 Q114 98 109 110 Q113 122 128 112 Z"
              fill="#C8664A"
              stroke="#4A3424"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M128 110 Q142 98 147 110 Q143 122 128 112 Z"
              fill="#C8664A"
              stroke="#4A3424"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <circle cx="128" cy="111" r="4.5" fill="#A9503A" stroke="#4A3424" strokeWidth="2.5" />
            <circle cx="152" cy="104" r="1.8" fill="#F2B49E" />
            <circle cx="160" cy="101" r="1.8" fill="#F2B49E" />
            <g className={pose.eyeClass}>
              <circle cx="154" cy="56" r="9" fill="#2A1C12" />
              <circle cx="157" cy="52.5" r="3.4" fill="#FFFFFF" />
              <circle cx="151" cy="60" r="1.6" fill="#FFFFFF" />
            </g>
            <path d="M159 48 l4 -6 M163 51 l7 -3" stroke="#2A1C12" strokeWidth="2.6" strokeLinecap="round" />
            <ellipse cx="146" cy="78" rx="9" ry="5.5" fill="#F7A9B4" opacity="0.9" />
            <g transform={pose.beakTransform}>
              <g className={pose.beakClass}>
                <path
                  d="M172 74 Q192 74 198 77 Q194 87 172 84 Z"
                  fill="#DE7418"
                  stroke="#4A3424"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <path
              d="M170 58 Q200 56 201 68 Q194 76 172 76 Z"
              fill="#F28C28"
              stroke="#4A3424"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle cx="186" cy="63" r="1.8" fill="#4A3424" />
          </g>
        </g>
      </g>
    </g>
  );
}
