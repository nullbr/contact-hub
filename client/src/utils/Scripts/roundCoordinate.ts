export default function roundCoordinate(
  coordinate: number | undefined
): number {
  if (!coordinate) return 0;

  return Math.round(coordinate * 1000000) / 1000000;
}
