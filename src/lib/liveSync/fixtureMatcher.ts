import { INITIAL_MATCH_DEFINITIONS } from '../../data/matchesData';
import { createTeams, slotToTeamId } from '../../data/teams';
import type { Team } from '../../types';
import { registerApiFootballFixture, registerEspnEvent } from './fixtureIdMap';

const KICKOFF_TOLERANCE_MS = 4 * 60 * 60 * 1000;

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]/g, '');
}

const TEAM_ALIASES: Record<string, string[]> = {
  usa: ['unitedstates', 'us', 'unitedstatesmen'],
  paraguay: ['par'],
  australia: ['aus'],
  turkey: ['tur', 'turkiye', 'türkiye'],
  mexico: ['mex'],
  brazil: ['bra'],
  england: ['eng'],
  scotland: ['sco', 'scotlandmen'],
  'southkorea': ['korea', 'korearepublic', 'southkorea'],
  'southafrica': ['rsa'],
  'ivorycoast': ['cotedivoire', 'cotedivoire'],
  'drcongo': ['congo', 'cod'],
  'bosniaandherzegovina': ['bosnia', 'bih'],
  'newzealand': ['nzl'],
  'saudiarabia': ['ksa'],
  'capeverde': ['cpv'],
  'curacao': ['cuw'],
};

function findTeamByName(name: string, teams: Team[]): Team | undefined {
  const norm = normalizeName(name);
  if (!norm) return undefined;

  const direct = teams.find(
    (team) =>
      normalizeName(team.name) === norm ||
      normalizeName(team.fullName) === norm ||
      normalizeName(team.shortName) === norm,
  );
  if (direct) return direct;

  for (const team of teams) {
    const aliases = TEAM_ALIASES[normalizeName(team.name)] ?? [];
    if (aliases.includes(norm)) return team;
  }

  return teams.find((team) => {
    const teamNorm = normalizeName(team.name);
    return teamNorm.includes(norm) || norm.includes(teamNorm);
  });
}

function teamsPairMatchesDefinition(
  homeTeamId: string,
  awayTeamId: string,
  homeSlot: string,
  awaySlot: string,
): boolean {
  const defHome = slotToTeamId(homeSlot);
  const defAway = slotToTeamId(awaySlot);
  if (!defHome || !defAway) return false;
  return (
    (defHome === homeTeamId && defAway === awayTeamId) ||
    (defHome === awayTeamId && defAway === homeTeamId)
  );
}

export function resolveMatchIdByTeamsAndKickoff(
  homeName: string,
  awayName: string,
  kickoffIso: string,
): number | null {
  const teams = createTeams();
  const homeTeam = findTeamByName(homeName, teams);
  const awayTeam = findTeamByName(awayName, teams);
  if (!homeTeam || !awayTeam) return null;

  const kickoffMs = Date.parse(kickoffIso);
  if (Number.isNaN(kickoffMs)) return null;

  const candidates = INITIAL_MATCH_DEFINITIONS.filter((def) => {
    const delta = Math.abs(Date.parse(def.kickoffTime) - kickoffMs);
    return delta <= KICKOFF_TOLERANCE_MS;
  });

  for (const def of candidates) {
    if (def.stage !== 'Group') continue;
    if (teamsPairMatchesDefinition(homeTeam.id, awayTeam.id, def.homeTeam, def.awayTeam)) {
      return def.matchId;
    }
  }

  const knockoutCandidates = candidates.filter((def) => def.stage !== 'Group');
  if (knockoutCandidates.length === 1) return knockoutCandidates[0].matchId;

  return null;
}

export function resolveApiFootballFixtureId(
  fixture: {
    fixture: { id: number; date: string };
    teams: { home: { name?: string }; away: { name?: string } };
  },
): number | null {
  const homeName = fixture.teams.home.name ?? '';
  const awayName = fixture.teams.away.name ?? '';
  const matchId = resolveMatchIdByTeamsAndKickoff(homeName, awayName, fixture.fixture.date);
  if (matchId) registerApiFootballFixture(fixture.fixture.id, matchId);
  return matchId;
}

export function resolveEspnEventId(event: {
  id: string;
  date?: string;
  competitions?: Array<{
    date?: string;
    competitors?: Array<{ homeAway?: string; team?: { displayName?: string } }>;
  }>;
}): number | null {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors ?? [];
  const home = competitors.find((c) => c.homeAway === 'home')?.team?.displayName ?? '';
  const away = competitors.find((c) => c.homeAway === 'away')?.team?.displayName ?? '';
  const kickoff = competition?.date ?? event.date ?? '';
  const matchId = resolveMatchIdByTeamsAndKickoff(home, away, kickoff);
  if (matchId) registerEspnEvent(event.id, matchId);
  return matchId;
}
