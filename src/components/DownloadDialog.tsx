import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import html2pdf from 'html-to-pdf-js';

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  markdownContent: string;
  previewHtml?: string;
}

const DownloadDialog: React.FC<DownloadDialogProps> = ({ 
  open, 
  onOpenChange, 
  markdownContent,
  previewHtml = ''
}) => {
  const [fileName, setFileName] = useState('document');
  const [fileType, setFileType] = useState('md');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      setIsProcessing(true);
      
      if (fileType === 'pdf') {
        // For PDF, convert the HTML preview to PDF
        if (!previewHtml) {
          throw new Error("Preview HTML is required for PDF export");
        }
        
        // Create a temporary div to hold the preview HTML
        const tempDiv = document.createElement('div');
        // Use simplified classes to avoid theme conflicts
        tempDiv.className = 'pdf-export';
        tempDiv.innerHTML = previewHtml;
        
        // Ensure light theme with high contrast for all elements
        tempDiv.style.color = '#000000';
        tempDiv.style.backgroundColor = '#ffffff';
        tempDiv.style.fontFamily = 'Arial, sans-serif';
        tempDiv.style.padding = '20px';
        tempDiv.style.maxWidth = '210mm';
        tempDiv.style.margin = '0 auto';
        
        // Fix tables background and text
        const tables = tempDiv.querySelectorAll('table');
        tables.forEach(table => {
          table.style.borderCollapse = 'collapse';
          table.style.width = '100%';
          table.style.marginBottom = '1rem';
          
          const cells = table.querySelectorAll('th, td');
          cells.forEach(cell => {
            cell.style.border = '1px solid #ddd';
            cell.style.padding = '8px';
            cell.style.color = '#000000';
            cell.style.backgroundColor = '#ffffff';
          });
          
          const rows = table.querySelectorAll('tr');
          rows.forEach(row => {
            row.style.backgroundColor = '#ffffff';
          });
        });
        
        // Fix headings
        const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          heading.style.color = '#000000';
          heading.style.fontWeight = 'bold';
        });
        
        // Fix code blocks
        const codeBlocks = tempDiv.querySelectorAll('pre, code');
        codeBlocks.forEach(block => {
          block.style.backgroundColor = '#f5f5f5';
          block.style.color = '#333333';
          block.style.fontFamily = 'monospace';
        });
        
        document.body.appendChild(tempDiv);
        
        try {
          // Create a PDF blob instead of directly saving
          const opt = {
            margin: 10,
            filename: `${fileName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          };
          
          // Generate PDF as blob
          const pdfBlob = await html2pdf().from(tempDiv).set(opt).outputPdf('blob');
          
          // Create download link from blob
          const url = URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${fileName}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          toast({
            title: "PDF download successful",
            description: "Your PDF file has been downloaded.",
            duration: 2000,
          });
        } catch (pdfError) {
          console.error('PDF generation error:', pdfError);
          throw pdfError;
        } finally {
          // Clean up temporary element
          document.body.removeChild(tempDiv);
        }
      } else {
        // For Markdown, download as before
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
      }
      
      setIsProcessing(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Download error:', error);
      setIsProcessing(false);
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
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleDownload} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Download'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
