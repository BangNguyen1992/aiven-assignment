export default function sorting(array: any[], isAscend: boolean, key: string) {
  return isAscend
    ? array.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) =>
          (a[key] as number) - (b[key] as number)
      )
    : array.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) =>
          (b[key] as number) - (a[key] as number)
      );
}
