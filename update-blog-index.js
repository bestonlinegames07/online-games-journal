import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract title and description from HTML file
function extractPostMeta(htmlContent) {
  const titleMatch = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/);
  const descMatch = htmlContent.match(/<meta name="description" content="([^"]*)">/);
  
  const title = titleMatch ? titleMatch[1] : 'Untitled Post';
  const description = descMatch ? descMatch[1] : 'Read more about this gaming topic.';
  
  return { title, description };
}

// Get all blog posts
function getAllBlogPosts() {
  const blogDir = path.join(__dirname, 'blog');
  const files = fs.readdirSync(blogDir);
  
  const posts = [];
  
  for (const file of files) {
    if (file === 'index.html' || !file.endsWith('.html')) continue;
    
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { title, description } = extractPostMeta(content);
    const slug = file.replace('.html', '');
    
    // Get file modification time for sorting
    const stats = fs.statSync(filePath);
    
    posts.push({
      file,
      slug,
      title,
      description,
      modifiedTime: stats.mtime
    });
  }
  
  // Sort by modification time (newest first)
  posts.sort((a, b) => b.modifiedTime - a.modifiedTime);
  
  return posts;
}

// Generate blog index HTML
function generateBlogIndexHTML(posts) {
  const postCards = posts.map(post => `
          <article class="post-card">
            <a href="./${post.file}">
              <div class="post-image">
                <img src="../images/${post.slug}.png" alt="${post.title}" onerror="this.src='../images/placeholder.png'">
              </div>
              <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
              </div>
            </a>
          </article>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Browse all articles about online gaming, communities, strategies, and tips">
  <meta name="robots" content="index, follow">
  <title>Blog | Online Games Journal</title>
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
      <section class="hero">
        <h1>All Articles</h1>
        <p class="lead">Explore our complete collection of gaming guides, tips, and community insights</p>
      </section>
      
      <section class="posts-grid">
        <div class="grid">
${postCards}
        </div>
      </section>
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
          <p>We use cookies for basic site functionality and analytics. <a href="../privacy.html">Learn more</a></p>
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
}

// Update homepage with latest posts
function updateHomepage(posts) {
  const homepagePath = path.join(__dirname, 'index.html');
  let homepage = fs.readFileSync(homepagePath, 'utf-8');
  
  // Get latest 6 posts for homepage
  const latestPosts = posts.slice(0, 6);
  
  const postCards = latestPosts.map(post => `
          <article class="post-card">
            <a href="./blog/${post.file}">
              <div class="post-image">
                <img src="./images/${post.slug}.png" alt="${post.title}" onerror="this.src='./images/placeholder.png'">
              </div>
              <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
              </div>
            </a>
          </article>`).join('\n        ');
  
  // Replace posts grid content
  const gridRegex = /<div class="grid">([\s\S]*?)<\/div>\s*<\/section>/;
  const replacement = `<div class="grid">
        ${postCards}
        </div>
      </section>`;
  
  if (homepage.match(gridRegex)) {
    homepage = homepage.replace(gridRegex, replacement);
    fs.writeFileSync(homepagePath, homepage, 'utf-8');
    console.log('✅ Updated homepage with latest posts');
  } else {
    console.log('⚠️  Could not update homepage - pattern not found');
  }
}

// Update sitemap.xml
function updateSitemap(posts) {
  const sitemapPath = path.join(__dirname, 'sitemap.xml');
  
  const baseUrl = 'https://bestonlinegames07.github.io/online-games-journal';
  const today = new Date().toISOString().split('T')[0];
  
  const urls = [
    `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>${baseUrl}/blog/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
    `  <url>
    <loc>${baseUrl}/about.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    ...posts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.file}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
  
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  console.log('✅ Updated sitemap.xml');
}

// Main function
function updateBlogIndex() {
  console.log('\n🔄 Updating Blog Index and Related Files\n');
  
  try {
    // Get all posts
    const posts = getAllBlogPosts();
    console.log(`📊 Found ${posts.length} blog posts`);
    
    // Generate and save blog index
    const blogIndexHTML = generateBlogIndexHTML(posts);
    const blogIndexPath = path.join(__dirname, 'blog', 'index.html');
    fs.writeFileSync(blogIndexPath, blogIndexHTML, 'utf-8');
    console.log('✅ Updated blog/index.html');
    
    // Update homepage
    updateHomepage(posts);
    
    // Update sitemap
    updateSitemap(posts);
    
    console.log('\n✅ All files updated successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Test locally: npm run serve');
    console.log('2. Review changes: git diff');
    console.log('3. Commit: git add . && git commit -m "Add new blog posts"');
    console.log('4. Deploy: git push origin main && git push origin main:gh-pages --force');
    
  } catch (error) {
    console.error('❌ Error updating blog index:', error);
    process.exit(1);
  }
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  updateBlogIndex();
}

export { updateBlogIndex, getAllBlogPosts };

