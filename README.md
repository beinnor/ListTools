# ListTools Webapp

A simple web-based toolkit for working with lists. This is a frontend-only React application.

## Features

- **ListDiff Tool**: Compare two lists and see differences
  - Items in A but not in B
  - Items in B but not in A
  - Items common to both
- Four placeholder pages for future tools

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### ListDiff Tool

1. Navigate to the ListDiff page
2. Enter items in List A (comma-separated or newline-separated)
3. Enter items in List B (comma-separated or newline-separated)
4. Click "Compare Lists" to see the differences
5. Results will show:
   - Items only in List A
   - Items only in List B
   - Items common to both lists

## Technology Stack

- React 18
- React Router DOM
- Vite
- CSS3

