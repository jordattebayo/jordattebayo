function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatInline(line: string): string {
  let formatted = line;

  // Inline code first so later formatting does not alter code segments.
  formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Only allow explicit http(s) links.
  formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" rel="nofollow noopener noreferrer" target="_blank">$1</a>');

  return formatted;
}

export function renderSafeMarkdown(markdown: string): string {
  const normalized = markdown.replace(/\r\n/g, '\n').trim();
  const escaped = escapeHtml(normalized);

  const blocks = escaped
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const withBreaks = block
        .split('\n')
        .map((line) => formatInline(line))
        .join('<br />');
      return `<p>${withBreaks}</p>`;
    });

  return blocks.join('');
}
