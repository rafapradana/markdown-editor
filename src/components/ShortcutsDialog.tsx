
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShortcutsDialog: React.FC<ShortcutsDialogProps> = ({ open, onOpenChange }) => {
  // Define shortcut categories
  const formattingShortcuts = [
    { key: 'Ctrl+B', description: 'Bold text' },
    { key: 'Ctrl+I', description: 'Italic text' },
    { key: 'Ctrl+K', description: 'Insert link' },
    { key: 'Ctrl+E', description: 'Inline code' },
    { key: 'Ctrl+Shift+C', description: 'Code block' },
    { key: 'Ctrl+Alt+I', description: 'Insert image' },
    { key: 'Ctrl+Q', description: 'Blockquote' },
  ];

  const headingShortcuts = [
    { key: 'Ctrl+1', description: 'Heading 1' },
    { key: 'Ctrl+2', description: 'Heading 2' },
    { key: 'Ctrl+3', description: 'Heading 3' },
    { key: 'Ctrl+4', description: 'Heading 4' },
    { key: 'Ctrl+5', description: 'Heading 5' },
    { key: 'Ctrl+6', description: 'Heading 6' },
  ];

  const listShortcuts = [
    { key: 'Ctrl+U', description: 'Unordered list' },
    { key: 'Ctrl+O', description: 'Ordered list' },
  ];

  const editorShortcuts = [
    { key: 'Ctrl+Z', description: 'Undo' },
    { key: 'Ctrl+Y', description: 'Redo' },
    { key: 'Ctrl+S', description: 'Download document' },
    { key: 'Ctrl+P', description: 'Toggle preview mode' },
    { key: 'F11', description: 'Toggle fullscreen' },
    { key: '? or F1', description: 'Show keyboard shortcuts' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] sm:h-[450px] pr-4">
          <div className="grid gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground/80 mb-3 pb-1 border-b">Text Formatting</h3>
              <div className="grid gap-2.5">
                {formattingShortcuts.map((shortcut) => (
                  <div key={shortcut.key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{shortcut.description}</span>
                    <kbd className="px-2 py-0.5 bg-muted rounded">{shortcut.key}</kbd>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground/80 mb-3 pb-1 border-b">Headings</h3>
              <div className="grid gap-2.5">
                {headingShortcuts.map((shortcut) => (
                  <div key={shortcut.key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{shortcut.description}</span>
                    <kbd className="px-2 py-0.5 bg-muted rounded">{shortcut.key}</kbd>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground/80 mb-3 pb-1 border-b">Lists</h3>
              <div className="grid gap-2.5">
                {listShortcuts.map((shortcut) => (
                  <div key={shortcut.key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{shortcut.description}</span>
                    <kbd className="px-2 py-0.5 bg-muted rounded">{shortcut.key}</kbd>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground/80 mb-3 pb-1 border-b">Editor Controls</h3>
              <div className="grid gap-2.5">
                {editorShortcuts.map((shortcut) => (
                  <div key={shortcut.key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{shortcut.description}</span>
                    <kbd className="px-2 py-0.5 bg-muted rounded">{shortcut.key}</kbd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ShortcutsDialog;
