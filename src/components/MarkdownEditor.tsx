
import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { cn } from '@/lib/utils';
import EditorToolbar from './EditorToolbar';
import { useToast } from "@/components/ui/use-toast";

// Configure marked with highlight.js for code syntax highlighting
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true,
});

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
  const [markdownText, setMarkdownText] = useState(initialValue);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const parsedHtml = marked.parse(markdownText);
      setHtmlOutput(parsedHtml);
      onChange?.(markdownText);
    } catch (error) {
      console.error('Error parsing markdown:', error);
    }
  }, [markdownText, onChange]);

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
    
    // Set focus back to textarea and cursor position after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = newCursorPos;
        textareaRef.current.selectionEnd = newCursorPos;
      }
    }, 0);
  };

  return (
    <div className={cn('w-full h-full flex flex-col bg-background rounded-lg animate-fade-in', className)}>
      <EditorToolbar onAction={handleToolbarAction} isPreviewMode={isPreviewMode} />
      
      <div className="flex-1 flex overflow-hidden rounded-b-lg bg-editor-background">
        {!isPreviewMode && (
          <textarea
            ref={textareaRef}
            value={markdownText}
            onChange={handleTextChange}
            className="flex-1 p-6 outline-none resize-none bg-editor-background text-editor-foreground font-mono text-sm transition-all ease-in-out duration-200 focus-ring"
            placeholder="Type markdown here..."
            spellCheck="false"
          />
        )}

        <div 
          className={cn(
            'prose dark:prose-invert flex-1 p-6 overflow-auto bg-white/50 dark:bg-black/10 animate-fade-in',
            isPreviewMode ? 'block' : 'hidden md:block border-l border-border/30'
          )}
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
