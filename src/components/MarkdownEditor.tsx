import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import EditorToolbar from './EditorToolbar';
import MarkdownTextarea from './MarkdownTextarea';
import MarkdownPreview from './MarkdownPreview';
import { useEditorActions } from '@/hooks/useEditorActions';
import DownloadDialog from './DownloadDialog';

export interface MarkdownEditorProps {
  initialValue?: string;
  className?: string;
  onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = '# Hello, World!\n\nStart writing your markdown here...',
  className,
  onChange,
}) => {
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  
  const {
    markdownText,
    isPreviewMode,
    isFullscreen,
    textareaRef,
    handleTextChange,
    handlePreviewChange,
    handleToolbarAction
  } = useEditorActions(initialValue, onChange);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in form elements (except for our textarea)
      const isOtherInput = 
        e.target instanceof HTMLElement && 
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName) && 
        e.target !== textareaRef.current;

      if (isOtherInput) return;
      
      // Common modifier key detection for cross-platform support
      const isModifierKey = e.ctrlKey || e.metaKey; // Ctrl for Windows/Linux, Cmd for Mac
      
      if (isModifierKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            handleToolbarAction('bold');
            break;
          case 'i':
            e.preventDefault();
            handleToolbarAction('italic');
            break;
          case 'k':
            e.preventDefault();
            handleToolbarAction('link');
            break;
          case 'q':
            e.preventDefault();
            handleToolbarAction('blockquote');
            break;
          case 'e':
            e.preventDefault();
            handleToolbarAction('inlineCode');
            break;
          case 'u':
            e.preventDefault();
            handleToolbarAction('ul');
            break;
          case 'o':
            e.preventDefault();
            handleToolbarAction('ol');
            break;
          case 'z':
            e.preventDefault();
            handleToolbarAction('undo');
            break;
          case 'y':
            e.preventDefault();
            handleToolbarAction('redo');
            break;
          case 's':
            e.preventDefault();
            setIsDownloadDialogOpen(true);
            break;
          case 'p':
            e.preventDefault();
            handleToolbarAction('togglePreview');
            break;
          case '1':
            e.preventDefault();
            handleToolbarAction('heading1');
            break;
          case '2':
            e.preventDefault();
            handleToolbarAction('heading2');
            break;
          case '3':
            e.preventDefault();
            handleToolbarAction('heading3');
            break;
          case '4':
            e.preventDefault();
            handleToolbarAction('heading4');
            break;
          case '5':
            e.preventDefault();
            handleToolbarAction('heading5');
            break;
          case '6':
            e.preventDefault();
            handleToolbarAction('heading6');
            break;
        }
      }
      
      // Special case for code block (Ctrl+Shift+C)
      if (isModifierKey && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleToolbarAction('code');
      }
      
      // Special case for image (Ctrl+Alt+I)
      if (isModifierKey && e.altKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        handleToolbarAction('image');
      }
      
      // F11 for fullscreen
      if (e.key === 'F11') {
        e.preventDefault();
        handleToolbarAction('fullscreen');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleToolbarAction, textareaRef]);

  // Handler for when preview HTML changes
  const handlePreviewHtmlChange = (html: string) => {
    setPreviewHtml(html);
  };

  return (
    <div 
      className={cn(
        'w-full h-full flex flex-col bg-background rounded-lg animate-fade-in',
        isFullscreen ? 'fixed top-0 left-0 z-50 rounded-none' : '',
        className
      )}
    >
      <EditorToolbar 
        onAction={handleToolbarAction} 
        isPreviewMode={isPreviewMode} 
        isFullscreen={isFullscreen}
        onOpenDownloadDialog={() => setIsDownloadDialogOpen(true)}
      />
      
      <div className="flex-1 flex overflow-hidden rounded-b-lg bg-editor-background">
        <MarkdownTextarea
          ref={textareaRef}
          value={markdownText}
          onChange={handleTextChange}
          isPreviewMode={isPreviewMode}
        />

        <MarkdownPreview 
          markdownText={markdownText}
          isPreviewMode={isPreviewMode}
          onContentChange={handlePreviewChange}
          onHtmlChange={handlePreviewHtmlChange}
        />
      </div>

      {/* Download dialog */}
      <DownloadDialog 
        open={isDownloadDialogOpen} 
        onOpenChange={setIsDownloadDialogOpen} 
        markdownContent={markdownText}
        previewHtml={previewHtml}
      />

      {/* Hidden file input for import functionality */}
      <input 
        type="file" 
        id="markdown-file-input" 
        accept=".md" 
        style={{ display: 'none' }} 
        onChange={(e) => handleToolbarAction('importFile', e)} 
      />
    </div>
  );
};

export default MarkdownEditor;
