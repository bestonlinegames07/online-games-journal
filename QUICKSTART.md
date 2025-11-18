# 🚀 Quick Start Guide

Generate a complete, compliant white page in 3 minutes!

## Step 1: Get API Key (1 minute)

1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key

## Step 2: Install & Configure (1 minute)

```powershell
# Navigate to this directory
cd generated-sites/online-games-journal

# Install dependencies
npm install

# Set your API key (Windows PowerShell)
$env:GOOGLE_API_KEY="paste-your-key-here"

# OR create .env file
echo "GOOGLE_API_KEY=paste-your-key-here" > .env
```

## Step 3: Generate Site (1-2 minutes)

```powershell
npm run generate
```

**That's it!** Your site is now ready in this directory.

## Step 4: Preview

```powershell
npm run serve
```

Open http://localhost:3000

## Customize (Optional)

Edit `config.json` to change:
- Site title and description
- Number of posts
- Theme color
- Topic focus

```json
{
  "site": {
    "title": "Your Site Name",
    "description": "Your description"
  },
  "content": {
    "numPosts": 6
  },
  "design": {
    "themeColor": "#6366f1"
  }
}
```

Then run `npm run generate` again!

## Deploy

Your site is now static HTML/CSS/SVG files. Deploy to:
- **Netlify**: Drag & drop the folder
- **Vercel**: `vercel deploy`
- **GitHub Pages**: Push to repo
- **Any hosting**: Upload via FTP

## Use with Palladium

1. Deploy your site to a domain
2. In Palladium, set this as your "white page" / safe page
3. Set your money page as the target
4. Configure filters (GEO, device, etc.)
5. Test with VPN/proxy

## Troubleshooting

**"GOOGLE_API_KEY not set"**
→ Set environment variable or create .env file

**"Rate limit exceeded"**
→ Wait 60 seconds or reduce numPosts in config.json

**Poor quality content**
→ Adjust topic in config.json to be more specific

## Tips

✅ Generate multiple sites for different campaigns
✅ Keep posts informational (NO gambling/money)
✅ Test on mobile devices
✅ Check all links work before deploying
✅ Use different domains for different verticals

---

**Need help?** Check README.md for detailed documentation.

