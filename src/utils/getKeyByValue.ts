export default function getKeyByValue(object: Record<string, string>, value: string): string {
  return Object.keys(object).find((key) => object[key] === value) as string;
}
