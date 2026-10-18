export function formatNaira(amount: number | undefined): string {
  return `N${(amount ?? 0).toLocaleString("en-NG")}`;
}
