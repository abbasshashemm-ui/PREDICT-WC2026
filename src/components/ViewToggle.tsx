import type { AppView } from '../types';

interface ViewToggleProps {
  view: AppView;
  onChange: (view: AppView) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-xl border border-slate-700 bg-slate-900 p-1">
      <button
        type="button"
        onClick={() => onChange('groups')}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          view === 'groups'
            ? 'bg-emerald-500 text-slate-950'
            : 'text-slate-300 hover:text-white'
        }`}
      >
        Group Stage
      </button>
      <button
        type="button"
        onClick={() => onChange('knockout')}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          view === 'knockout'
            ? 'bg-emerald-500 text-slate-950'
            : 'text-slate-300 hover:text-white'
        }`}
      >
        Knockout Bracket
      </button>
    </div>
  );
}
