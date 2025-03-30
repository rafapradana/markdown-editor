import React, { useMemo } from 'react';
import { List, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  markdownText: string;
  className?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ markdownText, className }: TableOfContentsProps) {
  const tocItems = useMemo(() => {
    const items: TocItem[] = [];
    const lines = markdownText.split('\n');
    
    // Regular expression to match markdown headings
    const headingRegex = /^(#{1,6})\s+(.+)$/;
    
    lines.forEach((line) => {
      const match = line.match(headingRegex);
      if (match) {
        const [, hashes, text] = match;
        const level = hashes.length;
        // Generate an ID based on the heading text
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s]+/g, '-');
        
        items.push({ id, text, level });
      }
    });
    
    return items;
  }, [markdownText]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className={cn("p-4 rounded-md bg-accent/50", className)}>
      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
        <List size={16} />
        <span>Table of Contents</span>
      </div>
      
      <nav className="space-y-1">
        {tocItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.id}`}
            className={cn(
              "block text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors",
              item.level === 1 && "font-medium text-foreground",
              item.level > 1 && `pl-${item.level * 2}`
            )}
            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default TableOfContents; 