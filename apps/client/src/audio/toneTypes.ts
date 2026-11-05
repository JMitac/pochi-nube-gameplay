/** Tone.js is loaded on demand (after the first tap), so modules receive it as a parameter. */
export type ToneLibrary = typeof import('tone');

export type ToneNode = { dispose(): unknown };
export type ToneInput = import('tone').InputNode;
