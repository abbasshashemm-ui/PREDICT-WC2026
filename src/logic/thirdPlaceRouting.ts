import {
  getAnnexCAllocationMapping,
  resolveAnnexCScenarioKey,
} from './tournamentEngine';
import type {
  Group,
  GroupId,
  RoundOf32WinnerSlot,
  ThirdPlaceMapping,
  ThirdPlaceSource,
  ThirdPlaceStanding,
} from '../types';
import { getThirdPlaceCombinationKey } from './tiebreakers';

export { getThirdPlaceCombinationKey };

export function resolveAnnexCKey(qualifiedGroups: GroupId[]): string | null {
  return resolveAnnexCScenarioKey(qualifiedGroups);
}

export function getThirdPlaceMapping(key: string | null): ThirdPlaceMapping | null {
  return getAnnexCAllocationMapping(key);
}

export function getThirdPlacedTeamFromGroup(
  qualifiedThirds: ThirdPlaceStanding[],
  source: ThirdPlaceSource,
): string | null {
  const group = source.replace('3', '') as GroupId;
  const entry = qualifiedThirds.find((t) => t.qualified && t.team.group === group);
  return entry?.team.id ?? null;
}

export function resolveThirdPlaceTeamForSlot(
  slot: RoundOf32WinnerSlot,
  qualifiedThirds: ThirdPlaceStanding[],
  mapping: ThirdPlaceMapping,
): string | null {
  const source = mapping[slot];
  if (!source) return null;
  return getThirdPlacedTeamFromGroup(qualifiedThirds, source);
}

export function getTeamIdByGroupPosition(
  groups: Group[],
  label: string,
): string | null {
  const match = label.match(/^([12])([A-L])$/);
  if (!match) return null;

  const position = Number(match[1]);
  const groupId = match[2] as GroupId;
  const group = groups.find((g) => g.id === groupId);
  const standing = group?.standings.find((s) => s.position === position);
  return standing?.team.id ?? null;
}

export function resolveThirdPlaceLabel(
  label: string,
  qualifiedThirds: ThirdPlaceStanding[],
  mapping: ThirdPlaceMapping | null,
  slotByLabel: Record<string, string>,
): string | null {
  if (!mapping) return null;
  const slot = slotByLabel[label] as RoundOf32WinnerSlot | undefined;
  if (!slot) return null;
  return resolveThirdPlaceTeamForSlot(slot, qualifiedThirds, mapping);
}
