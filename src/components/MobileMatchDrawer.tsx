import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Match, Team } from '../types';
import { teamById } from '../data/teams';
import { getFlagUrl } from '../utils/flags';

const DISMISS_DRAG_PX = 88;
const MAX_SCORE = 99;

interface MobileMatchDrawerProps {
  match: Match | null;
  teams: Team[];
  open: boolean;
  readOnly?: boolean;
  onClose: () => void;
  onScoreChange: (
    home: number | null,
    away: number | null,
    penaltyWinnerId?: string | null,
  ) => void;
}

function formatScore(value: number | null): string {
  return value === null ? '–' : String(value);
}

function appendDigit(current: number | null, digit: number): number {
  const raw = current === null ? '' : String(current);
  if (raw.length >= 2) return current ?? 0;
  const next = raw === '' ? digit : parseInt(`${raw}${digit}`, 10);
  return Math.min(next, MAX_SCORE);
}

function backspaceScore(current: number | null): number | null {
  if (current === null) return null;
  const raw = String(current);
  if (raw.length <= 1) return null;
  return parseInt(raw.slice(0, -1), 10);
}

interface TeamScorePanelProps {
  team?: Team;
  score: number | null;
  active: boolean;
  align: 'left' | 'right';
  onSelect: () => void;
}

function TeamScorePanel({ team, score, active, align, onSelect }: TeamScorePanelProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 transition-all duration-200 active:scale-[0.98] ${
        active
          ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_0_24px_rgba(52,211,153,0.25)]'
          : 'border-slate-700/80 bg-slate-900/60'
      } ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      {team ? (
        <>
          <img
            src={getFlagUrl(team.countryCode, 120)}
            alt=""
            width={72}
            height={54}
            className="h-14 w-20 rounded-lg object-cover shadow-lg ring-2 ring-white/10"
          />
          <span className="max-w-full truncate text-center text-sm font-bold uppercase tracking-wide text-white">
            {team.fullName}
          </span>
          <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {team.shortName}
          </span>
        </>
      ) : (
        <span className="text-sm font-medium text-slate-500">TBD</span>
      )}
      <span
        className={`mt-1 font-mono text-5xl font-black tabular-nums leading-none ${
          active ? 'text-emerald-300' : 'text-white'
        }`}
      >
        {formatScore(score)}
      </span>
    </button>
  );
}

export function MobileMatchDrawer({
  match,
  teams,
  open,
  readOnly = false,
  onClose,
  onScoreChange,
}: MobileMatchDrawerProps) {
  const [activeSide, setActiveSide] = useState<'home' | 'away'>('home');
  const [homeScore, setHomeScore] = useState<number | null>(null);
  const [awayScore, setAwayScore] = useState<number | null>(null);
  const [penaltyWinnerId, setPenaltyWinnerId] = useState<string | null>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const homeTeam = match ? teamById(teams, match.homeTeamId) : undefined;
  const awayTeam = match ? teamById(teams, match.awayTeamId) : undefined;
  const isKnockout = match?.phase === 'knockout';
  const isDraw =
    homeScore !== null && awayScore !== null && homeScore === awayScore;
  const canEdit = !readOnly && Boolean(homeTeam && awayTeam);

  const commit = useCallback(
    (home: number | null, away: number | null, pk?: string | null) => {
      if (!canEdit) return;
      if (isKnockout && home !== null && away !== null && home === away) {
        onScoreChange(home, away, pk ?? penaltyWinnerId);
      } else {
        onScoreChange(home, away);
      }
    },
    [canEdit, isKnockout, onScoreChange, penaltyWinnerId],
  );

  useEffect(() => {
    if (!open || !match) return;
    setHomeScore(match.userHomeScore);
    setAwayScore(match.userAwayScore);
    setPenaltyWinnerId(match.penalties.winnerTeamId);
    setActiveSide('home');
    setDragY(0);
    setIsDragging(false);
  }, [open, match]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleDigit = (digit: number) => {
    if (!canEdit) return;
    if (activeSide === 'home') {
      const next = appendDigit(homeScore, digit);
      setHomeScore(next);
      commit(next, awayScore);
    } else {
      const next = appendDigit(awayScore, digit);
      setAwayScore(next);
      commit(homeScore, next);
    }
  };

  const handleBackspace = () => {
    if (!canEdit) return;
    if (activeSide === 'home') {
      const next = backspaceScore(homeScore);
      setHomeScore(next);
      commit(next, awayScore);
    } else {
      const next = backspaceScore(awayScore);
      setAwayScore(next);
      commit(homeScore, next);
    }
  };

  const handleClearSide = () => {
    if (!canEdit) return;
    if (activeSide === 'home') {
      setHomeScore(null);
      commit(null, awayScore);
    } else {
      setAwayScore(null);
      commit(homeScore, null);
    }
  };

  const handlePenalty = (teamId: string) => {
    if (!canEdit || homeScore === null || awayScore === null) return;
    setPenaltyWinnerId(teamId);
    onScoreChange(homeScore, awayScore, teamId);
  };

  const handleTouchStart = (clientY: number) => {
    dragStartY.current = clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (clientY: number) => {
    if (!isDragging) return;
    const delta = Math.max(0, clientY - dragStartY.current);
    setDragY(delta);
  };

  const handleTouchEnd = () => {
    if (dragY >= DISMISS_DRAG_PX) {
      onClose();
    }
    setDragY(0);
    setIsDragging(false);
  };

  if (!open || !match) return null;

  const sheetStyle = {
    transform: `translateY(${dragY}px)`,
    transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-end md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`Edit scores for match ${match.matchId}`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] transition-opacity"
        aria-label="Close score editor"
        onClick={onClose}
      />

      <div
        ref={sheetRef}
        className={`mobile-drawer-sheet relative max-h-[92dvh] w-full overflow-hidden rounded-t-3xl border border-slate-700/60 bg-gradient-to-b from-slate-900 to-slate-950 shadow-[0_-12px_48px_rgba(0,0,0,0.55)] ${
          isDragging ? '' : 'mobile-drawer-sheet--enter'
        }`}
        style={sheetStyle}
        onTouchMove={(event) => {
          if (!isDragging) return;
          const touch = event.touches[0];
          if (touch) handleTouchMove(touch.clientY);
        }}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex cursor-grab touch-none flex-col items-center px-4 pb-2 pt-3 active:cursor-grabbing"
          onTouchStart={(event) => {
            const touch = event.touches[0];
            if (touch) handleTouchStart(touch.clientY);
          }}
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') return;
            handleTouchStart(event.clientY);
            const onMove = (moveEvent: PointerEvent) => handleTouchMove(moveEvent.clientY);
            const onUp = () => {
              handleTouchEnd();
              window.removeEventListener('pointermove', onMove);
              window.removeEventListener('pointerup', onUp);
            };
            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);
          }}
        >
          <div className="h-1.5 w-12 rounded-full bg-slate-600" aria-hidden />
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Swipe down to close
          </p>
        </div>

        <div className="border-b border-slate-800/80 px-4 pb-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Match {match.matchId}
            </p>
            {match.groupId ? (
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                Group {match.groupId}
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                {match.stage}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex items-stretch gap-3">
            <TeamScorePanel
              team={homeTeam}
              score={homeScore}
              active={activeSide === 'home'}
              align="left"
              onSelect={() => setActiveSide('home')}
            />
            <div className="flex shrink-0 flex-col items-center justify-center">
              <span className="text-2xl font-light text-slate-600">:</span>
            </div>
            <TeamScorePanel
              team={awayTeam}
              score={awayScore}
              active={activeSide === 'away'}
              align="right"
              onSelect={() => setActiveSide('away')}
            />
          </div>

          {isKnockout && isDraw && canEdit ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3">
              <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-widest text-amber-300">
                Penalty shootout winner
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[homeTeam, awayTeam].map((team) =>
                  team ? (
                    <button
                      key={team.id}
                      type="button"
                      onClick={() => handlePenalty(team.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-3 transition active:scale-[0.98] ${
                        penaltyWinnerId === team.id
                          ? 'border-emerald-400 bg-emerald-500/15'
                          : 'border-slate-600 bg-slate-900/50'
                      }`}
                    >
                      <img
                        src={getFlagUrl(team.countryCode, 80)}
                        alt=""
                        className="h-10 w-14 rounded-md object-cover"
                      />
                      <span className="text-xs font-bold text-white">{team.shortName}</span>
                    </button>
                  ) : null,
                )}
              </div>
            </div>
          ) : null}

          {canEdit ? (
            <div className="select-none">
              <div className="mb-2 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Tap to score — {activeSide === 'home' ? homeTeam?.shortName : awayTeam?.shortName}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleDigit(digit)}
                    className="mobile-numpad-key flex h-14 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-800/90 text-2xl font-bold text-white active:bg-emerald-500/20 active:border-emerald-400/50"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleClearSide}
                  className="mobile-numpad-key flex h-14 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-800/60 text-sm font-bold uppercase tracking-wide text-slate-400 active:bg-slate-700"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handleDigit(0)}
                  className="mobile-numpad-key flex h-14 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-800/90 text-2xl font-bold text-white active:bg-emerald-500/20 active:border-emerald-400/50"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleBackspace}
                  className="mobile-numpad-key flex h-14 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-800/60 text-xl font-bold text-slate-300 active:bg-slate-700"
                  aria-label="Backspace"
                >
                  ⌫
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-slate-400">Scores are read-only in this mode.</p>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-200 transition active:bg-slate-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
