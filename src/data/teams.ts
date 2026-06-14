import type { GroupId, Team } from '../types';
import { GROUP_IDS } from '../types';

interface TeamMeta {
  name: string;
  fullName: string;
  countryCode: string;
  flagEmoji: string;
  fifaRanking: number;
}

/** Post-draw FIFA World Cup 2026 group compositions (slot 1–4) */
const TEAM_META: Record<GroupId, [TeamMeta, TeamMeta, TeamMeta, TeamMeta]> = {
  A: [
    { name: 'Mexico', fullName: 'Mexico', countryCode: 'mx', flagEmoji: '🇲🇽', fifaRanking: 13 },
    { name: 'South Korea', fullName: 'South Korea', countryCode: 'kr', flagEmoji: '🇰🇷', fifaRanking: 19 },
    { name: 'Czechia', fullName: 'Czechia', countryCode: 'cz', flagEmoji: '🇨🇿', fifaRanking: 29 },
    { name: 'South Africa', fullName: 'South Africa', countryCode: 'za', flagEmoji: '🇿🇦', fifaRanking: 34 },
  ],
  B: [
    { name: 'Canada', fullName: 'Canada', countryCode: 'ca', flagEmoji: '🇨🇦', fifaRanking: 38 },
    { name: 'Switzerland', fullName: 'Switzerland', countryCode: 'ch', flagEmoji: '🇨🇭', fifaRanking: 16 },
    { name: 'Qatar', fullName: 'Qatar', countryCode: 'qa', flagEmoji: '🇶🇦', fifaRanking: 37 },
    { name: 'Bosnia and Herzegovina', fullName: 'Bosnia and Herzegovina', countryCode: 'ba', flagEmoji: '🇧🇦', fifaRanking: 42 },
  ],
  C: [
    { name: 'Brazil', fullName: 'Brazil', countryCode: 'br', flagEmoji: '🇧🇷', fifaRanking: 5 },
    { name: 'Morocco', fullName: 'Morocco', countryCode: 'ma', flagEmoji: '🇲🇦', fifaRanking: 12 },
    { name: 'Scotland', fullName: 'Scotland', countryCode: 'gb-sct', flagEmoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', fifaRanking: 29 },
    { name: 'Haiti', fullName: 'Haiti', countryCode: 'ht', flagEmoji: '🇭🇹', fifaRanking: 40 },
  ],
  D: [
    { name: 'USA', fullName: 'United States', countryCode: 'us', flagEmoji: '🇺🇸', fifaRanking: 14 },
    { name: 'Paraguay', fullName: 'Paraguay', countryCode: 'py', flagEmoji: '🇵🇾', fifaRanking: 30 },
    { name: 'Australia', fullName: 'Australia', countryCode: 'au', flagEmoji: '🇦🇺', fifaRanking: 22 },
    { name: 'Turkey', fullName: 'Turkey', countryCode: 'tr', flagEmoji: '🇹🇷', fifaRanking: 31 },
  ],
  E: [
    { name: 'Germany', fullName: 'Germany', countryCode: 'de', flagEmoji: '🇩🇪', fifaRanking: 9 },
    { name: 'Curaçao', fullName: 'Curaçao', countryCode: 'cw', flagEmoji: '🇨🇼', fifaRanking: 41 },
    { name: 'Ivory Coast', fullName: 'Ivory Coast', countryCode: 'ci', flagEmoji: '🇨🇮', fifaRanking: 28 },
    { name: 'Ecuador', fullName: 'Ecuador', countryCode: 'ec', flagEmoji: '🇪🇨', fifaRanking: 20 },
  ],
  F: [
    { name: 'Netherlands', fullName: 'Netherlands', countryCode: 'nl', flagEmoji: '🇳🇱', fifaRanking: 7 },
    { name: 'Japan', fullName: 'Japan', countryCode: 'jp', flagEmoji: '🇯🇵', fifaRanking: 15 },
    { name: 'Sweden', fullName: 'Sweden', countryCode: 'se', flagEmoji: '🇸🇪', fifaRanking: 24 },
    { name: 'Tunisia', fullName: 'Tunisia', countryCode: 'tn', flagEmoji: '🇹🇳', fifaRanking: 31 },
  ],
  G: [
    { name: 'Belgium', fullName: 'Belgium', countryCode: 'be', flagEmoji: '🇧🇪', fifaRanking: 8 },
    { name: 'Egypt', fullName: 'Egypt', countryCode: 'eg', flagEmoji: '🇪🇬', fifaRanking: 25 },
    { name: 'Iran', fullName: 'Iran', countryCode: 'ir', flagEmoji: '🇮🇷', fifaRanking: 18 },
    { name: 'New Zealand', fullName: 'New Zealand', countryCode: 'nz', flagEmoji: '🇳🇿', fifaRanking: 39 },
  ],
  H: [
    { name: 'Spain', fullName: 'Spain', countryCode: 'es', flagEmoji: '🇪🇸', fifaRanking: 3 },
    { name: 'Cape Verde', fullName: 'Cape Verde', countryCode: 'cv', flagEmoji: '🇨🇻', fifaRanking: 32 },
    { name: 'Saudi Arabia', fullName: 'Saudi Arabia', countryCode: 'sa', flagEmoji: '🇸🇦', fifaRanking: 37 },
    { name: 'Uruguay', fullName: 'Uruguay', countryCode: 'uy', flagEmoji: '🇺🇾', fifaRanking: 10 },
  ],
  I: [
    { name: 'France', fullName: 'France', countryCode: 'fr', flagEmoji: '🇫🇷', fifaRanking: 2 },
    { name: 'Senegal', fullName: 'Senegal', countryCode: 'sn', flagEmoji: '🇸🇳', fifaRanking: 17 },
    { name: 'Iraq', fullName: 'Iraq', countryCode: 'iq', flagEmoji: '🇮🇶', fifaRanking: 47 },
    { name: 'Norway', fullName: 'Norway', countryCode: 'no', flagEmoji: '🇳🇴', fifaRanking: 23 },
  ],
  J: [
    { name: 'Argentina', fullName: 'Argentina', countryCode: 'ar', flagEmoji: '🇦🇷', fifaRanking: 1 },
    { name: 'Algeria', fullName: 'Algeria', countryCode: 'dz', flagEmoji: '🇩🇿', fifaRanking: 26 },
    { name: 'Austria', fullName: 'Austria', countryCode: 'at', flagEmoji: '🇦🇹', fifaRanking: 21 },
    { name: 'Jordan', fullName: 'Jordan', countryCode: 'jo', flagEmoji: '🇯🇴', fifaRanking: 35 },
  ],
  K: [
    { name: 'Portugal', fullName: 'Portugal', countryCode: 'pt', flagEmoji: '🇵🇹', fifaRanking: 6 },
    { name: 'DR Congo', fullName: 'DR Congo', countryCode: 'cd', flagEmoji: '🇨🇩', fifaRanking: 46 },
    { name: 'Uzbekistan', fullName: 'Uzbekistan', countryCode: 'uz', flagEmoji: '🇺🇿', fifaRanking: 36 },
    { name: 'Colombia', fullName: 'Colombia', countryCode: 'co', flagEmoji: '🇨🇴', fifaRanking: 11 },
  ],
  L: [
    { name: 'England', fullName: 'England', countryCode: 'gb-eng', flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', fifaRanking: 4 },
    { name: 'Croatia', fullName: 'Croatia', countryCode: 'hr', flagEmoji: '🇭🇷', fifaRanking: 27 },
    { name: 'Ghana', fullName: 'Ghana', countryCode: 'gh', flagEmoji: '🇬🇭', fifaRanking: 33 },
    { name: 'Panama', fullName: 'Panama', countryCode: 'pa', flagEmoji: '🇵🇦', fifaRanking: 24 },
  ],
};

function shortName(name: string): string {
  const map: Record<string, string> = {
    'South Korea': 'KOR',
    'South Africa': 'RSA',
    'Bosnia and Herzegovina': 'BIH',
    'Ivory Coast': 'CIV',
    'Cape Verde': 'CPV',
    'Saudi Arabia': 'KSA',
    'New Zealand': 'NZL',
    'DR Congo': 'COD',
    USA: 'USA',
    Czechia: 'CZE',
  };
  return map[name] ?? name.slice(0, 3).toUpperCase();
}

export function createTeams(): Team[] {
  const teams: Team[] = [];

  for (const groupId of GROUP_IDS) {
    TEAM_META[groupId].forEach((meta, index) => {
      const id = `${groupId}${index + 1}`;
      teams.push({
        id,
        name: meta.name,
        fullName: meta.fullName,
        shortName: shortName(meta.name),
        countryCode: meta.countryCode,
        group: groupId,
        fifaRanking: meta.fifaRanking,
        flagEmoji: meta.flagEmoji,
      });
    });
  }

  return teams;
}

export function teamById(teams: Team[], id: string | null): Team | undefined {
  if (!id) return undefined;
  return teams.find((t) => t.id === id);
}

export function teamsInGroup(teams: Team[], groupId: GroupId): Team[] {
  return teams.filter((t) => t.group === groupId);
}

export function isGroupSlot(label: string): boolean {
  return /^[A-L][1-4]$/.test(label);
}

export function slotToTeamId(slot: string): string | null {
  return isGroupSlot(slot) ? slot : null;
}
