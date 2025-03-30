import React from 'react';
import { X, ExternalLink, BookOpen, Search, Focus, Download, Copy, Edit, List, Code, HelpCircle, FileUp, Image, Link as LinkIcon, Target, Layout, Quote, Bold, Heading } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AppGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppGuide({ open, onOpenChange }: AppGuideProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-auto">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Markdown Editor Guide
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          </div>
          <DialogDescription>
            A comprehensive guide to using all features of the Markdown Editor
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="getting-started">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="shortcuts">Keyboard Shortcuts</TabsTrigger>
            <TabsTrigger value="markdown">Markdown Guide</TabsTrigger>
          </TabsList>
          
          {/* Getting Started Tab */}
          <TabsContent value="getting-started" className="space-y-4">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h3>Welcome to the Markdown Editor</h3>
              <p>
                This elegant markdown editor is designed to provide a clean, distraction-free writing environment 
                with powerful features to enhance your writing experience.
              </p>
              
              <h4>What is Markdown?</h4>
              <p>
                Markdown is a lightweight markup language that allows you to format text using simple, easy-to-read 
                symbols. For example, you can create headings using the hash symbol (#), make text <strong>bold</strong> using 
                double asterisks, or create <em>italic</em> text with single asterisks.
              </p>
              
              <h4>How to Use This Editor</h4>
              <ol>
                <li><strong>Write content</strong> in the editor panel using Markdown syntax</li>
                <li><strong>Format text</strong> using the toolbar buttons or keyboard shortcuts</li>
                <li><strong>Preview</strong> your formatted content by toggling to Preview mode</li>
                <li><strong>Save</strong> your work by downloading it or copy to clipboard</li>
              </ol>
              
              <h4>Basic Interface Elements</h4>
              <ul>
                <li><strong>Toolbar</strong> - Contains formatting options and tools</li>
                <li><strong>Editor Panel</strong> - Where you write your Markdown</li>
                <li><strong>Preview Toggle</strong> - Switch between writing and preview modes</li>
                <li><strong>Status Bar</strong> - Shows word count and other document information</li>
              </ul>
              
              <div className="bg-muted p-4 rounded-md mt-4">
                <h4 className="mt-0">Pro Tip</h4>
                <p className="mb-0">
                  Click the "Markdown Cheatsheet" button in the toolbar to see a quick reference guide for 
                  Markdown syntax at any time.
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* Features Tab */}
          <TabsContent value="features">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="editing">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Edit className="h-5 w-5 text-primary" />
                    Basic Editing and Formatting
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    The editor provides various formatting tools through the toolbar:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Headings</strong> - Create headings of different levels (H1-H6)</li>
                    <li><strong>Text formatting</strong> - Bold, italic, and blockquote options</li>
                    <li><strong>Lists</strong> - Create bullet, numbered, and task lists</li>
                    <li><strong>Links and images</strong> - Insert hyperlinks and embed images</li>
                    <li><strong>Code</strong> - Insert inline code or code blocks with syntax highlighting</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="preview">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Preview Mode
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Toggle between Edit and Preview modes to see how your markdown will appear when formatted:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Click the "Preview" tab or use <code>Ctrl+P</code> to switch to Preview mode</li>
                    <li>Click the "Write" tab to return to editing</li>
                    <li>Preview mode shows your content exactly as it will appear when exported</li>
                    <li>Links are clickable in preview mode</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="focus">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Focus className="h-5 w-5 text-primary" />
                    Focus Mode
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Focus mode provides a distraction-free writing environment:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Click the focus icon in the toolbar or press <code>Ctrl+Shift+F</code></li>
                    <li>Centers your content for easier reading and less eye strain</li>
                    <li>Reduces width of content area for optimal line length</li>
                    <li>Press <code>Escape</code> to exit focus mode</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="toc">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <List className="h-5 w-5 text-primary" />
                    Table of Contents
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    The Table of Contents provides a navigation overview of your document:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Click the Table of Contents icon or press <code>Ctrl+Alt+T</code></li>
                    <li>Automatically generates a list of all headings in your document</li>
                    <li>Click any heading to jump to that section</li>
                    <li>Updates in real-time as you add or remove headings</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="search">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Search and Replace
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Search and replace functionality helps you find and modify text:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Click the search icon or press <code>Ctrl+Alt+F</code></li>
                    <li>Enter text to search in your document</li>
                    <li>Optionally enter replacement text</li>
                    <li>Use "Replace" to replace the current instance or "Replace All" for all instances</li>
                    <li>Case-sensitive and whole word matching options available</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="word-goal">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Word Goal Tracking
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Set and track writing goals to boost your productivity:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Click "Set word goal" in the status bar</li>
                    <li>Enter your target word count</li>
                    <li>Progress bar shows how close you are to reaching your goal</li>
                    <li>When you reach your goal, a congratulations dialog appears</li>
                    <li>Goals are saved between sessions</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="image-handling">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Image className="h-5 w-5 text-primary" />
                    Image Handling
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Add images to your documents easily:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Click the image icon or press <code>Ctrl+Alt+I</code></li>
                    <li>Drag and drop images directly onto the editor</li>
                    <li>Paste images from your clipboard</li>
                    <li>Images are converted to base64 data and embedded in your document</li>
                    <li>No need for external hosting or links</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="export">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Export and Saving
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Save and export your work in different formats:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Click the download button or press <code>Ctrl+S</code></li>
                    <li>Export as Markdown (.md) file</li>
                    <li>Export as HTML file with formatting preserved</li>
                    <li>Copy all content to clipboard</li>
                    <li>Auto-saving to browser storage happens automatically</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="import">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <FileUp className="h-5 w-5 text-primary" />
                    Importing Documents
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Import existing markdown files:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Click the import button in the document actions menu</li>
                    <li>Select a .md file from your device</li>
                    <li>Content will be loaded into the editor</li>
                    <li>Warning: Importing a new file will replace the current content</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          {/* Keyboard Shortcuts Tab */}
          <TabsContent value="shortcuts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Text Formatting</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Bold Text</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+B</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Italic Text</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+I</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Insert Link</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+K</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Insert Image</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Alt+I</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Blockquote</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Q</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Inline Code</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+E</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Code Block</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Shift+C</kbd>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Headings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Heading 1</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+1</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Heading 2</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+2</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Heading 3</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+3</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Heading 4</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+4</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Heading 5</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+5</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Heading 6</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+6</kbd>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Lists</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Bullet List</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+U</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Numbered List</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+O</kbd>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Editor Controls</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Undo</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Z</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Redo</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Y</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Save/Export</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+S</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Toggle Preview</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+P</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Fullscreen</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">F11</kbd>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Special Features</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Focus Mode</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Shift+F</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Search & Replace</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Alt+F</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Table of Contents</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Alt+T</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Markdown Cheatsheet</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Alt+H</kbd>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Markdown Guide Tab */}
          <TabsContent value="markdown">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Heading className="h-5 w-5 text-primary" />
                    Headers
                  </h3>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                    # Heading 1{'\n'}
                    ## Heading 2{'\n'}
                    ### Heading 3{'\n'}
                    #### Heading 4{'\n'}
                    ##### Heading 5{'\n'}
                    ###### Heading 6
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Bold className="h-5 w-5 text-primary" />
                    Emphasis
                  </h3>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                    *Italic text* or _Italic text_{'\n'}
                    **Bold text** or __Bold text__{'\n'}
                    ~~Strikethrough text~~
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <List className="h-5 w-5 text-primary" />
                    Lists
                  </h3>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                    - Unordered item{'\n'}
                    - Another item{'\n'}
                    {'  '}- Nested item{'\n\n'}
                    1. Ordered item{'\n'}
                    2. Second item{'\n'}
                    3. Third item{'\n\n'}
                    - [ ] Task (unchecked){'\n'}
                    - [x] Task (checked)
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-primary" />
                    Links & Images
                  </h3>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                    [Link text](https://www.example.com){'\n'}
                    [Link with title](https://www.example.com "Title"){'\n\n'}
                    ![Alt text](image.jpg){'\n'}
                    ![Alt with title](image.jpg "Title")
                  </pre>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Code
                  </h3>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                    `Inline code`{'\n\n'}
                    ```{'\n'}
                    Code block{'\n'}
                    No syntax highlighting{'\n'}
                    ```{'\n\n'}
                    ```javascript{'\n'}
                    // Code with syntax highlighting{'\n'}
                    function greet(name) {'{'}
                    {'\n'}  console.log(`Hello, ${'{'}name{'}'}`);{'\n'}
                    {'}'}{'\n'}
                    ```
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Quote className="h-5 w-5 text-primary" />
                    Blockquotes & Dividers
                  </h3>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                    {'> This is a blockquote\n'}
                    {'> It can span multiple lines\n\n'}
                    {'> Nested blockquotes\n'}
                    {'>> Second level\n'}
                    {'>>> Third level\n\n'}
                    {'---\n'}
                    {'Horizontal rule (divider)'}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Layout className="h-5 w-5 text-primary" />
                    Tables
                  </h3>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                    | Header 1 | Header 2 |{'\n'}
                    | -------- | -------- |{'\n'}
                    | Cell 1   | Cell 2   |{'\n'}
                    | Cell 3   | Cell 4   |{'\n\n'}
                    | Left   | Center | Right |{'\n'}
                    |:------ |:------:| -----:|{'\n'}
                    | Align  | Align  | Align |
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Miscellaneous
                  </h3>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                    Footnote reference[^1]{'\n\n'}
                    [^1]: Footnote content here{'\n\n'}
                    *[HTML]: Hypertext Markup Language{'\n'}
                    The HTML abbreviation
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between items-center mt-4 pt-2 border-t">
          <Button 
            variant="outline" 
            className="gap-1" 
            asChild
          >
            <a href="https://www.markdownguide.org/" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} />
              Learn more about Markdown
            </a>
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close Guide</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AppGuide; 