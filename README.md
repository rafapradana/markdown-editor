# Markdown Editor

A sleek, minimal Markdown editor built with React, TypeScript, and Tailwind CSS. This editor provides a distraction-free writing environment with live preview functionality.

## Features

- **Clean & Minimalist Interface**: Focus on your content with a distraction-free writing experience
- **Live Preview**: See your formatted Markdown as you type
- **Code Syntax Highlighting**: Beautiful syntax highlighting for code blocks
- **Keyboard Shortcuts**: Boost productivity with extensive keyboard shortcuts
- **Export & Download**: Save your work as Markdown files
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode Support**: Easy on the eyes in any lighting condition

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

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/markdown-editor.git
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
| F11 | Toggle fullscreen |
| ? or F1 | Open shortcuts dialog |

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
