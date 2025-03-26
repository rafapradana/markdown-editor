
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Keyboard } from 'lucide-react';

interface ShortcutGroup {
  title: string;
  shortcuts: { key: string; description: string }[];
}

interface ShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShortcutsDialog: React.FC<ShortcutsDialogProps> = ({ open, onOpenChange }) => {
  const shortcutGroups: ShortcutGroup[] = [
    {
      title: 'Text Formatting',
      shortcuts: [
        { key: 'Ctrl+B', description: 'Bold text' },
        { key: 'Ctrl+I', description: 'Italic text' },
        { key: 'Ctrl+K', description: 'Insert link' },
        { key: 'Ctrl+E', description: 'Inline code' },
        { key: 'Ctrl+Q', description: 'Blockquote' },
        { key: 'Ctrl+H', description: 'Insert heading' }
      ]
    },
    {
      title: 'Lists and Structure',
      shortcuts: [
        { key: 'Ctrl+U', description: 'Bullet list' },
        { key: 'Ctrl+O', description: 'Numbered list' },
        { key: 'Ctrl+Shift+C', description: 'Code block' },
        { key: 'Ctrl+Alt+I', description: 'Insert image' }
      ]
    },
    {
      title: 'Editor Controls',
      shortcuts: [
        { key: 'Ctrl+Z', description: 'Undo' },
        { key: 'Ctrl+Y', description: 'Redo' },
        { key: 'Ctrl+S', description: 'Download markdown' },
        { key: 'Ctrl+P', description: 'Toggle preview mode' },
        { key: 'F1 or ?', description: 'Show this shortcuts dialog' }
      ]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-primary" />
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="text-sm text-muted-foreground pb-2">
          Use these keyboard shortcuts to speed up your workflow
        </DialogDescription>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 pr-4 py-2">
            {shortcutGroups.map((group, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-sm font-medium text-primary">{group.title}</h3>
                <div className="space-y-1">
                  {group.shortcuts.map((shortcut, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1.5">
                      <span className="text-muted-foreground">{shortcut.description}</span>
                      <kbd className="bg-muted px-2 py-0.5 rounded text-xs font-mono ml-2">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ShortcutsDialog;
