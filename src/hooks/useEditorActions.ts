
import { useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function useEditorActions(
  initialValue = '# Hello, World!\n\nStart writing your markdown here...',
  onChange?: (value: string) => void
) {
  const [markdownText, setMarkdownText] = useState(initialValue);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(e.target.value);
  };

  const handleToolbarAction = (action: string, value?: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdownText.substring(start, end);
    const beforeSelection = markdownText.substring(0, start);
    const afterSelection = markdownText.substring(end);

    let newText = '';
    let newCursorPos = 0;

    switch (action) {
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
      case 'togglePreview':
        setIsPreviewMode(!isPreviewMode);
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
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = newCursorPos;
        textareaRef.current.selectionEnd = newCursorPos;
      }
    }, 0);
  };

  return {
    markdownText,
    setMarkdownText,
    isPreviewMode,
    setIsPreviewMode,
    textareaRef,
    handleTextChange,
    handleToolbarAction
  };
}
