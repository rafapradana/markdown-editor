import React, { useRef, useEffect } from 'react';

interface TypewriterModeProps {
  isActive: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export function TypewriterMode({ isActive, textareaRef }: TypewriterModeProps) {
  const lastScrollPosition = useRef<number>(0);

  useEffect(() => {
    if (!isActive || !textareaRef.current) return;

    const textarea = textareaRef.current;
    
    // Function to center the cursor position
    const centerCursor = () => {
      if (!textarea) return;
      
      // Get the current cursor position
      const selectionStart = textarea.selectionStart;
      
      // Get the text up to the cursor position
      const textUpToCursor = textarea.value.substring(0, selectionStart);
      
      // Create a temporary element to measure the height
      const temp = document.createElement('textarea');
      temp.style.position = 'absolute';
      temp.style.top = '-9999px';
      temp.style.left = '-9999px';
      temp.style.width = `${textarea.clientWidth}px`;
      temp.style.height = 'auto';
      temp.style.font = window.getComputedStyle(textarea).font;
      temp.style.lineHeight = window.getComputedStyle(textarea).lineHeight;
      temp.style.resize = 'none';
      temp.value = textUpToCursor;
      
      document.body.appendChild(temp);
      
      // Measure the height of the text up to the cursor
      const cursorHeight = temp.scrollHeight;
      
      // Clean up the temporary element
      document.body.removeChild(temp);
      
      // Scroll to center the cursor
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
      const desiredScrollPosition = Math.max(0, cursorHeight - textarea.clientHeight / 2 + lineHeight / 2);
      
      // Only scroll if needed
      if (Math.abs(textarea.scrollTop - desiredScrollPosition) > lineHeight / 2) {
        textarea.scrollTop = desiredScrollPosition;
        lastScrollPosition.current = desiredScrollPosition;
      }
    };

    // Event listeners
    const handleKeyUp = () => centerCursor();
    const handleClick = () => centerCursor();
    
    // Add event listeners
    textarea.addEventListener('keyup', handleKeyUp);
    textarea.addEventListener('click', handleClick);
    
    // Center cursor on initial render
    centerCursor();
    
    // Clean up
    return () => {
      textarea.removeEventListener('keyup', handleKeyUp);
      textarea.removeEventListener('click', handleClick);
    };
  }, [isActive, textareaRef]);

  // This component doesn't render anything
  return null;
}

export default TypewriterMode; 