const ENTITIES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

export function escapeHtml(value: string): string {
  return String(value).replace(/[&<>"]/g, c => ENTITIES[c]);
}
