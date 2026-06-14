import { TournamentProvider } from './context/TournamentContext';
import { SimulatorLayout } from './components/SimulatorLayout';

export default function App() {
  return (
    <TournamentProvider>
      <SimulatorLayout />
    </TournamentProvider>
  );
}
