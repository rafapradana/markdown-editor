
import { useEffect, useState } from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Download, Keyboard } from 'lucide-react';
import ShortcutsDialog from '@/components/ShortcutsDialog';

const defaultContent = `# Welcome to the Markdown Editor

This elegant markdown editor is inspired by minimalist design principles, focusing on simplicity and usability.

## Features

- **Clean Interface**: Distraction-free writing environment
- **Live Preview**: See your formatted text as you type
- **Syntax Highlighting**: Code blocks with beautiful highlighting
- **Responsive Design**: Works beautifully on all devices
- **Keyboard Shortcuts**: Boost your productivity

## Markdown Examples

### Text Formatting

*Italic text* and **bold text** are easy to add.

### Lists

Unordered list:
- Item one
- Item two
- Item three

Ordered list:
1. First item
2. Second item
3. Third item

### Code

Inline \`code\` is useful for short snippets.

Code blocks for longer examples:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

### Blockquotes

> The simplest things are often the most profound.
> 
> — Design philosophy

### Links and Images

[Visit GitHub](https://github.com)

![Sample Image](https://images.unsplash.com/photo-1518791841217-8f162f1e1131)

### Tables

| Feature | Description |
|---------|-------------|
| Editor | Write in markdown |
| Preview | See formatted output |
| Export | Save your work |

---

Start writing your own content now by editing this text!
`;

const Index = () => {
  const [markdown, setMarkdown] = useState(defaultContent);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset animation after initial load
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Add keyboard shortcut for opening shortcuts dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open shortcuts with ? or F1
      if (e.key === '?' || e.key === 'F1') {
        e.preventDefault();
        setIsShortcutsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleExport = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download successful",
      description: "Your markdown file has been downloaded.",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className={`glass px-6 py-3 border-b border-border/40 flex items-center justify-between transition-all duration-500 ${isAnimating ? 'animate-slide-in' : ''}`}>
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-medium">Markdown Editor</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleExport}
            className="button-hover focus-ring"
          >
            <Download size={16} className="mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsShortcutsOpen(true)}
            className="button-hover focus-ring"
          >
            <Keyboard size={16} className="mr-1" />
            <span className="hidden sm:inline">Shortcuts</span>
          </Button>
        </div>
      </header>
      
      <main className={`flex-1 container max-w-6xl mx-auto p-4 sm:p-6 transition-all duration-500 ${isAnimating ? 'animate-slide-in opacity-0' : 'opacity-100'}`} style={{ animationDelay: '100ms' }}>
        <div className="w-full h-[calc(100vh-9rem)] shadow-lg rounded-lg overflow-hidden">
          <MarkdownEditor 
            initialValue={markdown} 
            onChange={setMarkdown} 
          />
        </div>
      </main>
      
      <footer className={`text-center p-4 text-sm text-muted-foreground transition-all duration-500 ${isAnimating ? 'animate-slide-in opacity-0' : 'opacity-100'}`} style={{ animationDelay: '200ms' }}>
        <p>Elegant Markdown Editor • Designed with simplicity in mind</p>
      </footer>

      <ShortcutsDialog open={isShortcutsOpen} onOpenChange={setIsShortcutsOpen} />
    </div>
  );
};

export default Index;
