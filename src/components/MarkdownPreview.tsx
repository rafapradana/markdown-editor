
import React from 'react';
import { cn } from '@/lib/utils';
import { useMarkdownParser } from '@/hooks/useMarkdownParser';

interface MarkdownPreviewProps {
  markdownText: string;
  className?: string;
  isPreviewMode: boolean;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ 
  markdownText, 
  className,
  isPreviewMode 
}) => {
  const { htmlOutput } = useMarkdownParser(markdownText);

  return (
    <div 
      className={cn(
        'prose dark:prose-invert flex-1 p-6 overflow-auto bg-white/50 dark:bg-black/10 animate-fade-in',
        isPreviewMode ? 'block' : 'hidden md:block border-l border-border/30',
        className
      )}
      dangerouslySetInnerHTML={{ __html: htmlOutput }}
    />
  );
};

export default MarkdownPreview;
