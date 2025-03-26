
import React from 'react';
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
    handleToolbarAction
  } = useEditorActions(initialValue, onChange);

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
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
