import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { SpellCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface MarkdownTextareaProps {
  value: string;
  onChange: (text: string) => void;
  isPreviewMode: boolean;
  isFocusMode?: boolean;
  className?: string;
}

const MarkdownTextarea = forwardRef<HTMLTextAreaElement, MarkdownTextareaProps>(
  ({ value, onChange, isPreviewMode, isFocusMode = false, className }, ref) => {
    const [spellCheckEnabled, setSpellCheckEnabled] = useState(false);

    if (isPreviewMode) {
      return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    const toggleSpellCheck = () => {
      setSpellCheckEnabled(!spellCheckEnabled);
    };

    return (
      <div className="flex-1 flex flex-col relative">
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          className={cn(
            "flex-1 p-6 outline-none resize-none bg-editor-background text-editor-foreground font-mono text-sm transition-all ease-in-out duration-200 focus-ring",
            isFocusMode && "text-base leading-relaxed max-w-2xl mx-auto py-8",
            className
          )}
          placeholder="Type markdown here..."
          spellCheck={spellCheckEnabled}
        />
        <div className="absolute bottom-2 right-2 z-10">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full bg-background/80 hover:bg-background text-muted-foreground",
                  spellCheckEnabled && "text-primary"
                )}
                onClick={toggleSpellCheck}
              >
                <SpellCheck size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="glass p-2 text-xs">
              <p>
                {spellCheckEnabled ? "Disable" : "Enable"} Spell Check
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  }
);

MarkdownTextarea.displayName = 'MarkdownTextarea';

export default MarkdownTextarea;
