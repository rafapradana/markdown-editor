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
  Laptop,
  Undo2,
  Redo2,
  Download,
  FileUp,
  Fullscreen,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  BookOpen,
  Search,
  Focus,
  HelpCircle,
  BookOpenText,
  Info,
  FileText,
  CheckSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Tabs,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';

interface EditorToolbarProps {
  onAction: (action: string, value?: string) => void;
  isPreviewMode: boolean;
  isFullscreen?: boolean;
  isFocusMode?: boolean;
  onOpenDownloadDialog: () => void;
  onToggleTOC: () => void;
  onToggleFocus: () => void;
  onToggleSearchReplace: () => void;
  onOpenCheatsheet: () => void;
  onOpenAppGuide: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ 
  onAction, 
  isPreviewMode, 
  isFullscreen = false,
  isFocusMode = false,
  onOpenDownloadDialog,
  onToggleTOC,
  onToggleFocus,
  onToggleSearchReplace,
  onOpenCheatsheet,
  onOpenAppGuide
}) => {
  const buttonClasses = 'h-9 w-9 p-0 text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-all duration-200 focus-ring';
  
  interface ToolbarButton {
    label: string;
    icon: React.ReactNode;
    action: string;
    shortcut?: string;
    group?: string;
  }

  // Group headings in a dropdown
  const headingButtons: ToolbarButton[] = [
    { label: 'Heading 1', icon: <Heading1 size={18} />, action: 'heading1', shortcut: 'Ctrl+1', group: 'headings' },
    { label: 'Heading 2', icon: <Heading2 size={18} />, action: 'heading2', shortcut: 'Ctrl+2', group: 'headings' },
    { label: 'Heading 3', icon: <Heading3 size={18} />, action: 'heading3', shortcut: 'Ctrl+3', group: 'headings' },
    { label: 'Heading 4', icon: <Heading4 size={18} />, action: 'heading4', shortcut: 'Ctrl+4', group: 'headings' },
    { label: 'Heading 5', icon: <Heading5 size={18} />, action: 'heading5', shortcut: 'Ctrl+5', group: 'headings' },
    { label: 'Heading 6', icon: <Heading6 size={18} />, action: 'heading6', shortcut: 'Ctrl+6', group: 'headings' },
  ];

  // Text formatting buttons
  const textFormattingButtons: ToolbarButton[] = [
    { label: 'Bold', icon: <Bold size={18} />, action: 'bold', shortcut: 'Ctrl+B', group: 'formatting' },
    { label: 'Italic', icon: <Italic size={18} />, action: 'italic', shortcut: 'Ctrl+I', group: 'formatting' },
    { label: 'Blockquote', icon: <Quote size={18} />, action: 'blockquote', shortcut: 'Ctrl+Q', group: 'formatting' },
  ];

  // Insert elements buttons
  const insertButtons: ToolbarButton[] = [
    { label: 'Insert Link', icon: <Link size={18} />, action: 'link', shortcut: 'Ctrl+K', group: 'insert' },
    { label: 'Insert Image', icon: <Image size={18} />, action: 'image', shortcut: 'Ctrl+Alt+I', group: 'insert' },
    { label: 'Code Block', icon: <Code size={18} />, action: 'code', shortcut: 'Ctrl+Shift+C', group: 'insert' },
    { label: 'Inline Code', icon: <Code2 size={18} />, action: 'inlineCode', shortcut: 'Ctrl+E', group: 'insert' },
  ];

  // List buttons
  const listButtons: ToolbarButton[] = [
    { label: 'Bullet List', icon: <List size={18} />, action: 'ul', shortcut: 'Ctrl+U', group: 'lists' },
    { label: 'Numbered List', icon: <ListOrdered size={18} />, action: 'ol', shortcut: 'Ctrl+O', group: 'lists' },
    { label: 'Task List', icon: <CheckSquare size={18} />, action: 'task', group: 'lists' },
    { label: 'Horizontal Rule', icon: <SeparatorHorizontal size={18} />, action: 'hr', group: 'lists' },
  ];

  // History buttons
  const historyButtons: ToolbarButton[] = [
    { label: 'Undo', icon: <Undo2 size={18} />, action: 'undo', shortcut: 'Ctrl+Z', group: 'history' },
    { label: 'Redo', icon: <Redo2 size={18} />, action: 'redo', shortcut: 'Ctrl+Y', group: 'history' },
  ];

  // View mode buttons
  const viewButtons: ToolbarButton[] = [
    { 
      label: isPreviewMode ? 'Edit Mode' : 'Preview Mode', 
      icon: isPreviewMode ? <Laptop size={18} /> : <Eye size={18} />, 
      action: 'togglePreview',
      shortcut: 'Ctrl+P',
      group: 'view'
    },
    { 
      label: 'Fullscreen', 
      icon: <Fullscreen size={18} />, 
      action: 'fullscreen',
      shortcut: 'F11',
      group: 'view'
    },
    { 
      label: 'Focus Mode', 
      icon: <Focus size={18} />, 
      action: 'focus',
      shortcut: 'Ctrl+Shift+F',
      group: 'view'
    },
  ];

  // Document tools
  const documentButtons: ToolbarButton[] = [
    { label: 'Table of Contents', icon: <BookOpen size={18} />, action: 'toc', shortcut: 'Ctrl+Alt+T', group: 'document' },
    { label: 'Search & Replace', icon: <Search size={18} />, action: 'search', shortcut: 'Ctrl+Alt+F', group: 'document' },
    { label: 'Export Document', icon: <Download size={18} />, action: 'export', shortcut: 'Ctrl+S', group: 'document' },
    { label: 'Import Document', icon: <FileUp size={18} />, action: 'import', group: 'document' },
  ];

  // Help buttons
  const helpButtons: ToolbarButton[] = [
    { label: 'App Guide', icon: <BookOpenText size={18} />, action: 'guide', group: 'help' },
    { label: 'Markdown Cheatsheet', icon: <HelpCircle size={18} />, action: 'cheatsheet', group: 'help' },
  ];

  // Handle button clicks
  const handleButtonClick = (button: ToolbarButton) => {
    switch (button.action) {
      case 'focus':
        onToggleFocus();
        break;
      case 'toc':
        onToggleTOC();
        break;
      case 'search':
        onToggleSearchReplace();
        break;
      case 'cheatsheet':
        onOpenCheatsheet();
        break;
      case 'guide':
        onOpenAppGuide();
        break;
      case 'export':
        onOpenDownloadDialog();
        break;
      default:
        onAction(button.action);
        break;
    }
  };

  // Render a button with tooltip
  const renderButton = (button: ToolbarButton, isActive: boolean = false) => (
    <Tooltip key={button.action} delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            buttonClasses, 
            'button-hover',
            isActive ? 'bg-primary/10 text-primary' : ''
          )}
          onClick={() => handleButtonClick(button)}
          aria-label={button.label}
        >
          {button.icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="glass p-2 text-xs">
        <p>
          {button.label} 
          {button.shortcut && (
            <span className="text-muted-foreground ml-1 px-1.5 py-0.5 bg-muted rounded">
              {button.shortcut}
            </span>
          )}
        </p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className={cn(
      "glass rounded-t-lg border-b border-border/40 p-2 flex flex-col gap-2 transition-all duration-300 shadow-sm",
      isFocusMode && "bg-background/70 backdrop-blur-md border-transparent"
    )}>
      {/* Main mode selector */}
      <div className="flex items-center justify-between w-full mb-1">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-primary ml-1" />
          <span className="font-medium">Markdown Editor</span>
        </div>
        
        <Tabs defaultValue="write" className="w-auto">
          <TabsList className="h-8">
            <TabsTrigger 
              value="write" 
              className={!isPreviewMode ? "text-primary" : ""}
              onClick={() => !isPreviewMode ? null : handleButtonClick({
                label: 'Edit Mode',
                icon: <Laptop size={18} />,
                action: 'togglePreview'
              })}
            >
              Write
            </TabsTrigger>
            <TabsTrigger 
              value="preview"
              className={isPreviewMode ? "text-primary" : ""}
              onClick={() => isPreviewMode ? null : handleButtonClick({
                label: 'Preview Mode',
                icon: <Eye size={18} />,
                action: 'togglePreview'
              })}
            >
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-1">
          {/* Right-aligned actions */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-sm flex items-center gap-1.5 rounded-full"
            onClick={() => onOpenAppGuide()}
          >
            <Info size={16} className="text-primary" />
            <span className="hidden sm:inline">Help</span>
          </Button>
        
          <ThemeToggle />

          {renderButton({
            label: 'Fullscreen',
            icon: <Fullscreen size={18} />,
            action: 'fullscreen',
            shortcut: 'F11'
          }, isFullscreen)}
        </div>
      </div>

      {/* Toolbar sections */}
      <div className="flex flex-wrap items-center gap-1">
        {/* Basic formatting section */}
        <div className="flex items-center">
          {/* Headings dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(buttonClasses, 'button-hover')}
                aria-label="Headings"
              >
                <Heading size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="grid grid-cols-3 gap-1">
                {headingButtons.map((button) => renderButton(button))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Text formatting buttons */}
          <div className="flex items-center ml-1">
            {textFormattingButtons.map(button => renderButton(button))}
          </div>
        </div>

        <Separator orientation="vertical" className="h-8 mx-1" />

        {/* Insert elements section */}
        <div className="flex items-center">
          {insertButtons.map(button => renderButton(button))}
        </div>

        <Separator orientation="vertical" className="h-8 mx-1" />

        {/* Lists section */}
        <div className="flex items-center">
          {listButtons.map(button => renderButton(button))}
        </div>

        <Separator orientation="vertical" className="h-8 mx-1" />

        {/* Document tools section */}
        <div className="flex items-center">
          {renderButton(documentButtons[0])} {/* TOC */}
          {renderButton(documentButtons[1])} {/* Search */}
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(buttonClasses, 'button-hover ml-1')}
              >
                <Download size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Document Actions</p>
                <div className="grid gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start pl-2 h-9"
                    onClick={() => onOpenDownloadDialog()}
                  >
                    <Download size={16} className="mr-2" />
                    Export Document
                    <span className="ml-auto text-xs text-muted-foreground">Ctrl+S</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start pl-2 h-9"
                    onClick={() => onAction('import')}
                  >
                    <FileUp size={16} className="mr-2" />
                    Import Document
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start pl-2 h-9"
                    onClick={() => onAction('copy')}
                  >
                    <Copy size={16} className="mr-2" />
                    Copy All Content
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start pl-2 h-9"
                    onClick={() => onAction('clear')}
                  >
                    <XSquare size={16} className="mr-2" />
                    Clear All Content
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Separator orientation="vertical" className="h-8 mx-1" />

        {/* History section */}
        <div className="flex items-center">
          {historyButtons.map(button => renderButton(button))}
        </div>

        {/* View mode and focus section - only shown on larger screens */}
        <div className="md:flex hidden items-center ml-auto">
          {renderButton(viewButtons[2], isFocusMode)} {/* Focus mode */}
        </div>
      </div>

      {/* Mobile-friendly secondary toolbar with shortcuts */}
      <div className="w-full flex flex-wrap items-center gap-1 px-1 py-1 text-xs text-muted-foreground bg-muted/30 rounded-md">
        <div className="flex flex-wrap items-center gap-2 w-full">
          <span className="font-medium text-xs text-foreground/70">Quick Actions:</span>
          <div className="flex-1 flex flex-wrap gap-1">
            <button
              onClick={() => handleButtonClick(documentButtons[0])}
              className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-muted/80 transition-colors"
            >
              <BookOpen size={14} />
              <span>Contents</span>
            </button>
            <button
              onClick={() => handleButtonClick(documentButtons[1])}
              className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-muted/80 transition-colors"
            >
              <Search size={14} />
              <span>Search</span>
            </button>
            <button
              onClick={() => onToggleFocus()}
              className={cn(
                "flex items-center gap-1 px-1.5 py-1 rounded hover:bg-muted/80 transition-colors",
                isFocusMode && "bg-primary/10 text-primary"
              )}
            >
              <Focus size={14} />
              <span>Focus</span>
            </button>
            <button
              onClick={() => onOpenCheatsheet()}
              className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-muted/80 transition-colors"
            >
              <HelpCircle size={14} />
              <span>Markdown Help</span>
            </button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs ml-auto bg-primary/10 hover:bg-primary/20 text-primary"
            onClick={onOpenAppGuide}
          >
            <BookOpenText size={14} className="mr-1" />
            Editor Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
