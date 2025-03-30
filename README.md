# Markdown Editor

A sleek, minimal Markdown editor built with React, TypeScript, and Tailwind CSS. This editor provides a distraction-free writing environment with live preview functionality.

## Features

- **Clean & Minimalist Interface**: Focus on your content with a distraction-free writing experience
- **Live Preview**: See your formatted Markdown as you type
- **Code Syntax Highlighting**: Beautiful syntax highlighting for code blocks
- **Keyboard Shortcuts**: Boost productivity with extensive keyboard shortcuts
- **Export & Download**: Save your work as Markdown or HTML files
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode Support**: Easy on the eyes in any lighting condition
- **Focus Mode**: Enhanced concentration with centered content and reduced distractions
- **Table of Contents**: Auto-generated navigation for your document's headings
- **Word Goal Tracker**: Set and track writing goals with visual progress and celebrations
- **Image Support**: Drag and drop images directly into your document
- **Search & Replace**: Find and modify text throughout your document
- **Comprehensive Guide**: Built-in documentation with detailed explanations of all features

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- Marked (for Markdown parsing)
- Highlight.js (for code syntax highlighting)
- TanStack Query
- React Router DOM
- Canvas Confetti (for goal celebrations)
- Radix UI (for accessible UI components)

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/rafapradana/markdown-editor.git
cd markdown-editor
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl/⌘ + B | Bold text |
| Ctrl/⌘ + I | Italic text |
| Ctrl/⌘ + K | Add link |
| Ctrl/⌘ + Q | Blockquote |
| Ctrl/⌘ + E | Inline code |
| Ctrl/⌘ + U | Unordered list |
| Ctrl/⌘ + O | Ordered list |
| Ctrl/⌘ + Shift + C | Code block |
| Ctrl/⌘ + Alt + I | Image |
| Ctrl/⌘ + 1-6 | Headings (H1-H6) |
| Ctrl/⌘ + P | Toggle preview mode |
| Ctrl/⌘ + S | Save/download content |
| Ctrl/⌘ + Shift + F | Toggle focus mode |
| Ctrl/⌘ + Alt + F | Open search and replace |
| Ctrl/⌘ + Alt + T | Toggle table of contents |
| Ctrl/⌘ + Alt + H | Open markdown cheatsheet |
| Ctrl/⌘ + Alt + G | Open app guide |
| F11 | Toggle fullscreen |
| Esc | Exit focus mode or search/replace |

## Enhanced Features

### Focus Mode
Center your content for an optimal reading line length and reduced distractions, allowing you to concentrate better on your writing.

### Word Goal Tracking
Set writing goals for yourself and track your progress with a visual progress bar. When you reach your goal, enjoy a celebration with confetti!

### Table of Contents
Automatically generates a navigation panel based on your document's headings, making it easy to jump to different sections of your content.

### Comprehensive App Guide
Access detailed documentation about all features within the app by clicking the "Editor Guide" button or using Ctrl/⌘ + Alt + G.

### Improved Toolbar
The reorganized toolbar makes formatting options more intuitive and accessible, with clear grouping and enhanced tooltips showing keyboard shortcuts.

## Building for Production

To build the app for production:

```bash
npm run build
# or
yarn build
# or
bun build
```

The build output will be in the `dist` directory.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments

- Shadcn UI for the beautiful component library
- Marked for the powerful Markdown parsing
- Highlight.js for code syntax highlighting
- Canvas Confetti for celebration animations
- Radix UI for accessible component primitives
