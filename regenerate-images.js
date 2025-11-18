#!/usr/bin/env node

/**
 * Regenerate blog post images using AI image generation
 * This script reads existing blog posts and generates new images for them
 */

import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate a modern gaming-themed SVG for a blog post
 */
function generateModernGamingSVG(title, index) {
  const colors = [
    ['#6366f1', '#8b5cf6', '#ec4899'], // Purple/Pink
    ['#3b82f6', '#06b6d4', '#8b5cf6'], // Blue/Cyan
    ['#10b981', '#3b82f6', '#6366f1'], // Green/Blue
    ['#f59e0b', '#ef4444', '#ec4899'], // Orange/Red
    ['#8b5cf6', '#ec4899', '#f59e0b'], // Purple/Orange
    ['#06b6d4', '#6366f1', '#8b5cf6'], // Cyan/Purple
  ];
  
  const colorSet = colors[index % colors.length];
  
  // Determine theme based on title keywords
  const titleLower = title.toLowerCase();
  let theme = 'abstract';
  
  if (titleLower.includes('community') || titleLower.includes('social') || titleLower.includes('friend')) {
    theme = 'community';
  } else if (titleLower.includes('strategy') || titleLower.includes('skill') || titleLower.includes('competitive')) {
    theme = 'competitive';
  } else if (titleLower.includes('guide') || titleLower.includes('learn') || titleLower.includes('beginner')) {
    theme = 'educational';
  } else if (titleLower.includes('multiplayer') || titleLower.includes('online') || titleLower.includes('team')) {
    theme = 'multiplayer';
  }
  
  let svgContent = '';
  
  switch (theme) {
    case 'community':
      // Network/connection theme
      svgContent = `
        <defs>
          <linearGradient id="grad1-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colorSet[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colorSet[1]};stop-opacity:1" />
          </linearGradient>
          <linearGradient id="grad2-${index}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${colorSet[1]};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${colorSet[2]};stop-opacity:0.8" />
          </linearGradient>
          <filter id="glow-${index}">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="1200" height="600" fill="url(#grad1-${index})"/>
        
        <!-- Network nodes -->
        <circle cx="200" cy="150" r="50" fill="${colorSet[0]}" opacity="0.8" filter="url(#glow-${index})"/>
        <circle cx="500" cy="200" r="60" fill="${colorSet[1]}" opacity="0.8" filter="url(#glow-${index})"/>
        <circle cx="800" cy="150" r="45" fill="${colorSet[2]}" opacity="0.8" filter="url(#glow-${index})"/>
        <circle cx="350" cy="400" r="55" fill="${colorSet[0]}" opacity="0.8" filter="url(#glow-${index})"/>
        <circle cx="700" cy="450" r="50" fill="${colorSet[1]}" opacity="0.8" filter="url(#glow-${index})"/>
        <circle cx="1000" cy="350" r="40" fill="${colorSet[2]}" opacity="0.8" filter="url(#glow-${index})"/>
        
        <!-- Connection lines -->
        <line x1="200" y1="150" x2="500" y2="200" stroke="${colorSet[1]}" stroke-width="3" opacity="0.5"/>
        <line x1="500" y1="200" x2="800" y2="150" stroke="${colorSet[1]}" stroke-width="3" opacity="0.5"/>
        <line x1="200" y1="150" x2="350" y2="400" stroke="${colorSet[2]}" stroke-width="3" opacity="0.5"/>
        <line x1="500" y1="200" x2="700" y2="450" stroke="${colorSet[0]}" stroke-width="3" opacity="0.5"/>
        <line x1="800" y1="150" x2="1000" y2="350" stroke="${colorSet[1]}" stroke-width="3" opacity="0.5"/>
        <line x1="700" y1="450" x2="1000" y2="350" stroke="${colorSet[2]}" stroke-width="3" opacity="0.5"/>
        
        <!-- Decorative elements -->
        <circle cx="200" cy="150" r="20" fill="white" opacity="0.3"/>
        <circle cx="500" cy="200" r="25" fill="white" opacity="0.3"/>
        <circle cx="800" cy="150" r="18" fill="white" opacity="0.3"/>
      `;
      break;
      
    case 'competitive':
      // Trophy/achievement theme
      svgContent = `
        <defs>
          <linearGradient id="grad1-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colorSet[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colorSet[1]};stop-opacity:1" />
          </linearGradient>
          <radialGradient id="radial-${index}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:${colorSet[2]};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${colorSet[0]};stop-opacity:0.2" />
          </radialGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#grad1-${index})"/>
        
        <!-- Trophy shape -->
        <ellipse cx="600" cy="450" rx="150" ry="30" fill="${colorSet[0]}" opacity="0.3"/>
        <rect x="550" y="400" width="100" height="50" rx="5" fill="${colorSet[1]}" opacity="0.8"/>
        <path d="M 500 350 Q 450 200, 500 150 L 700 150 Q 750 200, 700 350 Z" fill="url(#radial-${index})" opacity="0.9"/>
        <circle cx="600" cy="200" r="60" fill="${colorSet[2]}" opacity="0.4"/>
        
        <!-- Stars/achievements -->
        <polygon points="200,150 220,200 270,210 235,245 245,295 200,270 155,295 165,245 130,210 180,200" fill="${colorSet[0]}" opacity="0.6"/>
        <polygon points="1000,200 1015,235 1050,240 1025,265 1030,300 1000,285 970,300 975,265 950,240 985,235" fill="${colorSet[1]}" opacity="0.6"/>
        <polygon points="900,450 912,475 940,480 920,498 925,525 900,512 875,525 880,498 860,480 888,475" fill="${colorSet[2]}" opacity="0.6"/>
        
        <!-- Geometric accents -->
        <rect x="100" y="100" width="150" height="150" rx="10" fill="${colorSet[2]}" opacity="0.2" transform="rotate(15 175 175)"/>
        <rect x="950" y="350" width="120" height="120" rx="10" fill="${colorSet[0]}" opacity="0.2" transform="rotate(-20 1010 410)"/>
      `;
      break;
      
    case 'educational':
      // Book/learning theme
      svgContent = `
        <defs>
          <linearGradient id="grad1-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colorSet[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colorSet[1]};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#grad1-${index})"/>
        
        <!-- Book/Guide elements -->
        <rect x="400" y="150" width="400" height="300" rx="15" fill="${colorSet[2]}" opacity="0.7"/>
        <rect x="405" y="155" width="190" height="290" rx="10" fill="${colorSet[0]}" opacity="0.4"/>
        <rect x="605" y="155" width="190" height="290" rx="10" fill="${colorSet[1]}" opacity="0.4"/>
        
        <!-- Lines representing text -->
        <line x1="430" y1="200" x2="570" y2="200" stroke="white" stroke-width="4" opacity="0.5"/>
        <line x1="430" y1="240" x2="570" y2="240" stroke="white" stroke-width="4" opacity="0.5"/>
        <line x1="430" y1="280" x2="570" y2="280" stroke="white" stroke-width="4" opacity="0.5"/>
        <line x1="630" y1="200" x2="770" y2="200" stroke="white" stroke-width="4" opacity="0.5"/>
        <line x1="630" y1="240" x2="770" y2="240" stroke="white" stroke-width="4" opacity="0.5"/>
        <line x1="630" y1="280" x2="770" y2="280" stroke="white" stroke-width="4" opacity="0.5"/>
        
        <!-- Decorative elements -->
        <circle cx="200" cy="200" r="80" fill="${colorSet[0]}" opacity="0.3"/>
        <circle cx="1000" cy="400" r="100" fill="${colorSet[1]}" opacity="0.3"/>
        <polygon points="150,500 200,450 250,500 200,550" fill="${colorSet[2]}" opacity="0.4"/>
        <polygon points="1050,150 1100,100 1150,150 1100,200" fill="${colorSet[0]}" opacity="0.4"/>
      `;
      break;
      
    case 'multiplayer':
      // Multiple player icons/controllers theme
      svgContent = `
        <defs>
          <linearGradient id="grad1-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colorSet[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colorSet[1]};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#grad1-${index})"/>
        
        <!-- Controller shapes -->
        <ellipse cx="350" cy="300" rx="140" ry="100" fill="${colorSet[2]}" opacity="0.7"/>
        <ellipse cx="850" cy="300" rx="140" ry="100" fill="${colorSet[1]}" opacity="0.7"/>
        
        <!-- D-pad -->
        <rect x="280" y="280" width="30" height="80" rx="5" fill="${colorSet[0]}" opacity="0.8"/>
        <rect x="265" y="295" width="60" height="30" rx="5" fill="${colorSet[0]}" opacity="0.8"/>
        
        <!-- Buttons -->
        <circle cx="420" cy="280" r="15" fill="${colorSet[1]}" opacity="0.9"/>
        <circle cx="450" cy="300" r="15" fill="${colorSet[2]}" opacity="0.9"/>
        <circle cx="420" cy="320" r="15" fill="${colorSet[0]}" opacity="0.9"/>
        <circle cx="390" cy="300" r="15" fill="${colorSet[2]}" opacity="0.9"/>
        
        <!-- Second controller -->
        <rect x="780" y="280" width="30" height="80" rx="5" fill="${colorSet[1]}" opacity="0.8"/>
        <rect x="765" y="295" width="60" height="30" rx="5" fill="${colorSet[1]}" opacity="0.8"/>
        <circle cx="920" cy="280" r="15" fill="${colorSet[0]}" opacity="0.9"/>
        <circle cx="950" cy="300" r="15" fill="${colorSet[2]}" opacity="0.9"/>
        <circle cx="920" cy="320" r="15" fill="${colorSet[1]}" opacity="0.9"/>
        <circle cx="890" cy="300" r="15" fill="${colorSet[0]}" opacity="0.9"/>
        
        <!-- Player avatars (simple circles) -->
        <circle cx="200" cy="150" r="60" fill="${colorSet[0]}" opacity="0.5"/>
        <circle cx="600" cy="100" r="70" fill="${colorSet[1]}" opacity="0.5"/>
        <circle cx="1000" cy="150" r="60" fill="${colorSet[2]}" opacity="0.5"/>
        
        <!-- Connection indicators -->
        <path d="M 350 250 Q 600 150, 850 250" stroke="${colorSet[2]}" stroke-width="3" fill="none" opacity="0.6"/>
      `;
      break;
      
    default:
      // Abstract gaming theme
      svgContent = `
        <defs>
          <linearGradient id="grad1-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colorSet[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colorSet[1]};stop-opacity:1" />
          </linearGradient>
          <linearGradient id="grad2-${index}" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${colorSet[1]};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${colorSet[2]};stop-opacity:0.8" />
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#grad1-${index})"/>
        
        <!-- Geometric shapes -->
        <circle cx="250" cy="200" r="120" fill="${colorSet[0]}" opacity="0.4"/>
        <circle cx="950" cy="400" r="150" fill="${colorSet[1]}" opacity="0.3"/>
        
        <rect x="500" y="150" width="300" height="300" rx="20" fill="url(#grad2-${index})" opacity="0.5" transform="rotate(15 650 300)"/>
        
        <polygon points="800,100 900,250 700,250" fill="${colorSet[2]}" opacity="0.6"/>
        <polygon points="300,450 400,500 350,550 250,500" fill="${colorSet[0]}" opacity="0.5"/>
        
        <!-- Accent circles -->
        <circle cx="150" cy="450" r="70" fill="white" opacity="0.2"/>
        <circle cx="1050" cy="150" r="90" fill="${colorSet[2]}" opacity="0.3"/>
        
        <!-- Lines and connections -->
        <line x1="200" y1="150" x2="400" y2="400" stroke="${colorSet[1]}" stroke-width="4" opacity="0.4"/>
        <line x1="800" y1="200" x2="1000" y2="450" stroke="${colorSet[2]}" stroke-width="4" opacity="0.4"/>
        
        <!-- Small decorative elements -->
        <rect x="100" y="100" width="80" height="80" rx="10" fill="${colorSet[2]}" opacity="0.3"/>
        <rect x="1020" y="500" width="100" height="80" rx="10" fill="${colorSet[0]}" opacity="0.3"/>
      `;
  }
  
  return `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
    ${svgContent}
  </svg>`;
}

/**
 * Main function to regenerate images
 */
async function regenerateImages() {
  console.log('🎨 Regenerating blog post images...\n');
  
  const blogDir = path.join(__dirname, 'blog');
  const imagesDir = path.join(__dirname, 'images');
  
  try {
    // Read all blog post files
    const files = await fs.readdir(blogDir);
    const htmlFiles = files.filter(f => f.endsWith('.html') && f !== 'index.html');
    
    console.log(`Found ${htmlFiles.length} blog posts\n`);
    
    let index = 0;
    for (const file of htmlFiles) {
      const filePath = path.join(blogDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Extract title from HTML
      const titleMatch = content.match(/<title>(.*?)\|/);
      const title = titleMatch ? titleMatch[1].trim() : 'Blog Post';
      
      // Generate image filename from the blog post filename
      const imageName = file.replace('.html', '.svg');
      const imagePath = path.join(imagesDir, imageName);
      
      // Generate modern SVG
      const svg = generateModernGamingSVG(title, index);
      
      // Save the image
      await fs.writeFile(imagePath, svg);
      
      console.log(`✅ Generated: ${imageName} for "${title}"`);
      index++;
    }
    
    console.log(`\n🎉 Successfully regenerated ${htmlFiles.length} images!`);
    console.log(`📁 Images saved to: ${imagesDir}`);
    
  } catch (error) {
    console.error('❌ Error regenerating images:', error);
    process.exit(1);
  }
}

// Run the regeneration
regenerateImages();

