import { useState, type FormEvent } from 'react';
import { normalizeRoomCode } from '@pochi/shared';
import { DuckFigure } from '../../art/ducks/DuckFigure';
import { PillButton } from '../../components/ui/buttons';
import { Panel } from '../../components/ui/surfaces';
import { findRoomIdByCode, RoomNotFoundError } from '../../network/roomDirectoryApi';

interface JoinByCodePanelProps {
  isBusy: boolean;
  onJoin(roomId: string): Promise<void>;
}

/** Left card: "Entrar con código". */
export function JoinByCodePanel({ isBusy, onJoin }: JoinByCodePanelProps) {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    if (code.trim().length === 0) {
      setErrorMessage('Escribe el código de la sala.');
      return;
    }
    try {
      await onJoin(await findRoomIdByCode(normalizeRoomCode(code)));
    } catch (error) {
      setErrorMessage(error instanceof RoomNotFoundError ? error.message : 'No pudimos entrar. Inténtalo otra vez.');
    }
  };

  return (
    <Panel className="flex w-[460px] flex-none flex-col gap-[18px] rounded-[36px] p-[30px]">
      <h2 className="font-display m-0 text-[34px] font-extrabold leading-[1.1]">Entrar con código</h2>
      <p className="m-0 text-[18px] font-bold leading-[1.4]">
        Pide el código a quien creó la sala privada. Lo ve en la parte de arriba de su pantalla.
      </p>
      <form onSubmit={submit} className="flex flex-col gap-[18px]">
        <label htmlFor="room-code" className="text-[17px] font-extrabold">
          Código de sala
        </label>
        <input
          id="room-code"
          type="text"
          maxLength={8}
          autoComplete="off"
          placeholder="CUAC-7K2"
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          aria-describedby={errorMessage ? 'room-code-error' : undefined}
          className="focus-bounce border-ink font-display text-ink outline-honey box-border w-full rounded-[20px] border-4 bg-white px-[18px] py-3.5 text-center text-[44px] font-extrabold uppercase tracking-[6px]"
        />
        {errorMessage && (
          <span id="room-code-error" role="alert" className="text-terracotta -my-2 text-center text-[16px] font-extrabold">
            {errorMessage}
          </span>
        )}
        <PillButton type="submit" disabled={isBusy} className="shadow-pop-md border-[5px] py-2.5 text-[32px]">
          {isBusy ? 'Entrando…' : 'Entrar'}
        </PillButton>
      </form>
      <div className="-mb-[30px] flex h-[150px] items-end justify-center overflow-hidden">
        <DuckFigure duckId="pochi" size={150} />
      </div>
    </Panel>
  );
}
