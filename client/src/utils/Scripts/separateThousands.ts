export default function separateThousands(
  number: number | undefined | null
): string | null {
  if (!number && number != 0) return null;

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
