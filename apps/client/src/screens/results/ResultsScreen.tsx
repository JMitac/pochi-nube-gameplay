import { useEffect } from 'react';
import { audioEngine } from '../../audio/audioInstance';
import { PillButton } from '../../components/ui/buttons';
import { Panel } from '../../components/ui/surfaces';
import { ScreenBackground } from '../../components/ScreenBackground';
import { useScreenMusic } from '../../hooks/useScreenMusic';
import { roomSession } from '../../network/RoomSession';
import { useNavigationStore } from '../../state/navigationStore';
import { useResultsStore } from '../../state/resultsStore';
import { PicnicScene } from './PicnicScene';
import { PlayerResultCard } from './PlayerResultCard';
import { presentResult } from './resultPresentation';
import { StarRating } from './StarRating';

/** 8 · Resultados */
export function ResultsScreen() {
  const navigate = useNavigationStore((state) => state.navigate);
  const result = useResultsStore((state) => state.lastResult);
  const presentation = result ? presentResult(result) : null;
  useScreenMusic(null);

  useEffect(() => {
    if (presentation) audioEngine.playJingle(presentation.jingle);
    // The jingle plays once, when the screen opens.
  }, []);

  const playAgain = () => {
    if (roomSession.isConnected) roomSession.requestRematch();
    else navigate('createRoom');
  };

  const goToMenu = async () => {
    await roomSession.leave();
    navigate('menu');
  };

  if (!result || !presentation) return null;

  return (
    <div className="bg-sky font-body text-ink relative h-[720px] w-[1280px] overflow-hidden">
      <ScreenBackground mapId={result.mapId} tint="ink" />

      <Panel className="panel-rise absolute left-[60px] top-10 flex h-[640px] w-[640px] flex-col items-center gap-3.5 rounded-[40px] px-10 py-[30px]">
        <h1 className="font-display m-0 text-[52px] font-extrabold leading-none">{presentation.title}</h1>
        {presentation.stars !== null && <StarRating stars={presentation.stars} />}
        <div
          className="flex items-baseline gap-2.5"
          style={{ animation: 'total-pop 0.6s cubic-bezier(0.3, 1.5, 0.5, 1) 1.5s both' }}
        >
          <span className="font-display text-[72px] font-extrabold tabular-nums leading-none">{presentation.total}</span>
          <span className="text-[22px] font-extrabold">{presentation.totalCaption}</span>
        </div>
        {presentation.subtitle && <span className="-mt-2 text-[18px] font-bold">{presentation.subtitle}</span>}
        <div className={`grid gap-4 self-stretch ${result.players.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {result.players.map((player) => (
            <PlayerResultCard key={player.sessionId} player={player} isWinner={player.sessionId === result.winnerSessionId} />
          ))}
        </div>
        <div className="mt-auto flex gap-4">
          <PillButton className="shadow-pop-md border-[5px] px-10 py-2 text-[30px]" onClick={playAgain}>
            Revancha
          </PillButton>
          <PillButton tone="white" className="shadow-pop-md border-[5px] px-8 py-2 text-[30px]" onClick={() => void goToMenu()}>
            Menú
          </PillButton>
        </div>
      </Panel>

      <PicnicScene />
    </div>
  );
}
