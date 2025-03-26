
import { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Custom renderer for code highlighting
const renderer = {
  code(code: string, language: string) {
    // Use the specified language or fallback to plaintext
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return `<pre><code class="hljs language-${validLanguage}">${
      hljs.highlight(code, { language: validLanguage }).value
    }</code></pre>`;
  }
};

// Apply our custom renderer
marked.use({ renderer });

export function useMarkdownParser(markdownText: string) {
  const [htmlOutput, setHtmlOutput] = useState('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Check if marked.parse returns a Promise or string and handle accordingly
      const result = marked.parse(markdownText);
      if (result instanceof Promise) {
        // Handle as Promise
        result
          .then(parsedHtml => {
            setHtmlOutput(parsedHtml);
            setError(null);
          })
          .catch(error => {
            console.error('Error parsing markdown:', error);
            setError(error as Error);
          });
      } else {
        // Handle as string
        setHtmlOutput(result);
        setError(null);
      }
    } catch (error) {
      console.error('Error parsing markdown:', error);
      setError(error as Error);
    }
  }, [markdownText]);

  return { htmlOutput, error };
}
