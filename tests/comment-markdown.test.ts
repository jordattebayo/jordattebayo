import { escapeHtml, formatInline, renderSafeMarkdown } from '../src/lib/server/comment-markdown';

describe('escapeHtml', () => {
  test('escapes all HTML-sensitive characters', () => {
    expect(escapeHtml('&<>"\''))
      .toBe('&amp;&lt;&gt;&quot;&#39;');
  });

  test('passes clean strings through unchanged', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });

  test('escapes characters inside a sentence', () => {
    expect(escapeHtml('a < b & c > d'))
      .toBe('a &lt; b &amp; c &gt; d');
  });
});

describe('formatInline', () => {
  test('renders inline code', () => {
    expect(formatInline('use `foo()` here'))
      .toBe('use <code>foo()</code> here');
  });

  test('renders bold', () => {
    expect(formatInline('this is **bold** text'))
      .toBe('this is <strong>bold</strong> text');
  });

  test('renders italic', () => {
    expect(formatInline('this is *italic* text'))
      .toBe('this is <em>italic</em> text');
  });

  test('renders https links', () => {
    expect(formatInline('[click](https://example.com)'))
      .toBe('<a href="https://example.com" rel="nofollow noopener noreferrer" target="_blank">click</a>');
  });

  test('renders http links', () => {
    expect(formatInline('[site](http://example.com)'))
      .toBe('<a href="http://example.com" rel="nofollow noopener noreferrer" target="_blank">site</a>');
  });

  test('does not render javascript: links', () => {
    const input = '[xss](javascript:alert(1))';
    expect(formatInline(input)).toBe(input);
  });

  test('does not render ftp links', () => {
    const input = '[file](ftp://example.com/file)';
    expect(formatInline(input)).toBe(input);
  });

  test('handles multiple inline styles', () => {
    expect(formatInline('`code` and **bold** and *italic*'))
      .toBe('<code>code</code> and <strong>bold</strong> and <em>italic</em>');
  });
});

describe('renderSafeMarkdown', () => {
  test('wraps single line in <p>', () => {
    expect(renderSafeMarkdown('hello')).toBe('<p>hello</p>');
  });

  test('splits paragraphs on double newlines', () => {
    expect(renderSafeMarkdown('one\n\ntwo'))
      .toBe('<p>one</p><p>two</p>');
  });

  test('joins lines within a paragraph with <br />', () => {
    expect(renderSafeMarkdown('line1\nline2'))
      .toBe('<p>line1<br />line2</p>');
  });

  test('normalizes \\r\\n to \\n', () => {
    expect(renderSafeMarkdown('a\r\n\r\nb'))
      .toBe('<p>a</p><p>b</p>');
  });

  test('returns empty string for whitespace-only input', () => {
    expect(renderSafeMarkdown('   \n  ')).toBe('');
  });

  test('escapes HTML before applying formatting', () => {
    expect(renderSafeMarkdown('<script>alert(1)</script>'))
      .toBe('<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>');
  });

  test('applies inline formatting after escaping', () => {
    expect(renderSafeMarkdown('**bold** and `code`'))
      .toBe('<p><strong>bold</strong> and <code>code</code></p>');
  });
});
