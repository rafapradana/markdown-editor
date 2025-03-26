
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface MarkdownTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isPreviewMode: boolean;
  className?: string;
}

const MarkdownTextarea = forwardRef<HTMLTextAreaElement, MarkdownTextareaProps>(
  ({ value, onChange, isPreviewMode, className }, ref) => {
    if (isPreviewMode) {
      return null;
    }

    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        className={cn(
          "flex-1 p-6 outline-none resize-none bg-editor-background text-editor-foreground font-mono text-sm transition-all ease-in-out duration-200 focus-ring",
          className
        )}
        placeholder="Type markdown here..."
        spellCheck="false"
      />
    );
  }
);

MarkdownTextarea.displayName = 'MarkdownTextarea';

export default MarkdownTextarea;
