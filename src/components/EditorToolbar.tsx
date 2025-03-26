
import React from 'react';
import { 
  Bold, 
  Italic, 
  Heading, 
  Quote, 
  Link, 
  Image, 
  Code, 
  List, 
  ListOrdered, 
  SeparatorHorizontal, 
  Copy,
  XSquare,
  Eye,
  Code2,
  Laptop
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  onAction: (action: string, value?: string) => void;
  isPreviewMode: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onAction, isPreviewMode }) => {
  const buttonClasses = 'h-9 w-9 p-0 text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-all duration-200 focus-ring';
  
  interface ToolbarButton {
    label: string;
    icon: React.ReactNode;
    action: string;
    shortcut?: string;
  }

  const toolbarButtons: ToolbarButton[] = [
    { label: 'Heading', icon: <Heading size={18} />, action: 'heading', shortcut: 'Ctrl+H' },
    { label: 'Bold', icon: <Bold size={18} />, action: 'bold', shortcut: 'Ctrl+B' },
    { label: 'Italic', icon: <Italic size={18} />, action: 'italic', shortcut: 'Ctrl+I' },
    { label: 'Blockquote', icon: <Quote size={18} />, action: 'blockquote', shortcut: 'Ctrl+Q' },
    { label: 'Link', icon: <Link size={18} />, action: 'link', shortcut: 'Ctrl+K' },
    { label: 'Image', icon: <Image size={18} />, action: 'image', shortcut: 'Ctrl+Alt+I' },
    { label: 'Code Block', icon: <Code size={18} />, action: 'code', shortcut: 'Ctrl+Shift+C' },
    { label: 'Inline Code', icon: <Code2 size={18} />, action: 'inlineCode', shortcut: 'Ctrl+E' },
    { label: 'Bullet List', icon: <List size={18} />, action: 'ul', shortcut: 'Ctrl+U' },
    { label: 'Numbered List', icon: <ListOrdered size={18} />, action: 'ol', shortcut: 'Ctrl+O' },
    { label: 'Horizontal Rule', icon: <SeparatorHorizontal size={18} />, action: 'hr' },
  ];

  const utilityButtons: ToolbarButton[] = [
    { label: 'Copy All', icon: <Copy size={18} />, action: 'copy' },
    { label: 'Clear All', icon: <XSquare size={18} />, action: 'clear' },
    { 
      label: isPreviewMode ? 'Edit Mode' : 'Preview Mode', 
      icon: isPreviewMode ? <Laptop size={18} /> : <Eye size={18} />, 
      action: 'togglePreview' 
    },
  ];

  return (
    <div className="glass rounded-t-lg border-b border-border/40 p-2 flex flex-wrap items-center gap-1 transition-all duration-300 shadow-sm">
      <div className="flex flex-wrap items-center gap-1">
        {toolbarButtons.map((button, index) => (
          <React.Fragment key={button.action}>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(buttonClasses, 'button-hover')}
                  onClick={() => onAction(button.action)}
                  aria-label={button.label}
                >
                  {button.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="glass p-2 text-xs">
                <p>{button.label} {button.shortcut && <span className="text-muted-foreground ml-1">({button.shortcut})</span>}</p>
              </TooltipContent>
            </Tooltip>
            
            {index === 3 || index === 6 || index === 10 ? (
              <Separator orientation="vertical" className="h-6 mx-1" />
            ) : null}
          </React.Fragment>
        ))}
      </div>
      
      <Separator orientation="vertical" className="h-6 mx-1" />
      
      <div className="flex items-center gap-1 ml-auto">
        {utilityButtons.map((button) => (
          <Tooltip key={button.action} delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  buttonClasses, 
                  'button-hover',
                  button.action === 'togglePreview' && isPreviewMode && 'bg-primary/10 text-primary'
                )}
                onClick={() => onAction(button.action)}
                aria-label={button.label}
              >
                {button.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="glass p-2 text-xs">
              <p>{button.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default EditorToolbar;
