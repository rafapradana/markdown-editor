import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageDropProps {
  onImageInsert: (imageText: string) => void;
  isActive?: boolean;
}

export function ImageDrop({ onImageInsert, isActive = true }: ImageDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showDropZone, setShowDropZone] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.types.includes('Files')) {
        setIsDragging(true);
        setShowDropZone(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setShowDropZone(false);
      
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData?.files && e.clipboardData.files.length > 0) {
        processFiles(e.clipboardData.files);
      }
    };

    // Register global events
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('paste', handlePaste);
    };
  }, [isActive, onImageInsert]);

  const processFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) return;

    setIsUploading(true);

    // Process each image file
    imageFiles.forEach(file => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          // Convert the file to a data URL
          const dataUrl = event.target.result as string;
          
          // Generate markdown image syntax
          const markdownImage = `![${file.name.replace(/\.[^/.]+$/, "")}](${dataUrl})`;
          
          // Insert the image
          onImageInsert(markdownImage);
          
          setIsUploading(false);
        }
      };
      
      reader.onerror = () => {
        console.error('Error reading file:', file.name);
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    setShowDropZone(false);
  };

  if (!isActive || !showDropZone) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div 
        ref={dropZoneRef}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-96 h-48 bg-background border-2 border-dashed rounded-lg",
          "flex flex-col items-center justify-center gap-4 p-4",
          "transition-all duration-200 pointer-events-auto shadow-lg",
          isDragging ? "border-primary scale-110" : "border-border scale-100",
          isUploading && "opacity-70"
        )}
      >
        <button 
          className="absolute right-2 top-2 text-muted-foreground hover:text-foreground" 
          onClick={handleClose}
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-3 bg-primary/10 rounded-full">
            {isUploading ? (
              <Upload size={24} className="text-primary animate-bounce" />
            ) : (
              <ImageIcon size={24} className="text-primary" />
            )}
          </div>
          <p className="text-sm font-medium">
            {isUploading ? 'Uploading...' : 'Drop images here'}
          </p>
          <p className="text-xs text-muted-foreground">
            {isUploading 
              ? 'Processing your images...'
              : 'Drag and drop images to embed in your markdown'}
          </p>
        </div>

        {!isUploading && (
          <button 
            className="text-xs text-primary hover:underline"
            onClick={handleBrowseClick}
          >
            or browse from your device
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default ImageDrop; 