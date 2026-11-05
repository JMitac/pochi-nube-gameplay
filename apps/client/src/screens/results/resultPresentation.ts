import { calculateStars } from '@pochi/shared';
import type { JingleId } from '../../audio/jingles';
import type { MatchResult } from '../../state/resultsStore';

export interface ResultPresentation {
  title: string;
  /** null in versus, where there are no stars. */
  stars: 0 | 1 | 2 | 3 | null;
  total: number;
  totalCaption: string;
  subtitle: string | null;
  jingle: JingleId;
}

function myScore(result: MatchResult): number {
  return result.players.find((player) => player.sessionId === result.mySessionId)?.score ?? 0;
}

function presentCoop(result: MatchResult): ResultPresentation {
  const stars = calculateStars(result.teamScore, 'coop');
  return {
    title: stars === 3 ? '¡Pícnic completo!' : stars > 0 ? '¡Buen pícnic!' : '¡Casi!',
    stars,
    total: result.teamScore,
    totalCaption: 'puntos en la canasta',
    subtitle: null,
    jingle: stars === 3 ? 'victory' : 'almost',
  };
}

function presentSolo(result: MatchResult): ResultPresentation {
  const score = myScore(result);
  const stars = calculateStars(score, 'solo');
  return {
    title: result.isNewRecord ? '¡Nuevo récord!' : stars === 3 ? '¡Pícnic completo!' : '¡Casi!',
    stars,
    total: score,
    totalCaption: 'puntos en tu canasta',
    subtitle: result.previousRecord > 0 ? `Récord anterior: ${result.previousRecord}` : null,
    jingle: result.isNewRecord || stars === 3 ? 'victory' : 'almost',
  };
}

function presentVersus(result: MatchResult): ResultPresentation {
  const isTie = result.winnerSessionId === '';
  const iWon = result.winnerSessionId === result.mySessionId;
  return {
    title: isTie ? '¡Empate!' : iWon ? '¡Ganaste!' : 'Uy, perdiste',
    stars: null,
    total: myScore(result),
    totalCaption: 'puntos en tu canasta',
    subtitle: null,
    jingle: isTie ? 'almost' : iWon ? 'victory' : 'defeat',
  };
}

/** Title, stars and jingle of the results screen for each game mode. */
export function presentResult(result: MatchResult): ResultPresentation {
  if (result.mode === 'versus') return presentVersus(result);
  if (result.mode === 'solo') return presentSolo(result);
  return presentCoop(result);
}
