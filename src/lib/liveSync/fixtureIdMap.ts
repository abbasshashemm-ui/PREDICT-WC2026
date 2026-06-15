import { INITIAL_MATCH_DEFINITIONS } from '../../data/matchesData';
import type { FixtureIdMapping } from '../../types/liveSync';

/**
 * Registry mapping external provider fixture/event IDs to internal match IDs (1–104).
 * Populate `apiFootballFixtureId` / `espnEventId` as the provider publishes WC 2026 IDs.
 */
export const FIXTURE_ID_REGISTRY: FixtureIdMapping[] = INITIAL_MATCH_DEFINITIONS.map(
  (def) => ({
    matchId: def.matchId,
    lockTime: def.kickoffTime,
    apiFootballFixtureId: null,
    espnEventId: null,
  }),
);

const byMatchId = new Map(FIXTURE_ID_REGISTRY.map((row) => [row.matchId, row]));
const byApiFootballId = new Map(
  FIXTURE_ID_REGISTRY.filter((row) => row.apiFootballFixtureId != null).map((row) => [
    row.apiFootballFixtureId!,
    row,
  ]),
);
const byEspnId = new Map(
  FIXTURE_ID_REGISTRY.filter((row) => row.espnEventId != null).map((row) => [
    row.espnEventId!,
    row,
  ]),
);

export function getFixtureMapping(matchId: number): FixtureIdMapping | undefined {
  return byMatchId.get(matchId);
}

export function resolveMatchIdFromApiFootballFixture(fixtureId: number): number | null {
  return byApiFootballId.get(fixtureId)?.matchId ?? null;
}

export function resolveMatchIdFromEspnEvent(eventId: string): number | null {
  return byEspnId.get(eventId)?.matchId ?? null;
}

/** Merge provider IDs discovered at runtime into the in-memory registry. */
export function registerApiFootballFixture(fixtureId: number, matchId: number): void {
  const row = byMatchId.get(matchId);
  if (!row) return;
  row.apiFootballFixtureId = fixtureId;
  byApiFootballId.set(fixtureId, row);
}

export function registerEspnEvent(eventId: string, matchId: number): void {
  const row = byMatchId.get(matchId);
  if (!row) return;
  row.espnEventId = eventId;
  byEspnId.set(eventId, row);
}

export function getLockTimeForMatch(matchId: number): string | null {
  return byMatchId.get(matchId)?.lockTime ?? null;
}

export function listFixtureMappings(): readonly FixtureIdMapping[] {
  return FIXTURE_ID_REGISTRY;
}
