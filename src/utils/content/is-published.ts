export function isPublished<T extends { data: { draft: boolean } }>(
  entry: T,
): boolean {
  return !entry.data.draft;
}
