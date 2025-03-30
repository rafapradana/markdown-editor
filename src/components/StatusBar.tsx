import React, { useMemo } from 'react';
import { Clock, Type, Hash } from 'lucide-react';

interface StatusBarProps {
  markdownText: string;
}

export function StatusBar({ markdownText }: StatusBarProps) {
  const stats = useMemo(() => {
    const text = markdownText.trim();
    const characterCount = text.length;
    const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;
    
    // Average reading speed: 200 words per minute
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    
    return { characterCount, wordCount, readingTimeMinutes };
  }, [markdownText]);

  return (
    <div className="flex justify-between items-center py-1.5 px-3 text-xs text-muted-foreground border-t border-border/40 bg-editor-background">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Type size={14} className="opacity-70" />
          <span>{stats.wordCount} words</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Hash size={14} className="opacity-70" />
          <span>{stats.characterCount} characters</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5">
        <Clock size={14} className="opacity-70" />
        <span>~{stats.readingTimeMinutes} min read</span>
      </div>
    </div>
  );
}

export default StatusBar; 