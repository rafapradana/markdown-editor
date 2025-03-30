import { useEffect, useState } from 'react';

interface AutoFormattingProps {
  isActive: boolean;
  markdownText: string;
  onFormat: (formattedText: string) => void;
}

export function AutoFormatting({ isActive, markdownText, onFormat }: AutoFormattingProps) {
  const [lastFormattedContent, setLastFormattedContent] = useState('');

  useEffect(() => {
    if (!isActive || !markdownText || markdownText === lastFormattedContent) return;

    // Throttle formatting to avoid formatting on every keystroke
    const timeout = setTimeout(() => {
      const formattedText = formatMarkdown(markdownText);
      
      // Avoid unnecessary updates
      if (formattedText !== markdownText) {
        onFormat(formattedText);
        setLastFormattedContent(formattedText);
      }
    }, 1000); // Delay formatting for 1 second after typing stops

    return () => clearTimeout(timeout);
  }, [isActive, markdownText, onFormat, lastFormattedContent]);

  // This component doesn't render anything
  return null;
}

function formatMarkdown(text: string): string {
  // Split the text into lines
  const lines = text.split('\n');
  const formattedLines = [];
  
  let inCodeBlock = false;
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Don't format inside code blocks
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      formattedLines.push(line);
      continue;
    }
    
    if (inCodeBlock) {
      formattedLines.push(line);
      continue;
    }
    
    // Fix heading spacing
    if (/^#+\s*.+/.test(line)) {
      line = line.replace(/^(#+)(\s*)(.+)/, (_, hashes, spaces, content) => {
        return `${hashes} ${content.trim()}`;
      });
    }

    // Fix list spacing
    if (/^[\s]*[-*+]\s.+/.test(line)) {
      line = line.replace(/^(\s*)([-*+])(\s*)(.+)/, (_, indent, bullet, spaces, content) => {
        return `${indent}${bullet} ${content.trim()}`;
      });
      inList = true;
    } else if (/^[\s]*\d+\.\s.+/.test(line)) {
      line = line.replace(/^(\s*)(\d+\.)(\s*)(.+)/, (_, indent, number, spaces, content) => {
        return `${indent}${number} ${content.trim()}`;
      });
      inList = true;
    } else if (line.trim() === '') {
      inList = false;
    }

    // Fix horizontal rule consistency
    if (/^[\s]*[-*_]{3,}[\s]*$/.test(line)) {
      line = '---';
    }

    // Fix blockquote spacing
    if (/^[\s]*>+\s*.+/.test(line)) {
      line = line.replace(/^(\s*)(>+)(\s*)(.+)/, (_, indent, quotes, spaces, content) => {
        return `${indent}${quotes} ${content.trim()}`;
      });
    }

    // Fix link/image format
    line = line.replace(/\[([^\]]+)\]\s*\(([^)]+)\)/g, '[$1]($2)');
    line = line.replace(/!\[([^\]]+)\]\s*\(([^)]+)\)/g, '![$1]($2)');

    // Fix emphasis/strong spacing
    line = line.replace(/\*\*\s*([^*]+)\s*\*\*/g, '**$1**');
    line = line.replace(/\*\s*([^*]+)\s*\*/g, '*$1*');
    line = line.replace(/__\s*([^_]+)\s*__/g, '__$1__');
    line = line.replace(/_\s*([^_]+)\s*_/g, '_$1_');

    // Fix inline code spacing
    line = line.replace(/`\s*([^`]+)\s*`/g, '`$1`');

    formattedLines.push(line);
  }
  
  return formattedLines.join('\n');
}

export default AutoFormatting; 