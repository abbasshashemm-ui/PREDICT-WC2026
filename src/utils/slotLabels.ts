/** Human-readable labels for knockout bracket slot placeholders. */
export function formatSlotLabel(label: string): string {
  if (label.startsWith('3rd-')) {
    const groups = label.replace('3rd-', '').split('').join(' / ');
    return `3rd Place (${groups})`;
  }

  const winner = label.match(/^W(\d+)$/);
  if (winner) return `Winner Match ${winner[1]}`;

  const loser = label.match(/^L(\d+)$/);
  if (loser) return `Loser Match ${loser[1]}`;

  const groupPos = label.match(/^([12])([A-L])$/);
  if (groupPos) {
    const role = groupPos[1] === '1' ? 'Winner' : 'Runner-up';
    return `${role} Group ${groupPos[2]}`;
  }

  return label;
}
