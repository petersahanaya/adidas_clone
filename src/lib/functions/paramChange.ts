export function ParamChange({
  searchParams,
  keyAdded,
  value,
}: {
  searchParams: string;
  keyAdded: string;
  value: string;
}) {
  const parsedParams = new URLSearchParams(searchParams);

  if (parsedParams.has(keyAdded)) {
    parsedParams.set(keyAdded, value);

    return parsedParams.toString();
  }

  parsedParams.append(keyAdded, value);

  return parsedParams.toString();
}

export function HasKeyParam({
  key,
  searchParams,
}: {
  key: string;
  searchParams: string;
}): string {
  const parsedParams = new URLSearchParams(searchParams);

  if (parsedParams.has(key)) {
    return parsedParams.get(key) as string;
  }

  return "";
}
