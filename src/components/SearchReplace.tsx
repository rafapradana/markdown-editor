import React, { useState } from 'react';
import { Search, Replace, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchReplaceProps {
  markdownText: string;
  onUpdateText: (newText: string) => void;
  onClose: () => void;
  className?: string;
}

export function SearchReplace({ markdownText, onUpdateText, onClose, className }: SearchReplaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [findCount, setFindCount] = useState(0);

  const handleSearch = () => {
    if (!searchTerm) return;
    
    let count = 0;
    let text = markdownText;
    
    // Count occurrences
    const regex = new RegExp(
      searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 
      caseSensitive ? 'g' : 'gi'
    );
    
    count = (text.match(regex) || []).length;
    setFindCount(count);
  };

  const handleReplace = () => {
    if (!searchTerm) return;
    
    let newText = markdownText;
    
    // Replace occurrences
    const regex = new RegExp(
      searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 
      caseSensitive ? 'g' : 'gi'
    );
    
    newText = newText.replace(regex, replaceTerm);
    onUpdateText(newText);
    setFindCount(0);
  };

  const handleReplaceAll = () => {
    handleReplace();
  };

  return (
    <div className={cn("p-3 border border-border rounded-md flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm font-medium">
          <Search size={14} />
          <span>Search & Replace</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={onClose}
        >
          <X size={14} />
        </Button>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 text-sm"
          />
          <Button 
            variant="secondary" 
            size="sm" 
            className="h-8 text-xs" 
            onClick={handleSearch}
          >
            Find
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Replace with" 
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            className="h-8 text-sm"
          />
          <Button 
            variant="secondary" 
            size="sm" 
            className="h-8 text-xs" 
            onClick={handleReplace}
          >
            Replace
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs">
            <input 
              type="checkbox" 
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="h-3 w-3"
            />
            Case sensitive
          </label>
          {findCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {findCount} match{findCount !== 1 ? 'es' : ''}
            </span>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs" 
          onClick={handleReplaceAll}
        >
          Replace All
        </Button>
      </div>
    </div>
  );
}

export default SearchReplace; 