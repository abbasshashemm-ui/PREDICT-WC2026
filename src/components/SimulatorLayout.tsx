import { useTournament } from '../context/TournamentContext';
import { BracketsPage } from './BracketsPage';
import { GroupsPage } from './GroupsPage';
import { Navbar } from './Navbar';

export function SimulatorLayout() {
  const { state, view, setView } = useTournament();
  const groupStageComplete = state.snapshot.groupStageComplete;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar view={view} onViewChange={setView} />

      <main
        className={`mx-auto px-4 pt-6 ${view === 'groups' ? 'max-w-7xl' : 'max-w-[100rem]'}`}
      >
        {view === 'groups' && groupStageComplete ? (
          <div className="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-100">
            Group stage complete — switch to Knockout Bracket to continue.
          </div>
        ) : null}
        {view === 'groups' ? <GroupsPage /> : <BracketsPage />}
      </main>
    </div>
  );
}
