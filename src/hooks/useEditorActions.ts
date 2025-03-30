import { useRef, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface EditorHistory {
  past: string[];
  future: string[];
}

export function useEditorActions(
  initialValue = '# Hello, World!\n\nStart writing your markdown here...',
  onChange?: (value: string) => void
) {
  // Try to load from localStorage first
  const getSavedContent = () => {
    const savedContent = localStorage.getItem('markdown-editor-content');
    return savedContent || initialValue;
  };

  const initialContent = getSavedContent();
  const [markdownText, setMarkdownText] = useState<string>(initialContent);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  const [history, setHistory] = useState<EditorHistory>({ 
    past: [initialContent], 
    future: [] 
  });

  // Handle text changes
  const handleTextChange = (text: string) => {
    setMarkdownText(text);
    
    // Clear future history when new changes are made
    setHistory({
      past: [...history.past, text],
      future: []
    });
    
    // Limit history size
    if (history.past.length > 100) {
      setHistory(prev => ({
        past: prev.past.slice(-100),
        future: prev.future
      }));
    }
    
    if (onChange) {
      onChange(text);
    }
  };

  // Handle preview content changes
  const handlePreviewChange = (html: string) => {
    // You can add processing here if needed
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const performUndo = () => {
    if (history.past.length > 1) {
      const previous = history.past[history.past.length - 2];
      const newPast = history.past.slice(0, -1);
      
      setHistory({
        past: newPast,
        future: [markdownText, ...history.future]
      });
      
      setMarkdownText(previous);
      
      if (onChange) {
        onChange(previous);
      }
    }
  };

  const performRedo = () => {
    if (history.future.length > 0) {
      const next = history.future[0];
      
      setHistory({
        past: [...history.past, next],
        future: history.future.slice(1)
      });
      
      setMarkdownText(next);
      
      if (onChange) {
        onChange(next);
      }
    }
  };

  // Toolbar action handler
  const handleToolbarAction = (action: string, e?: any) => {
    if (!textareaRef.current && action !== 'togglePreview' && 
        action !== 'importFile' && action !== 'fullscreen' && !isPreviewMode) return;

    const textarea = textareaRef.current;
    const selectionStart = textarea ? textarea.selectionStart : 0;
    const selectionEnd = textarea ? textarea.selectionEnd : 0;
    const selectedText = textarea ? textarea.value.substring(selectionStart, selectionEnd) : '';
    const beforeSelection = textarea ? textarea.value.substring(0, selectionStart) : '';
    const afterSelection = textarea ? textarea.value.substring(selectionEnd) : '';
    
    let newText = markdownText;
    let newCursorPos = selectionStart;

    switch (action) {
      case 'bold':
        newText = `${beforeSelection}**${selectedText || 'bold text'}**${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 2 
          : selectionStart + 2 + 'bold text'.length;
        break;

      case 'italic':
        newText = `${beforeSelection}*${selectedText || 'italic text'}*${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 1 
          : selectionStart + 1 + 'italic text'.length;
        break;

      case 'heading1':
        newText = `${beforeSelection}# ${selectedText || 'Heading 1'}${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 2 
          : selectionStart + 2 + 'Heading 1'.length;
        break;

      case 'heading2':
        newText = `${beforeSelection}## ${selectedText || 'Heading 2'}${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 3 
          : selectionStart + 3 + 'Heading 2'.length;
        break;

      case 'heading3':
        newText = `${beforeSelection}### ${selectedText || 'Heading 3'}${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 4 
          : selectionStart + 4 + 'Heading 3'.length;
        break;

      case 'heading4':
        newText = `${beforeSelection}#### ${selectedText || 'Heading 4'}${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 5 
          : selectionStart + 5 + 'Heading 4'.length;
        break;

      case 'heading5':
        newText = `${beforeSelection}##### ${selectedText || 'Heading 5'}${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 6 
          : selectionStart + 6 + 'Heading 5'.length;
        break;

      case 'heading6':
        newText = `${beforeSelection}###### ${selectedText || 'Heading 6'}${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 7
          : selectionStart + 7 + 'Heading 6'.length;
        break;

      case 'blockquote':
        newText = `${beforeSelection}> ${selectedText || 'Blockquote'}${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 2 
          : selectionStart + 2 + 'Blockquote'.length;
        break;

      case 'link':
        newText = `${beforeSelection}[${selectedText || 'Link text'}](url)${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + selectedText.length + 3 
          : selectionStart + 'Link text'.length + 3;
        break;

      case 'image':
        newText = `${beforeSelection}![${selectedText || 'Alt text'}](url)${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + selectedText.length + 4 
          : selectionStart + 'Alt text'.length + 4;
        break;

      case 'code':
        newText = `${beforeSelection}\`\`\`\n${selectedText || 'Code block'}\n\`\`\`${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 4 
          : selectionStart + 4 + 'Code block'.length;
        break;

      case 'inlineCode':
        newText = `${beforeSelection}\`${selectedText || 'code'}\`${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 1
          : selectionStart + 1 + 'code'.length;
        break;

      case 'ul':
        newText = `${beforeSelection}- ${selectedText || 'List item'}${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 2 
          : selectionStart + 2 + 'List item'.length;
        break;

      case 'ol':
        newText = `${beforeSelection}1. ${selectedText || 'List item'}${afterSelection}`;
        newCursorPos = selectedText 
          ? selectionStart + 3 
          : selectionStart + 3 + 'List item'.length;
        break;

      case 'hr':
        newText = `${beforeSelection}\n---\n${afterSelection}`;
        newCursorPos = selectionStart + 5;
        break;

      case 'undo':
        performUndo();
        return;

      case 'redo':
        performRedo();
        return;

      case 'copy':
        navigator.clipboard.writeText(markdownText);
        toast({
          title: "Copied to clipboard",
          description: "Markdown content has been copied to your clipboard",
          duration: 3000,
        });
        return;

      case 'clear':
        if (confirm('Are you sure you want to clear all content?')) {
          newText = '';
          newCursorPos = 0;
        } else {
          return;
        }
        break;

      case 'togglePreview':
        togglePreviewMode();
        return;

      case 'fullscreen':
        toggleFullscreen();
        return;

      case 'import':
        document.getElementById('markdown-file-input')?.click();
        return;

      case 'importFile':
        if (e && e.target && e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target) {
              const content = event.target.result as string;
              setMarkdownText(content);
              if (onChange) {
                onChange(content);
              }
            }
          };
          reader.readAsText(file);
          e.target.value = '';
        }
        return;

      default:
        return;
    }

    // Update text
    setMarkdownText(newText);
    
    if (onChange) {
      onChange(newText);
    }

    // Set focus and cursor position
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.selectionStart = newCursorPos;
        textarea.selectionEnd = newCursorPos;
      }
    }, 0);
  };

  return {
    markdownText,
    setMarkdownText,
    isPreviewMode,
    setIsPreviewMode,
    isFullscreen,
    setIsFullscreen,
    textareaRef,
    handleTextChange,
    handlePreviewChange,
    handleToolbarAction,
  };
}
