# 🚀 Deploy to GitHub Pages

Complete guide to deploying your Online Games Journal website to GitHub Pages for free hosting.

## Prerequisites

1. ✅ GitHub account (create one at https://github.com)
2. ✅ Git installed on your computer
3. ✅ Generated website (the one you just created!)

## Method 1: Automated Deployment (Recommended)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `online-games-journal` (or any name you prefer)
3. Description: "AI-generated gaming website"
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Run Deployment Script

**Windows (PowerShell):**
```powershell
cd D:\fb-clc\generated-sites\online-games-journal
.\deploy-github-pages.ps1
```

**Mac/Linux (Terminal):**
```bash
cd /path/to/generated-sites/online-games-journal
chmod +x deploy-github-pages.sh
./deploy-github-pages.sh
```

The script will:
- Initialize git repository
- Create .gitignore
- Add all website files
- Commit changes
- Push to GitHub
- Create gh-pages branch

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**:
   - Branch: Select `gh-pages`
   - Folder: Select `/ (root)`
5. Click **Save**

### Step 4: Wait & Visit

GitHub will build your site (takes 1-2 minutes).

Your site will be live at:
```
https://YOUR-USERNAME.github.io/online-games-journal/
```

## Method 2: Manual Deployment

### Step 1: Initialize Git

```bash
cd D:\fb-clc\generated-sites\online-games-journal
git init
```

### Step 2: Create .gitignore

Create a file named `.gitignore`:
```
node_modules/
.env
*.log
.DS_Store
Thumbs.db
*.pyc
__pycache__/
```

### Step 3: Add Files

```bash
git add .
git commit -m "Initial commit - Deploy website"
```

### Step 4: Add Remote

```bash
git remote add origin https://github.com/YOUR-USERNAME/online-games-journal.git
git branch -M main
git push -u origin main
```

### Step 5: Create gh-pages Branch

```bash
git checkout -b gh-pages
git push -u origin gh-pages
```

### Step 6: Enable GitHub Pages

Follow Step 3 from Method 1 above.

## Custom Domain (Optional)

### Add Your Own Domain

1. In your repository, create a file named `CNAME` in the root
2. Add your domain:
   ```
   yourdomain.com
   ```
3. Commit and push:
   ```bash
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
4. In your domain registrar (GoDaddy, Namecheap, etc.):
   - Add A records:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or CNAME record:
     ```
     CNAME -> YOUR-USERNAME.github.io
     ```

## Updating Your Site

When you make changes and want to redeploy:

```bash
cd D:\fb-clc\generated-sites\online-games-journal
git add .
git commit -m "Update website"
git push origin main
git push origin main:gh-pages --force
```

Or run the deployment script again:
```powershell
.\deploy-github-pages.ps1
```

## Troubleshooting

### Site Not Loading

**Problem:** 404 error when visiting your site

**Solutions:**
1. Wait 5-10 minutes (first deployment takes time)
2. Check GitHub Pages settings are correct
3. Make sure repository is **Public**
4. Verify gh-pages branch exists
5. Check Actions tab for build errors

### CSS/Images Not Loading

**Problem:** Page loads but no styling or images

**Solutions:**
1. Check if paths in HTML are relative (not absolute)
2. Verify all files were committed:
   ```bash
   git status
   git add images/*
   git add styles.css
   git commit -m "Add missing files"
   git push origin gh-pages
   ```

### Permission Denied

**Problem:** Cannot push to GitHub

**Solutions:**
1. Configure Git credentials:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```
2. Use personal access token instead of password
3. Set up SSH keys (https://docs.github.com/en/authentication)

### Repository Already Exists

**Problem:** "Repository already exists" error

**Solution:**
Use existing repository or create with different name

## GitHub Pages Features

### ✅ What You Get

- **Free hosting** (unlimited traffic)
- **HTTPS enabled** by default
- **Custom domain support**
- **Fast CDN delivery** (GitHub's global network)
- **Automatic deployments** when you push

### ⚠️ Limitations

- Site must be **Public** (for free tier)
- 1GB repository size limit
- 100GB bandwidth/month soft limit
- Static sites only (no server-side code)
- Builds can take 1-10 minutes

## Best Practices

### 1. Site Structure
✅ Keep all assets in the repository
✅ Use relative paths (not absolute)
✅ Optimize images (keep them under 1MB each)

### 2. SEO
✅ Submit sitemap to Google Search Console
✅ Verify ownership via HTML file method
✅ Update sitemap.xml with your actual domain

### 3. Performance
✅ Minimize CSS/JS files
✅ Compress images
✅ Use browser caching headers (automatic on GitHub Pages)

### 4. Security
✅ Never commit API keys or secrets
✅ Review .gitignore before committing
✅ Use environment variables for sensitive data

## Alternative Free Hosting Options

If GitHub Pages doesn't work for you:

### Netlify
- Drag & drop deployment
- Better build times
- More features
- Free tier: 100GB bandwidth/month

### Vercel
- Optimized for modern frameworks
- Instant deployments
- Free tier: Unlimited bandwidth

### Cloudflare Pages
- Global CDN
- Fastest performance
- Free tier: Unlimited bandwidth

## Support

### GitHub Pages Documentation
- https://docs.github.com/en/pages

### Common Commands

**Check git status:**
```bash
git status
```

**View remote URL:**
```bash
git remote -v
```

**Change remote URL:**
```bash
git remote set-url origin https://github.com/NEW-USERNAME/NEW-REPO.git
```

**Force push (use carefully):**
```bash
git push origin gh-pages --force
```

---

## Quick Reference

### Deploy New Site
```powershell
cd online-games-journal
.\deploy-github-pages.ps1
```

### Update Existing Site
```bash
git add .
git commit -m "Update content"
git push origin main:gh-pages --force
```

### Check Deployment Status
Visit: `https://github.com/USERNAME/REPO/deployments`

---

**Your website is now accessible to the world! 🌍✨**

