export function ConvertNumber(value: number) {
  const converter = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  });

  return converter.format(value);
}
