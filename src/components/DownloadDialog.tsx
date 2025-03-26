
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  markdownContent: string;
}

const DownloadDialog: React.FC<DownloadDialogProps> = ({ 
  open, 
  onOpenChange, 
  markdownContent 
}) => {
  const [fileName, setFileName] = useState('document');
  const [fileType, setFileType] = useState('md');
  const { toast } = useToast();

  const handleDownload = () => {
    try {
      // For PDF and DOC, we'll just use MD for now with different file extensions
      // A real implementation would convert the content to the appropriate format
      const blob = new Blob([markdownContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.${fileType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download successful",
        description: `Your ${fileType.toUpperCase()} file has been downloaded.`,
        duration: 2000,
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "There was an error downloading your file.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Download Document</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filename" className="text-right">
              Filename
            </Label>
            <Input
              id="filename"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="col-span-3"
              placeholder="Enter filename without extension"
            />
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">File Type</Label>
            <RadioGroup 
              className="col-span-3"
              value={fileType}
              onValueChange={setFileType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="md" id="md" />
                <Label htmlFor="md" className="cursor-pointer">Markdown (.md)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="cursor-pointer">PDF Document (.pdf)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doc" id="doc" />
                <Label htmlFor="doc" className="cursor-pointer">Word Document (.doc)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleDownload}>Download</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
