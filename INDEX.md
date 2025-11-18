# 📚 Documentation Index

Complete guide to generating and deploying AI-powered white pages for compliant ad campaigns.

## 🚀 Getting Started (Start Here!)

1. **[QUICKSTART.md](QUICKSTART.md)** - Get your site running in 3 minutes
2. **[README.md](README.md)** - Complete feature overview and documentation

## 📖 Core Documentation

### Configuration & Customization
- **[config.json](config.json)** - Main configuration file (edit this!)
- **[EXAMPLES.md](EXAMPLES.md)** - Pre-made configs for different verticals

### Integration & Deployment
- **[WORKFLOW.md](WORKFLOW.md)** - Complete visual workflow from generation to conversion
- **[PALLADIUM-INTEGRATION.md](PALLADIUM-INTEGRATION.md)** - Complete Palladium setup guide
- **[DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)** - Pre-launch checklist

## 🗂️ Files Overview

### Essential Files
```
generate-site.js          Main generation script
config.json              Configuration (edit this!)
package.json             Dependencies
```

### Generated Files (after running npm run generate)
```
index.html               Home page with post grid
about.html               About page
privacy.html             Privacy policy
terms.html               Terms and conditions
styles.css               Complete responsive CSS
robots.txt               SEO
sitemap.xml              SEO
blog/                    Blog posts directory
  ├── index.html         Blog listing
  └── [post-slug].html   Individual posts
images/                  AI-generated SVG images
  └── [post-slug].svg    One per post
```

## 🎯 Common Workflows

### First Time Setup
1. Read [QUICKSTART.md](QUICKSTART.md)
2. Get Google API key
3. Run `npm install`
4. Edit `config.json`
5. Run `npm run generate`

### Generate for Different Vertical
1. Copy example from [EXAMPLES.md](EXAMPLES.md)
2. Update `config.json`
3. Run `npm run generate`
4. Deploy to new domain

### Deploy to Palladium
1. Generate site (`npm run generate`)
2. Deploy to hosting (Netlify/Vercel/FTP)
3. Follow [PALLADIUM-INTEGRATION.md](PALLADIUM-INTEGRATION.md)
4. Use [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)

### Create Multiple Campaigns
```bash
# Campaign 1: US - Online Games
cp config.json config-us-games.json
# Edit config-us-games.json
cp config-us-games.json config.json
npm run generate
# Deploy to domain1.com

# Campaign 2: UK - Mobile Apps
cp config.json config-uk-apps.json
# Edit config-uk-apps.json
cp config-uk-apps.json config.json
npm run generate
# Deploy to domain2.com
```

## 🔧 Troubleshooting

### "GOOGLE_API_KEY not set"
→ See [QUICKSTART.md](QUICKSTART.md) Step 2

### Poor quality content
→ Make topic more specific in config.json
→ See [EXAMPLES.md](EXAMPLES.md) for guidance

### Rate limits
→ Reduce `numPosts` in config.json
→ Wait 60 seconds between runs

### Images not generating
→ Check API key
→ Script falls back to gradient placeholders automatically

### Palladium not filtering correctly
→ See [PALLADIUM-INTEGRATION.md](PALLADIUM-INTEGRATION.md) Step 4.3

## 📚 Learning Path

### Beginner
1. [QUICKSTART.md](QUICKSTART.md) - Generate first site
2. [README.md](README.md) - Understand features
3. [EXAMPLES.md](EXAMPLES.md) - Try different verticals

### Intermediate
1. [PALLADIUM-INTEGRATION.md](PALLADIUM-INTEGRATION.md) - Set up cloaking
2. [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md) - Launch campaign
3. Edit config.json - Customize for your needs

### Advanced
1. Generate multiple sites for A/B testing
2. Create GEO-specific configurations
3. Optimize Palladium filters based on data
4. Scale to multiple campaigns/verticals

## 🎨 Customization Guide

### Change Site Title & Description
```json
// config.json
{
  "site": {
    "title": "Your Custom Title",
    "description": "Your custom description"
  }
}
```

### Change Number of Posts
```json
// config.json
{
  "content": {
    "numPosts": 8
  }
}
```

### Change Theme Color
```json
// config.json
{
  "design": {
    "themeColor": "#10b981"
  }
}
```

### Change Topic/Vertical
```json
// config.json
{
  "topic": "Your New Topic Here"
}
```

Then run: `npm run generate`

## 🚦 Compliance Guidelines

### ✅ DO
- Focus on informational content
- Use real game/app names
- Keep family-friendly
- Include cookie banner
- Add privacy policy
- Match ad creative to white page

### ❌ DON'T
- Mention gambling or real money
- Make false promises
- Use misleading content
- Skip compliance pages
- Ignore ad platform policies

## 📞 Support & Resources

### Documentation
- All docs are in this directory
- Start with QUICKSTART.md
- Check EXAMPLES.md for templates

### External Resources
- [Google AI Studio](https://aistudio.google.com/app/apikey) - Get API key
- [Palladium](https://en.palladium.expert/) - Cloaking service
- [Netlify](https://www.netlify.com/) - Free hosting
- [Vercel](https://vercel.com/) - Free hosting

## 🗺️ Quick Reference

| Task | File to Read |
|------|-------------|
| First time setup | QUICKSTART.md |
| Change configuration | config.json |
| See examples | EXAMPLES.md |
| Deploy with Palladium | PALLADIUM-INTEGRATION.md |
| Pre-launch checklist | DEPLOYMENT-CHECKLIST.md |
| Full documentation | README.md |

## 📝 Version History

**v1.0.0** (Current)
- Initial release
- Gemini 2.0 Flash integration
- SVG image generation
- Full compliance suite
- Palladium integration docs

## 🤝 Contributing

Found a bug or have a suggestion?
- Document your issue
- Include config.json (remove sensitive data)
- Describe expected vs actual behavior

## 📄 License

MIT - Use for compliant advertising campaigns.

---

**Need help?** Start with [QUICKSTART.md](QUICKSTART.md) and follow the steps!

