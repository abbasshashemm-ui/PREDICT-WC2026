import { useEffect, useState, type ReactNode } from 'react';
import { TournamentProvider, useTournament } from './context/TournamentContext';
import { TournamentLayoutProvider } from './context/TournamentLayoutContext';
import { SupabaseAuthProvider } from './context/SupabaseAuthContext';
import { UserProvider } from './context/UserContext';
import { SimulatorLayout } from './components/SimulatorLayout';
import { PredictionSummaryPage } from './components/PredictionSummaryPage';
import { parseAppSurface } from './context/tournamentLayoutRoute';

function TournamentApp() {
  const { state, isReadOnly } = useTournament();

  return (
    <TournamentLayoutProvider groupMatches={state.groupMatches} isReadOnly={isReadOnly}>
      <SimulatorLayout />
    </TournamentLayoutProvider>
  );
}

function AppRouter() {
  const [surface, setSurface] = useState(() => parseAppSurface());

  useEffect(() => {
    const sync = () => setSurface(parseAppSurface());
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  if (surface === 'share') {
    return <PredictionSummaryPage />;
  }

  return <TournamentApp />;
}

function RootProviders({ children }: { children: ReactNode }) {
  return (
    <SupabaseAuthProvider>
      <UserProvider>
        <TournamentProvider>{children}</TournamentProvider>
      </UserProvider>
    </SupabaseAuthProvider>
  );
}

export default function App() {
  return (
    <RootProviders>
      <AppRouter />
    </RootProviders>
  );
}
