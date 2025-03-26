
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useMarkdownParser } from '@/hooks/useMarkdownParser';

interface MarkdownPreviewProps {
  markdownText: string;
  className?: string;
  isPreviewMode: boolean;
  onContentChange: (content: string) => void;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ 
  markdownText, 
  className,
  isPreviewMode,
  onContentChange
}) => {
  const { htmlOutput } = useMarkdownParser(markdownText);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!previewRef.current) return;
    
    // Make the preview editable in preview mode
    previewRef.current.contentEditable = isPreviewMode ? 'true' : 'false';
  }, [isPreviewMode]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isPreviewMode && previewRef.current) {
      // Get the HTML content from the editable div
      const htmlContent = previewRef.current.innerHTML;
      
      // We would need to convert HTML back to markdown
      // For simplicity, we're passing the HTML directly
      // In a real app, you might want to use a library for HTML to Markdown conversion
      onContentChange(htmlContent);
    }
  };

  return (
    <div 
      ref={previewRef}
      className={cn(
        'prose dark:prose-invert flex-1 p-6 overflow-auto bg-white/50 dark:bg-black/10 animate-fade-in',
        isPreviewMode ? 'block outline-none focus-ring' : 'hidden md:block border-l border-border/30',
        className
      )}
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: htmlOutput }}
      spellCheck="false"
    />
  );
};

export default MarkdownPreview;
