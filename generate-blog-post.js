import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('❌ Error: GOOGLE_API_KEY or GEMINI_API_KEY environment variable not set');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Helper function to create slug from title
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate blog post content
async function generateBlogContent(topic, keywords = []) {
  console.log('📝 Generating blog post content...');
  
  const prompt = `Write a comprehensive, informative blog post about "${topic}" for an online gaming community website.

Requirements:
- Target audience: Gamers of all ages and skill levels
- Tone: Informative, engaging, and friendly
- Focus: Community building, skill development, and responsible gaming
- Word count: 800-1200 words
- Include specific game examples: Fortnite, Minecraft, League of Legends, Among Us, etc.
${keywords.length > 0 ? `- Include these keywords naturally: ${keywords.join(', ')}` : ''}

IMPORTANT RESTRICTIONS:
- NO gambling, casino, or real-money wagering content
- NO inappropriate content for general audiences
- Focus on entertainment, education, and community aspects
- Emphasize positive gaming experiences

Structure:
1. Introduction (engaging hook about the topic)
2. 3-4 main sections with H3 headings
3. Practical tips and examples
4. Bullet points or lists where appropriate
5. Conclusion that reinforces key points

Format: Return ONLY the HTML content (h2, h3, p, ul, li tags) without wrapping article tags.`;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text();
    return content;
  } catch (error) {
    console.error('❌ Error generating content:', error.message);
    throw error;
  }
}

// Generate meta description
async function generateMetaDescription(title, content) {
  console.log('📄 Generating meta description...');
  
  const prompt = `Based on this blog post title and content, write a compelling SEO meta description (150-160 characters):

Title: ${title}

Content preview: ${content.substring(0, 500)}

Requirements:
- Exactly 150-160 characters
- Include main keyword
- Engaging and click-worthy
- Describe what readers will learn`;

  try {
    const result = await model.generateContent(prompt);
    const description = result.response.text().trim().replace(/"/g, '');
    return description.substring(0, 160);
  } catch (error) {
    console.error('⚠️  Using default meta description');
    return `Explore ${title} in online gaming. Learn strategies, build communities, and enhance your gaming experience.`;
  }
}

// Add interlinks and external references
function addLinksToContent(content, currentSlug) {
  let updatedContent = content;
  
  // External links to add (first occurrence only)
  const externalLinks = {
    'Fortnite': 'https://www.epicgames.com/fortnite/',
    'Minecraft': 'https://www.minecraft.net/',
    'League of Legends': 'https://www.leagueoflegends.com/',
    'Among Us': 'https://www.innersloth.com/games/among-us/',
    'Discord': 'https://discord.com/',
    'Twitch': 'https://www.twitch.tv/',
    'Steam': 'https://store.steampowered.com/',
    'Reddit': 'https://www.reddit.com/'
  };
  
  // Add external links
  for (const [term, url] of Object.entries(externalLinks)) {
    const regex = new RegExp(`\\b(${term})\\b(?![^<]*>)(?![^<]*<\\/a>)`, 'i');
    const match = updatedContent.match(regex);
    
    if (match) {
      const replacement = `<a href="${url}" target="_blank" rel="noopener noreferrer">${match[1]}</a>`;
      updatedContent = updatedContent.replace(regex, replacement);
    }
  }
  
  // Get existing blog posts for related articles
  const blogDir = path.join(__dirname, 'blog');
  const existingPosts = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.html') && f !== 'index.html' && !f.includes(currentSlug))
    .slice(0, 3);
  
  // Add related articles section
  const relatedSection = `
    <hr style="margin: 3rem 0; border: none; border-top: 1px solid #30363d;">
    <h3>Related Articles</h3>
    <ul style="list-style: none; padding: 0;">
${existingPosts.map(file => {
  const title = file.replace('.html', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return `      <li style="margin-bottom: 0.75rem;">
        <a href="./${file}" style="color: #58a6ff; text-decoration: none;">${title}</a>
      </li>`;
}).join('\n')}
    </ul>

    <h3>Additional Resources</h3>
    <p>For more information about online gaming, visit these reputable sources:</p>
    <ul>
      <li><a href="https://www.esrb.org/" target="_blank" rel="noopener noreferrer">ESRB - Entertainment Software Rating Board</a></li>
      <li><a href="https://www.commonsensemedia.org/game-reviews" target="_blank" rel="noopener noreferrer">Common Sense Media - Game Reviews</a></li>
      <li><a href="https://www.pcgamer.com/" target="_blank" rel="noopener noreferrer">PC Gamer - Gaming News</a></li>
      <li><a href="https://www.ign.com/" target="_blank" rel="noopener noreferrer">IGN - Game Reviews and News</a></li>
    </ul>
`;
  
  return updatedContent + relatedSection;
}

// Create HTML file
function createBlogPostHTML(title, slug, metaDescription, content) {
  console.log('📄 Creating HTML file...');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${metaDescription}">
  <meta name="robots" content="index, follow">
  <title>${title} | Online Games Journal</title>
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <div class="header-content">
        <div class="brand">
          <h1 class="logo">Online Games Journal</h1>
        </div>
        <nav class="main-nav">
          <a href="../index.html">Home</a><a href="../blog/index.html">Blog</a><a href="../about.html">About</a><a href="../privacy.html">Privacy</a><a href="../terms.html">Terms</a>
        </nav>
      </div>
    </div>
  </header>
  
  <main class="main-content">
    <div class="container">
      <article class="blog-post">
            <img src="../images/${slug}.png" alt="${title}" class="featured-image">
            <article>
${content}
</article>
          </article>
    </div>
  </main>
  
  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2025 Online Games Journal. All rights reserved.</p>
      <p class="disclaimer">This site provides informational content about online games. Play responsibly.</p>
    </div>
  </footer>
  
  
  <script>
    (function() {
      if (localStorage.getItem('cookie-consent')) return;
      const banner = document.createElement('div');
      banner.className = 'cookie-banner';
      banner.innerHTML = \`
        <div class="cookie-content">
          <p>We use cookies for basic site functionality and analytics. <a href="./privacy.html">Learn more</a></p>
          <button id="cookie-accept" class="btn-primary">Accept</button>
        </div>
      \`;
      document.body.appendChild(banner);
      document.getElementById('cookie-accept').onclick = function() {
        localStorage.setItem('cookie-consent', '1');
        banner.remove();
      };
    })();
  </script>
</body>
</html>`;

  const blogDir = path.join(__dirname, 'blog');
  const filePath = path.join(blogDir, `${slug}.html`);
  
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✅ Created: ${filePath}`);
  
  return filePath;
}

// Generate image prompt
function generateImagePrompt(title, content) {
  // Extract keywords from title and content
  const keywords = title.toLowerCase();
  
  let prompt = '';
  
  if (keywords.includes('community') || keywords.includes('multiplayer')) {
    prompt = `Photorealistic image of diverse group of friends playing video games together in a modern gaming setup, smiling and engaged, colorful gaming monitors and RGB lighting, friendly atmosphere, professional photography, 16:9 aspect ratio`;
  } else if (keywords.includes('strategy') || keywords.includes('competitive')) {
    prompt = `Professional esports gaming setup with multiple monitors showing competitive gaming interface, high-tech gaming peripherals, dramatic lighting, intense focus atmosphere, photorealistic, 16:9 aspect ratio`;
  } else if (keywords.includes('guide') || keywords.includes('tips')) {
    prompt = `Modern gaming setup with gaming PC, mechanical keyboard, gaming mouse, headset on desk, tutorial-style composition, clean and organized, warm lighting, photorealistic, 16:9 aspect ratio`;
  } else if (keywords.includes('family') || keywords.includes('kids')) {
    prompt = `Family-friendly gaming scene with parents and children playing video games together in comfortable living room, happy expressions, bright and welcoming environment, photorealistic, 16:9 aspect ratio`;
  } else {
    prompt = `Modern online gaming concept with gaming computer, colorful game interface on screen, gaming peripherals, dynamic lighting effects, engaging atmosphere, photorealistic, professional quality, 16:9 aspect ratio`;
  }
  
  return prompt;
}

// Main function
async function generateBlogPost(title, keywords = []) {
  console.log(`\n🚀 Generating blog post: "${title}"\n`);
  
  try {
    // Generate slug
    const slug = slugify(title);
    console.log(`📝 Slug: ${slug}`);
    
    // Check if post already exists
    const blogPath = path.join(__dirname, 'blog', `${slug}.html`);
    if (fs.existsSync(blogPath)) {
      console.log(`⚠️  Warning: Post already exists at ${blogPath}`);
      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const answer = await new Promise(resolve => {
        rl.question('Overwrite existing post? (y/n): ', resolve);
      });
      rl.close();
      
      if (answer.toLowerCase() !== 'y') {
        console.log('❌ Cancelled');
        process.exit(0);
      }
    }
    
    // Generate content
    const content = await generateBlogContent(title, keywords);
    
    // Generate meta description
    const metaDescription = await generateMetaDescription(title, content);
    
    // Add interlinks
    const contentWithLinks = addLinksToContent(content, slug);
    
    // Create HTML file
    const filePath = createBlogPostHTML(title, slug, metaDescription, contentWithLinks);
    
    // Generate image prompt
    const imagePrompt = generateImagePrompt(title, content);
    
    console.log('\n✅ Blog post generated successfully!');
    console.log(`📄 File: ${filePath}`);
    console.log(`\n🖼️  To generate the featured image, run:`);
    console.log(`python regenerate-images.py`);
    console.log(`\nOr manually create an image at: images/${slug}.png`);
    console.log(`\nSuggested image prompt:`);
    console.log(`"${imagePrompt}"`);
    
    console.log('\n📝 Next steps:');
    console.log('1. Generate the image (python regenerate-images.py)');
    console.log('2. Update blog/index.html to include the new post');
    console.log('3. Update sitemap.xml');
    console.log('4. Test locally: npm run serve');
    console.log('5. Commit and push to GitHub');
    
    return { filePath, slug, imagePrompt };
    
  } catch (error) {
    console.error('❌ Error generating blog post:', error);
    process.exit(1);
  }
}

// CLI Interface
const isMainModule = process.argv[1] && (
  import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}` ||
  import.meta.url.endsWith(path.basename(process.argv[1]))
);

if (isMainModule) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📝 Blog Post Generator for Online Games Journal

Usage:
  node generate-blog-post.js "Your Blog Post Title" [keyword1,keyword2,...]

Examples:
  node generate-blog-post.js "Top 10 Online Games for Team Building"
  node generate-blog-post.js "How to Start Your First Gaming Clan" "clan,guild,community"
  node generate-blog-post.js "Online Gaming Safety Tips for Parents" "safety,parents,kids"

Popular Topics:
  - "Best Cooperative Games for Building Friendships"
  - "Understanding Game Mechanics: A Beginner's Guide"
  - "How to Improve Your Gaming Skills"
  - "Creating a Positive Gaming Environment"
  - "The Evolution of Online Gaming Communities"
  - "Balancing Gaming and Real Life: Tips for Healthy Gaming"
  - "Popular Online Games You Should Try in 2025"
  - "How to Deal with Toxic Players in Online Games"
  - "The Benefits of Playing Online Games"
  - "Setting Up Your First Gaming PC"
`);
    process.exit(0);
  }
  
  const title = args[0];
  const keywords = args[1] ? args[1].split(',').map(k => k.trim()) : [];
  
  generateBlogPost(title, keywords);
}

export { generateBlogPost };

