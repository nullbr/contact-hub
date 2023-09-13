export default function calculatePercent(
  count: number | null,
  total: number | null
): number {
  if (!count || !total) return 0;

  // calculate percentage
  const percent = (count / total) * 100;

  // round to 2 decimal places
  return Math.round(percent * 100) / 100;
}
