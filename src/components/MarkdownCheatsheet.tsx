import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const cheatsheetItems = [
  {
    category: 'Headers',
    items: [
      { syntax: '# Heading 1', description: 'Main title' },
      { syntax: '## Heading 2', description: 'Section title' },
      { syntax: '### Heading 3', description: 'Sub-section title' },
      { syntax: '#### Heading 4', description: 'Sub-sub-section title' },
      { syntax: '##### Heading 5', description: 'Sub-sub-sub-section title' },
      { syntax: '###### Heading 6', description: 'Sub-sub-sub-sub-section title' },
    ]
  },
  {
    category: 'Emphasis',
    items: [
      { syntax: '*italic* or _italic_', description: 'Italic text' },
      { syntax: '**bold** or __bold__', description: 'Bold text' },
      { syntax: '~~strikethrough~~', description: 'Strikethrough text' },
    ]
  },
  {
    category: 'Lists',
    items: [
      { syntax: '1. Ordered item', description: 'Ordered list item' },
      { syntax: '- Unordered item', description: 'Unordered list item' },
      { syntax: '   - Nested item', description: 'Indented with spaces or tabs' },
      { syntax: '- [ ] Task item', description: 'Unchecked task item' },
      { syntax: '- [x] Task item', description: 'Checked task item' },
    ]
  },
  {
    category: 'Links & Images',
    items: [
      { syntax: '[Link text](https://url.com)', description: 'Hyperlink' },
      { syntax: '[Link](url "Title")', description: 'Link with title' },
      { syntax: '![Alt text](image.jpg)', description: 'Image' },
      { syntax: '![Alt](image.jpg "Title")', description: 'Image with title' },
    ]
  },
  {
    category: 'Code',
    items: [
      { syntax: '`inline code`', description: 'Inline code' },
      { syntax: '```\ncode block\n```', description: 'Code block' },
      { syntax: '```javascript\nlet x = 10;\n```', description: 'Code with language' },
    ]
  },
  {
    category: 'Blockquotes & Dividers',
    items: [
      { syntax: '> Blockquote text', description: 'Blockquote' },
      { syntax: '>> Nested blockquote', description: 'Nested blockquote' },
      { syntax: '---', description: 'Horizontal rule' },
    ]
  },
  {
    category: 'Tables',
    items: [
      { 
        syntax: '| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |', 
        description: 'Basic table' 
      },
      { 
        syntax: '| Left | Center | Right |\n|:-----|:------:|------:|\n| Cell | Cell | Cell |', 
        description: 'Table with alignment' 
      },
    ]
  },
  {
    category: 'Footnotes & References',
    items: [
      { syntax: 'Text with[^1] a footnote\n\n[^1]: Footnote text', description: 'Footnote' },
      { syntax: '[Ref link][id]\n\n[id]: https://example.com', description: 'Reference link' },
    ]
  },
];

interface MarkdownCheatsheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MarkdownCheatsheet({ open, onOpenChange }: MarkdownCheatsheetProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Markdown Cheatsheet</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)}
            className="h-8 w-8"
          >
            <X size={16} />
          </Button>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {cheatsheetItems.map((category) => (
            <div key={category.category} className="space-y-3">
              <h3 className="text-lg font-medium">{category.category}</h3>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <pre className="p-2 bg-muted rounded-md text-xs overflow-auto">{item.syntax}</pre>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownCheatsheet; 