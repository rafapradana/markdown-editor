
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import EditorToolbar from './EditorToolbar';
import MarkdownTextarea from './MarkdownTextarea';
import MarkdownPreview from './MarkdownPreview';
import { useEditorActions } from '@/hooks/useEditorActions';

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
  const {
    markdownText,
    isPreviewMode,
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
          case 'h':
            e.preventDefault();
            handleToolbarAction('heading');
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
            handleToolbarAction('export');
            break;
          case 'p':
            e.preventDefault();
            handleToolbarAction('togglePreview');
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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleToolbarAction, textareaRef]);

  return (
    <div className={cn('w-full h-full flex flex-col bg-background rounded-lg animate-fade-in', className)}>
      <EditorToolbar onAction={handleToolbarAction} isPreviewMode={isPreviewMode} />
      
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
        />
      </div>

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
