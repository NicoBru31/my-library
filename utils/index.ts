export const queryAdapter = (data: Record<string, string>) =>
  Object.entries(data).reduce(
    (final, [key, val]) => `${final}${key}=${val}&`,
    '?',
  );
