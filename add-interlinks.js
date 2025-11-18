import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// External reputable links
const externalLinks = {
  'Fortnite': 'https://www.epicgames.com/fortnite/',
  'Minecraft': 'https://www.minecraft.net/',
  'League of Legends': 'https://www.leagueoflegends.com/',
  'Among Us': 'https://www.innersloth.com/games/among-us/',
  'Discord': 'https://discord.com/',
  'Reddit': 'https://www.reddit.com/',
  'Twitch': 'https://www.twitch.tv/',
  'gaming communities': 'https://en.wikipedia.org/wiki/Video_game_culture',
  'multiplayer games': 'https://en.wikipedia.org/wiki/Multiplayer_video_game',
  'esports': 'https://www.esportsearnings.com/',
  'game design': 'https://www.gamedeveloper.com/',
  'Steam': 'https://store.steampowered.com/',
  'PlayStation': 'https://www.playstation.com/',
  'Xbox': 'https://www.xbox.com/',
  'Nintendo': 'https://www.nintendo.com/'
};

// Internal blog posts for cross-linking
const blogPosts = {
  'online-gaming-communities-connect-learn-grow.html': 'Online Gaming Communities: Connect, Learn, Grow',
  'online-games-community-fun-and-skills.html': 'Online Games: Community, Fun, and Skills',
  'online-games-building-gaming-communities.html': 'Building Gaming Communities',
  'online-gaming-communities-fun-and-learning.html': 'Gaming Communities: Fun and Learning',
  'understanding-online-games-and-their-communities.html': 'Understanding Online Games',
  'family-guide-to-online-gaming-communities.html': 'Family Guide to Online Gaming',
  'online-gaming-fun-friendship-community.html': 'Fun, Friendship, and Community'
};

function addLinksToContent(content, currentFile) {
  let updatedContent = content;
  
  // Add external links (only first occurrence to avoid over-linking)
  const linkedTerms = new Set();
  
  for (const [term, url] of Object.entries(externalLinks)) {
    if (linkedTerms.has(term)) continue;
    
    // Find first occurrence in article body (case-insensitive)
    const articleMatch = updatedContent.match(/<article>([\s\S]*?)<\/article>/);
    if (!articleMatch) continue;
    
    const articleContent = articleMatch[1];
    const regex = new RegExp(`\\b(${term})\\b(?![^<]*>)(?![^<]*<\/a>)`, 'i');
    const match = articleContent.match(regex);
    
    if (match) {
      const replacement = `<a href="${url}" target="_blank" rel="noopener noreferrer">${match[1]}</a>`;
      updatedContent = updatedContent.replace(regex, replacement);
      linkedTerms.add(term);
    }
  }
  
  // Add "Related Articles" section before the closing </article>
  const relatedPosts = Object.entries(blogPosts)
    .filter(([file]) => file !== currentFile)
    .slice(0, 3); // Get 3 related posts
  
  if (relatedPosts.length > 0) {
    const relatedSection = `
    <hr style="margin: 3rem 0; border: none; border-top: 1px solid #30363d;">
    <h3>Related Articles</h3>
    <ul style="list-style: none; padding: 0;">
${relatedPosts.map(([file, title]) => `      <li style="margin-bottom: 0.75rem;">
        <a href="./${file}" style="color: #58a6ff; text-decoration: none;">${title}</a>
      </li>`).join('\n')}
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
    
    // Insert before the last </article> tag
    const lastArticleClose = updatedContent.lastIndexOf('</article>');
    if (lastArticleClose !== -1) {
      updatedContent = updatedContent.slice(0, lastArticleClose) + relatedSection + updatedContent.slice(lastArticleClose);
    }
  }
  
  return updatedContent;
}

function processBlogPosts() {
  const blogDir = path.join(__dirname, 'blog');
  const files = fs.readdirSync(blogDir);
  
  let processedCount = 0;
  
  for (const file of files) {
    if (file === 'index.html' || !file.endsWith('.html')) continue;
    
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if already processed
    if (content.includes('Related Articles')) {
      console.log(`⏭️  Skipping ${file} (already has links)`);
      continue;
    }
    
    const updatedContent = addLinksToContent(content, file);
    
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`✅ Updated ${file}`);
    processedCount++;
  }
  
  console.log(`\n🎉 Processed ${processedCount} blog posts!`);
}

// Run the script
processBlogPosts();

