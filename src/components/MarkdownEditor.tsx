import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import EditorToolbar from './EditorToolbar';
import MarkdownTextarea from './MarkdownTextarea';
import MarkdownPreview from './MarkdownPreview';
import StatusBar from './StatusBar';
import TableOfContents from './TableOfContents';
import SearchReplace from './SearchReplace';
import MarkdownCheatsheet from './MarkdownCheatsheet';
import WordGoalIndicator from './WordGoalIndicator';
import ImageDrop from './ImageDrop';
import AppGuide from './AppGuide';
import { useEditorActions } from '@/hooks/useEditorActions';
import DownloadDialog from './DownloadDialog';
import { Search, BookOpen, Focus } from 'lucide-react';
import { Button } from './ui/button';

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
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [isAppGuideOpen, setIsAppGuideOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const [showTOC, setShowTOC] = useState(false);
  const [showSearchReplace, setShowSearchReplace] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  const {
    markdownText,
    isPreviewMode,
    isFullscreen,
    textareaRef,
    handleTextChange,
    handlePreviewChange,
    handleToolbarAction
  } = useEditorActions(initialValue, onChange);

  // Auto-save to localStorage
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('markdown-editor-content', markdownText);
      localStorage.setItem('markdown-editor-last-saved', new Date().toISOString());
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [markdownText]);

  // Extract word count from the markdown text
  useEffect(() => {
    if (!markdownText) return;
    const text = markdownText.trim();
    const count = text ? text.split(/\s+/).filter(Boolean).length : 0;
    setWordCount(count);
  }, [markdownText]);

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
          case 'f':
            if (e.shiftKey) {
              e.preventDefault();
              setIsFocusMode(!isFocusMode);
            } else if (e.altKey) { 
              e.preventDefault();
              setShowSearchReplace(!showSearchReplace);
            }
            break;
          case 't':
            if (e.altKey) {
              e.preventDefault();
              setShowTOC(!showTOC);
            }
            break;
          case 'h':
            if (e.altKey) {
              e.preventDefault();
              setIsCheatsheetOpen(true);
            }
            break;
          case 'g':
            if (e.altKey) {
              e.preventDefault();
              setIsAppGuideOpen(true);
            }
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

      // Escape to exit focus mode or search/replace
      if (e.key === 'Escape') {
        if (isFocusMode) {
          setIsFocusMode(false);
        }
        if (showSearchReplace) {
          setShowSearchReplace(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleToolbarAction, 
    textareaRef, 
    isFocusMode, 
    showSearchReplace, 
    showTOC
  ]);

  // Handler for when preview HTML changes
  const handlePreviewHtmlChange = (html: string) => {
    setPreviewHtml(html);
  };

  const toggleTOC = () => {
    setShowTOC(!showTOC);
  };

  const toggleSearchReplace = () => {
    setShowSearchReplace(!showSearchReplace);
  };

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  const handleInsertImage = (imageMarkdown: string) => {
    if (textareaRef.current) {
      const cursorPos = textareaRef.current.selectionStart;
      const textBefore = markdownText.substring(0, cursorPos);
      const textAfter = markdownText.substring(cursorPos);
      
      // Insert the image markdown at the cursor position with newlines
      const newText = `${textBefore}\n\n${imageMarkdown}\n\n${textAfter}`;
      handleTextChange(newText);
    } else {
      // Fallback to appending to the end if we can't get cursor position
      const newText = `${markdownText}\n\n${imageMarkdown}\n`;
      handleTextChange(newText);
    }
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
        isFocusMode={isFocusMode}
        onToggleTOC={toggleTOC}
        onToggleFocus={toggleFocusMode}
        onToggleSearchReplace={toggleSearchReplace}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        onOpenDownloadDialog={() => setIsDownloadDialogOpen(true)}
        onOpenAppGuide={() => setIsAppGuideOpen(true)}
      />
      
      <div className="flex-1 flex overflow-hidden rounded-b-lg bg-editor-background">
        {/* Main editor container */}
        <div className={cn(
          "flex-1 flex flex-col",
          isFocusMode ? "max-w-2xl mx-auto" : "w-full"
        )}>
          {/* Editor and Preview */}
          <div className="flex-1 flex overflow-hidden">
            <MarkdownTextarea
              ref={textareaRef}
              value={markdownText}
              onChange={handleTextChange}
              isPreviewMode={isPreviewMode}
              isFocusMode={isFocusMode}
            />

            <MarkdownPreview 
              markdownText={markdownText}
              isPreviewMode={isPreviewMode}
              isFocusMode={isFocusMode}
              onContentChange={handlePreviewChange}
              onHtmlChange={handlePreviewHtmlChange}
            />
          </div>
          
          {/* Search & Replace */}
          {showSearchReplace && (
            <div className="p-2">
              <SearchReplace 
                markdownText={markdownText} 
                onUpdateText={handleTextChange}
                onClose={() => setShowSearchReplace(false)}
              />
            </div>
          )}
        </div>
        
        {/* Table of Contents Sidebar */}
        {showTOC && !isPreviewMode && (
          <div className="w-64 border-l border-border/40 overflow-auto p-2">
            <TableOfContents markdownText={markdownText} />
          </div>
        )}
      </div>

      <div className="border-t border-border/40 bg-editor-background">
        <div className="flex justify-between items-center px-3 py-1">
          <StatusBar markdownText={markdownText} />
          <WordGoalIndicator wordCount={wordCount} className="ml-4" />
        </div>
      </div>

      {/* Non-visual components */}
      <ImageDrop 
        isActive={!isPreviewMode}
        onImageInsert={handleInsertImage}
      />

      {/* Dialogs */}
      <MarkdownCheatsheet
        open={isCheatsheetOpen}
        onOpenChange={setIsCheatsheetOpen}
      />

      <AppGuide
        open={isAppGuideOpen}
        onOpenChange={setIsAppGuideOpen}
      />

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
