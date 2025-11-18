# 🚀 Quick Start Guide - Blog Generation

## Generate New Blog Posts

### Option 1: Using NPM Scripts (Recommended)

```bash
# Generate a single blog post
npm run blog:new "Your Blog Post Title"

# Generate multiple posts (batch)
npm run blog:batch -- --count 3

# See all available topics
npm run blog:list

# Update blog index after generating posts
npm run blog:update

# Generate images for posts
npm run images
```

### Option 2: Direct Commands

```bash
# Single post
node generate-blog-post.js "Your Title" "keywords,here"

# Multiple posts
node generate-multiple-posts.js --count 5 --delay 10000

# Update blog index
node update-blog-index.js

# Generate images
python regenerate-images.py
```

---

## 📝 Complete Workflow

### 1. Generate Blog Content

```bash
# Option A: Generate 3 posts from predefined topics
npm run blog:batch -- --count 3

# Option B: Generate custom post
npm run blog:new "How to Master Online Gaming" "gaming,skills,tips"
```

### 2. Generate Images

```bash
npm run images
```

Wait 2-3 minutes per image.

### 3. Update Blog Index

```bash
npm run blog:update
```

This updates:
- `blog/index.html` (all posts)
- `index.html` (homepage with latest 6 posts)
- `sitemap.xml` (for SEO)

### 4. Test Locally

```bash
npm run serve
```

Visit: http://localhost:3000

### 5. Deploy to GitHub

```bash
git add .
git commit -m "Add new blog posts"
git push origin main
git push origin main:gh-pages --force
```

Live in 1-2 minutes! ✨

---

## 🎯 Quick Examples

### Example 1: Generate 5 Posts

```bash
npm run blog:batch -- --count 5
npm run images
npm run blog:update
npm run serve
```

### Example 2: Custom Topic

```bash
npm run blog:new "Best Games for Teamwork" "teamwork,cooperation,multiplayer"
npm run images
npm run blog:update
```

### Example 3: Generate All Predefined Topics

```bash
npm run blog:batch -- --all --delay 10000
npm run images
npm run blog:update
```

---

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run blog:new "Title"` | Generate single blog post |
| `npm run blog:batch -- --count N` | Generate N posts |
| `npm run blog:list` | Show all available topics |
| `npm run blog:update` | Update blog index & sitemap |
| `npm run images` | Generate featured images |
| `npm run serve` | Test locally |

---

## ⚡ Pro Tips

1. **Batch Generation**: Generate multiple posts at once to save time
   ```bash
   npm run blog:batch -- --count 10 --delay 8000
   ```

2. **Custom Topics**: Use descriptive titles and relevant keywords
   ```bash
   npm run blog:new "Title" "keyword1,keyword2,keyword3"
   ```

3. **Always Update Index**: After generating posts, update the blog index
   ```bash
   npm run blog:update
   ```

4. **Test Before Deploy**: Always test locally first
   ```bash
   npm run serve
   ```

5. **Rate Limits**: If you hit API limits, increase delay
   ```bash
   npm run blog:batch -- --count 5 --delay 15000
   ```

---

## 🔧 Troubleshooting

### API Key Issues

```bash
# Check .env file
cat .env

# Should contain:
GOOGLE_API_KEY=your_key_here
```

### Images Not Generating

```bash
# Check Python
python --version  # Should be 3.8+

# Reinstall dependencies
pip install -r requirements.txt
```

### Blog Index Not Updating

```bash
# Run manually
node update-blog-index.js

# Check for errors in output
```

---

## 📚 More Help

- Full guide: See `BLOG-GENERATION-GUIDE.md`
- Deployment: See `DEPLOYMENT-STEPS.md`
- Links summary: See `LINKS-SUMMARY.md`

---

**Start generating amazing gaming content! 🎮✨**

