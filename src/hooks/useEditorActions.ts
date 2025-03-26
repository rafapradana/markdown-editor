
import { useRef, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function useEditorActions(
  initialValue = '# Hello, World!\n\nStart writing your markdown here...',
  onChange?: (value: string) => void
) {
  const [markdownText, setMarkdownText] = useState(initialValue);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  // History for undo/redo functionality
  const [history, setHistory] = useState<string[]>([initialValue]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Add to history when markdown text changes
  useEffect(() => {
    const lastHistoryItem = history[historyIndex];
    if (markdownText !== lastHistoryItem) {
      // Add new state to history, remove any future states
      const newHistory = [...history.slice(0, historyIndex + 1), markdownText];
      // Limit history size to prevent memory issues
      if (newHistory.length > 100) {
        newHistory.shift();
      }
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [markdownText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handlePreviewChange = (content: string) => {
    setMarkdownText(content);
    if (onChange) {
      onChange(content);
    }
  };

  const performUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setMarkdownText(history[historyIndex - 1]);
      if (onChange) {
        onChange(history[historyIndex - 1]);
      }
    }
  };

  const performRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setMarkdownText(history[historyIndex + 1]);
      if (onChange) {
        onChange(history[historyIndex + 1]);
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const importMarkdownFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setMarkdownText(content);
      if (onChange) {
        onChange(content);
      }
      toast({
        title: "Import successful",
        description: `Imported ${file.name}`,
        duration: 2000,
      });
    };
    reader.onerror = () => {
      toast({
        title: "Import failed",
        description: "Could not read the file",
        variant: "destructive",
        duration: 2000,
      });
    };
    reader.readAsText(file);

    // Reset the input so the same file can be imported again
    e.target.value = '';
  };

  const handleToolbarAction = (action: string, value?: any) => {
    if (!textareaRef.current && action !== 'togglePreview' && action !== 'export' && action !== 'import' && action !== 'importFile' && action !== 'fullscreen' && !isPreviewMode) return;

    const textarea = textareaRef.current;
    const start = textarea?.selectionStart || 0;
    const end = textarea?.selectionEnd || 0;
    const selectedText = textarea ? markdownText.substring(start, end) : '';
    const beforeSelection = textarea ? markdownText.substring(0, start) : '';
    const afterSelection = textarea ? markdownText.substring(end) : '';

    let newText = '';
    let newCursorPos = 0;

    switch (action) {
      case 'heading1':
      case 'heading2':
      case 'heading3':
      case 'heading4':
      case 'heading5':
      case 'heading6':
        const headingLevel = action.charAt(action.length - 1);
        const headingMarker = '#'.repeat(Number(headingLevel));
        if (selectedText) {
          newText = `${beforeSelection}${headingMarker} ${selectedText}${afterSelection}`;
          newCursorPos = start + headingMarker.length + 1 + selectedText.length;
        } else {
          newText = `${beforeSelection}${headingMarker} Heading ${headingLevel}${afterSelection}`;
          newCursorPos = start + headingMarker.length + 10;
        }
        break;
      case 'heading':
        if (selectedText) {
          newText = `${beforeSelection}# ${selectedText}${afterSelection}`;
          newCursorPos = start + 2 + selectedText.length;
        } else {
          newText = `${beforeSelection}# Heading${afterSelection}`;
          newCursorPos = start + 9;
        }
        break;
      case 'bold':
        if (selectedText) {
          newText = `${beforeSelection}**${selectedText}**${afterSelection}`;
          newCursorPos = start + 2 + selectedText.length + 2;
        } else {
          newText = `${beforeSelection}**bold text**${afterSelection}`;
          newCursorPos = start + 12;
        }
        break;
      case 'italic':
        if (selectedText) {
          newText = `${beforeSelection}*${selectedText}*${afterSelection}`;
          newCursorPos = start + 1 + selectedText.length + 1;
        } else {
          newText = `${beforeSelection}*italic text*${afterSelection}`;
          newCursorPos = start + 13;
        }
        break;
      case 'blockquote':
        if (selectedText) {
          newText = `${beforeSelection}> ${selectedText}${afterSelection}`;
          newCursorPos = start + 2 + selectedText.length;
        } else {
          newText = `${beforeSelection}> Blockquote${afterSelection}`;
          newCursorPos = start + 12;
        }
        break;
      case 'link':
        if (selectedText) {
          newText = `${beforeSelection}[${selectedText}](url)${afterSelection}`;
          newCursorPos = start + selectedText.length + 3;
        } else {
          newText = `${beforeSelection}[link text](url)${afterSelection}`;
          newCursorPos = start + 12;
        }
        break;
      case 'image':
        if (selectedText) {
          newText = `${beforeSelection}![${selectedText}](image-url)${afterSelection}`;
          newCursorPos = start + selectedText.length + 13;
        } else {
          newText = `${beforeSelection}![alt text](image-url)${afterSelection}`;
          newCursorPos = start + 21;
        }
        break;
      case 'code':
        if (selectedText) {
          newText = `${beforeSelection}\`\`\`\n${selectedText}\n\`\`\`${afterSelection}`;
          newCursorPos = start + 4 + selectedText.length + 4;
        } else {
          newText = `${beforeSelection}\`\`\`\ncode block\n\`\`\`${afterSelection}`;
          newCursorPos = start + 15;
        }
        break;
      case 'inlineCode':
        if (selectedText) {
          newText = `${beforeSelection}\`${selectedText}\`${afterSelection}`;
          newCursorPos = start + 1 + selectedText.length + 1;
        } else {
          newText = `${beforeSelection}\`inline code\`${afterSelection}`;
          newCursorPos = start + 13;
        }
        break;
      case 'ul':
        if (selectedText) {
          const lines = selectedText.split('\n');
          const listItems = lines.map(line => `- ${line}`).join('\n');
          newText = `${beforeSelection}${listItems}${afterSelection}`;
          newCursorPos = start + listItems.length;
        } else {
          newText = `${beforeSelection}- List item${afterSelection}`;
          newCursorPos = start + 11;
        }
        break;
      case 'ol':
        if (selectedText) {
          const lines = selectedText.split('\n');
          const listItems = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
          newText = `${beforeSelection}${listItems}${afterSelection}`;
          newCursorPos = start + listItems.length;
        } else {
          newText = `${beforeSelection}1. List item${afterSelection}`;
          newCursorPos = start + 12;
        }
        break;
      case 'hr':
        newText = `${beforeSelection}\n---\n${afterSelection}`;
        newCursorPos = start + 5;
        break;
      case 'copy':
        navigator.clipboard.writeText(markdownText)
          .then(() => {
            toast({
              title: "Copied to clipboard",
              description: "Markdown content has been copied to your clipboard.",
              duration: 2000,
            });
          })
          .catch(err => {
            toast({
              title: "Failed to copy",
              description: "Could not copy to clipboard: " + err.message,
              variant: "destructive",
              duration: 2000,
            });
          });
        return;
      case 'clear':
        if (window.confirm('Are you sure you want to clear the editor?')) {
          newText = '';
          newCursorPos = 0;
        } else {
          return;
        }
        break;
      case 'undo':
        performUndo();
        return;
      case 'redo':
        performRedo();
        return;
      case 'export':
      case 'download':
        // We'll use openDownloadDialog in the component
        return;
      case 'import':
        // Trigger file input click
        document.getElementById('markdown-file-input')?.click();
        return;
      case 'importFile':
        importMarkdownFile(value);
        return;
      case 'togglePreview':
        setIsPreviewMode(!isPreviewMode);
        return;
      case 'fullscreen':
        toggleFullscreen();
        return;
      default:
        return;
    }

    setMarkdownText(newText);
    
    // Update the onChange handler if provided
    if (onChange) {
      onChange(newText);
    }
    
    // Set focus back to textarea and cursor position after state update
    if (!isPreviewMode) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = newCursorPos;
          textareaRef.current.selectionEnd = newCursorPos;
        }
      }, 0);
    }
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
    history,
    historyIndex
  };
}
