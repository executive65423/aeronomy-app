# Aeronomy Website

A comprehensive platform focused on sustainable aviation fuel (SAF) financing, analytics, and enterprise solutions.

## Features

- AI-Driven Price Forecasting
- Dynamic Hedging Solutions
- ABS Financing for Sustainable Growth
- Advanced Analytics & Real-Time Insights
- Dark mode support
- Interactive savings calculator
- Responsive design for all devices
- Minimalist sustainability-themed Resources page

## Technologies Used

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation

## Getting Started

### Development

To start the development server:

1. Double-click on `dev.bat` or run it from command prompt
2. The server will start at http://localhost:3002

### Production Deployment

To build and run the production version:

1. Double-click on `build.bat` or run it from command prompt
2. The server will build the application and start at http://localhost:3002

### Manual Setup (if batch files don't work)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/pages` - Page components
    - `/products` - Product-specific pages
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point
- `/public` - Static assets
  - `/resources` - PDF resources and documents
    - `/whitepapers` - Industry reports and whitepapers
    - `/case-studies` - Case studies and success stories
    - `/guides` - How-to guides and educational materials
    - `/presentations` - Presentation slides and webinar materials
    - `resources.json` - Metadata for all resources
- `/dist` - Production build output

## Adding Resources

To add new resources to the Resources page:

1. Add your PDF file to the appropriate subfolder in `/public/resources/`
2. Update the `resources.json` file with the resource metadata following this format:

```json
{
  "id": "unique-resource-id",
  "title": "Resource Title",
  "type": "whitepaper|case-study|guide|presentation",
  "description": "Brief description of the resource",
  "thumbnail": "/images/resources/thumbnail.jpg", 
  "path": "/resources/type/filename.pdf",
  "date": "YYYY-MM-DD",
  "tags": ["Tag1", "Tag2"],
  "featured": true|false
}
```

3. The resource will automatically appear on the Resources page

## Performance Optimizations

- Code splitting with React.lazy
- Optimized component rendering with useMemo and useCallback
- Production build optimizations in Vite configuration
- Compression middleware for Express server 