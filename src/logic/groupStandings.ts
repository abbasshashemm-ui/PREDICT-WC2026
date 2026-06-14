/**
 * @deprecated Import from `tournamentEngine` instead. Thin re-export layer for compatibility.
 */
export {
  calculateGroupStandings as computeGroupStandings,
  calculateAllGroupStandings as computeAllGroups,
  buildThirdPlaceWildcardTable as buildThirdPlaceTable,
  getQualifiedThirdPlaceGroups as getQualifiedThirdGroups,
  isGroupStageComplete,
} from './tournamentEngine';
