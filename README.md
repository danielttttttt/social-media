# Campus Connect Feed Sample

This is a sample implementation of the Campus Connect feed page built with Next.js and Tailwind CSS, designed to match the exact layout and styling of the main Campus Connect application.

## Features

- **Exact Design Match**: Replicates the main Campus Connect feed page design
- **Responsive Layout**: Three-column layout with left sidebar, main feed, and right sidebar
- **Category Filtering**: Sidebar-style category filter matching the main design
- **Interactive Posts**: Like and comment functionality with user avatars and category tags
- **Trending Sidebar**: "Trending Now" section with numbered trending posts
- **Floating Action Button**: Blue plus button for quick post creation
- **Modern UI**: Clean, modern interface with proper spacing and shadows

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000/feed](http://localhost:3000/feed) in your browser

## Design Elements

### Layout
- **Left Sidebar**: Blue "Create Post" button and Categories section
- **Main Feed**: Posts with user avatars, category tags, content, and engagement metrics
- **Right Sidebar**: "Trending Now" section with numbered trending posts
- **Floating Action Button**: Fixed bottom-right blue plus button

### Styling
- **Colors**: Blue primary (#3B82F6), gray backgrounds and text
- **Typography**: Proper font weights and sizes matching the main design
- **Shadows**: Subtle shadows on cards and buttons
- **Spacing**: Consistent padding and margins throughout

## Project Structure

```
sample/
├── components/
│   ├── feed/
│   │   ├── CategoryFilter.js    # Sidebar-style category filter
│   │   ├── PostCard.js          # Post with avatar and category tag
│   │   ├── PostSkeleton.js      # Loading skeleton
│   │   ├── TrendingSidebar.js   # Trending posts with numbers
│   │   └── index.js             # Main feed layout
│   ├── ui/
│   │   └── Button.js            # Reusable button component
│   └── Navbar.js                # Navigation with Campus Connect branding
├── pages/
│   ├── api/
│   │   └── posts.js             # Mock API matching main page data
│   ├── feed.js                  # Feed page
│   └── _app.js                  # App configuration
└── styles/
    └── globals.css              # Global styles
```

## Technologies Used

- **Next.js 13**: React framework
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library (minimal usage)
- **React Icons**: Icon library
- **Next.js Image**: Optimized image component
