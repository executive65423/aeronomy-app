import React, { useEffect } from 'react';

// This component is just for generating placeholder images for the products page
// These would normally be actual images stored in the public/images directory

interface ImagePlaceholderProps {
  category: 'all' | 'analytics' | 'finance' | 'enterprise';
}

const generatePlaceholderImage = (category: string) => {
  // Color schemes for different categories
  const colors = {
    all: { bg: '#0A2342', accent: ['#00A0DC', '#4F46E5', '#10B981'] },
    analytics: { bg: '#1E40AF', accent: ['#3B82F6', '#60A5FA'] },
    finance: { bg: '#5B21B6', accent: ['#8B5CF6', '#A78BFA'] },
    enterprise: { bg: '#047857', accent: ['#10B981', '#34D399'] }
  };
  
  const color = colors[category as keyof typeof colors];
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Fill background
  ctx.fillStyle = color.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw decorative elements
  for (let i = 0; i < 5; i++) {
    const accentColor = color.accent[i % color.accent.length];
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.2 + (Math.random() * 0.3);
    
    // Draw circles or rectangles
    if (i % 2 === 0) {
      const radius = 50 + Math.random() * 150;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const width = 100 + Math.random() * 300;
      const height = 100 + Math.random() * 200;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillRect(x, y, width, height);
    }
  }
  
  // Add product name
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  
  const productNames = {
    all: 'Complete Product Suite',
    analytics: 'Aeronomics Analytica',
    finance: 'SAF-PRO',
    enterprise: 'SAF Enterprise'
  };
  
  ctx.fillText(productNames[category as keyof typeof productNames], canvas.width / 2, canvas.height / 2);
  
  // Return data URL
  return canvas.toDataURL('image/png');
};

const ImagePlaceholders: React.FC<ImagePlaceholderProps> = ({ category }) => {
  useEffect(() => {
    const imageSrc = generatePlaceholderImage(category);
    
    // Create a link element to download the image
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `product-${category}.png`;
    
    // Append to body, click to download, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [category]);
  
  return (
    <div>
      <p>Generating placeholder image for {category}...</p>
    </div>
  );
};

export default ImagePlaceholders; 