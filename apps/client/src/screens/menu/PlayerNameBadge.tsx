import { useState, type FormEvent } from 'react';
import { PLAYER_NAME_MAX_LENGTH } from '@pochi/shared';
import { UserIcon } from '../../art/icons/icons';
import { useSettingsStore } from '../../state/settingsStore';

/** "[TU NOMBRE]" pill. Tapping it lets the player type a new name. */
export function PlayerNameBadge() {
  const playerName = useSettingsStore((state) => state.playerName);
  const setPlayerName = useSettingsStore((state) => state.setPlayerName);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(playerName);

  const save = (event?: FormEvent) => {
    event?.preventDefault();
    setPlayerName(draft);
    setIsEditing(false);
  };

  const avatar = (
    <div className="border-ink bg-sand flex size-10 items-center justify-center rounded-full border-[3px]">
      <UserIcon size={22} />
    </div>
  );

  if (isEditing) {
    return (
      <form
        onSubmit={save}
        className="border-ink bg-cream shadow-pop flex items-center gap-2.5 rounded-full border-4 py-2 pl-2.5 pr-5"
      >
        {avatar}
        <label htmlFor="player-name" className="sr-only">
          Tu nombre
        </label>
        <input
          id="player-name"
          autoFocus
          value={draft}
          maxLength={PLAYER_NAME_MAX_LENGTH}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => save()}
          className="text-ink w-[150px] bg-transparent text-[20px] font-extrabold outline-none"
        />
      </form>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Tu nombre: ${playerName}. Toca para cambiarlo`}
      onClick={() => {
        setDraft(playerName);
        setIsEditing(true);
      }}
      className="press-pop border-ink bg-cream text-ink shadow-pop flex items-center gap-2.5 rounded-full border-4 py-2 pl-2.5 pr-5 text-[20px] font-extrabold"
    >
      {avatar}
      {playerName}
    </button>
  );
}
