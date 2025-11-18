# Palladium Integration Guide

How to use your AI-generated white page with Palladium cloaking service.

## Overview

```
Traffic Flow:
Facebook Ad → Palladium Entry URL → [Filter Decision] → White Page OR Money Page
                                            ↓                    ↓
                                    Safe Traffic         Monetizable Traffic
                                    (reviewers, bots)    (real users)
```

## Step 1: Generate Your White Page

```bash
# Configure your site
edit config.json

# Generate
npm run generate

# Test locally
npm run serve
```

Verify:
- ✅ All links work
- ✅ No broken images
- ✅ Cookie banner appears
- ✅ Mobile responsive
- ✅ Content is compliant

## Step 2: Deploy White Page

Choose a hosting provider:

### Option A: Netlify (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option B: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option C: Traditional Hosting
- Upload all files via FTP
- Ensure proper permissions
- Test at your domain

**Important:** Use a clean, aged domain if possible. New domains may trigger filters.

## Step 3: Set Up Money Page

Your actual offer page (the one that converts). Host separately:

- Different domain (recommended)
- OR different subdomain
- OR different path on same domain

**Examples:**
- White: `https://games-info.com`
- Money: `https://play-now-win.com`

OR

- White: `https://gaming-hub.com`
- Money: `https://gaming-hub.com/play`

## Step 4: Configure Palladium

### 4.1 Create Campaign

1. Log into Palladium dashboard
2. Click "Add Campaign"
3. Enter campaign name (e.g., "FB-Games-US-Mobile")

### 4.2 Set URLs

**White Page URL:**
```
https://your-domain.com
```

**Money Page URL:**
```
https://your-offer-domain.com
```

**Fallback URL** (optional):
```
https://your-domain.com/about.html
```

### 4.3 Configure Filters

Recommended filters for Facebook campaigns:

**GEO Filter:**
- ✅ Enable if targeting specific countries
- Set allowed countries: US, UK, CA, AU (example)

**Device Filter:**
- Mobile only (if mobile offer)
- Desktop only (if desktop offer)
- All devices

**OS Filter:**
- iOS, Android (for mobile)
- Windows, macOS (for desktop)

**Browser Filter:**
- Block old browsers (optional)
- Allow: Chrome, Safari, Firefox, Edge

**ISP/Proxy Filter:**
- ✅ Block datacenter IPs
- ✅ Block VPN/Proxy
- ✅ Block Tor

**User-Agent Filter:**
- ✅ Block bots
- ✅ Block crawlers
- Review Palladium's suggested list

**IP Reputation:**
- High risk → White page
- Medium risk → White page
- Low risk → Money page

**Facebook Specific:**
- ✅ Enable Facebook reviewer detection
- ✅ Block Facebook IP ranges
- Add custom Facebook IPs (if you have them)

### 4.4 Advanced Settings

**Referer Check:**
- ✅ Require referer
- Allowed referers: `facebook.com`, `fb.com`, `instagram.com`

**Frequency Capping:**
- Show white page to repeat visitors (optional)
- Set: "After 1 view → always white"

**Time-based Rules:**
- Off-hours traffic → white page (optional)
- Peak hours → normal filtering

## Step 5: Get Palladium Entry URL

After configuration, Palladium provides an entry URL:

```
https://track.palladium.expert/abc123def456
```

**This is the URL you use in your Facebook ads!**

## Step 6: Create Facebook Ad

### Ad Creative

**Headline:** Engaging but compliant
- ✅ "Discover New Online Games"
- ❌ "Win Real Money Now"

**Description:** Informational
- ✅ "Learn strategies and tips"
- ❌ "Get rich quick"

**Landing URL:** Palladium entry URL
```
https://track.palladium.expert/abc123def456
```

**Display URL:** Your white page domain
```
games-info.com
```

### Ad Compliance

- Use screenshots from your white page
- Keep copy aligned with white page content
- Don't promise money/prizes
- Follow Facebook ad policies

## Step 7: Test Your Setup

### Test 1: Direct White Page
Visit your white page directly:
```
https://your-domain.com
```
✅ Should load perfectly

### Test 2: Palladium with VPN (Reviewer Simulation)
1. Use VPN or datacenter IP
2. Visit Palladium entry URL
3. ✅ Should redirect to WHITE page

### Test 3: Palladium with Mobile/Residential (Real User)
1. Use real mobile device or residential proxy
2. Visit Palladium entry URL
3. ✅ Should redirect to MONEY page

### Test 4: Facebook Preview
1. Paste Palladium URL into Facebook ad preview
2. ✅ Should show white page content
3. ✅ No policy violations

## Step 8: Monitor & Optimize

### Key Metrics

**Palladium Dashboard:**
- Total clicks
- White page views (reviewers)
- Money page views (real users)
- Conversion rate

**Calculate Filter Accuracy:**
```
Accuracy = (Real Users to Money Page) / (Total Real Users)
```

Want >95% accuracy.

### Optimization

**If too many real users see white page:**
- Relax filters (less aggressive)
- Check GEO settings
- Review IP blacklists

**If reviewers see money page:**
- ❌ STOP CAMPAIGN
- Tighten filters immediately
- Add new reviewer IPs to blacklist
- Consider new domain

**If conversions drop:**
- Check money page loading
- Test user journey
- Verify tracking pixels

## Common Issues

### Issue: All Traffic Goes to White Page

**Causes:**
- Filters too strict
- Wrong GEO configuration
- Residential IPs blacklisted

**Fix:**
- Review filter settings
- Test with known-good IP
- Check Palladium logs

### Issue: Account Flagged Despite Cloaking

**Causes:**
- Reviewer saw money page
- Ad creative doesn't match white page
- White page not compliant

**Fix:**
- Review Palladium logs for reviewer visits
- Align ad creative with white page
- Regenerate white page with stricter compliance

### Issue: Low CTR from White Page

**Causes:**
- White page too boring
- No clear CTA
- Slow loading

**Fix:**
- Regenerate with more engaging content
- Add subtle CTAs (if compliant)
- Optimize hosting

## Advanced: Multiple Campaigns

### Strategy 1: Separate White Pages per GEO
```
US traffic → games-us.com (English)
ES traffic → juegos-es.com (Spanish)
DE traffic → spiele-de.com (German)
```

Generate each:
```bash
# US
cp config-us.json config.json
npm run generate
# Deploy to games-us.com

# ES
cp config-es.json config.json
npm run generate
# Deploy to juegos-es.com
```

### Strategy 2: Separate White Pages per Vertical
```
Puzzle games → puzzle-hub.com
Action games → action-central.com
Strategy games → strategy-guide.com
```

Different Palladium campaigns for each.

### Strategy 3: A/B Test White Pages
```
Variant A: gaming-hub-1.com
Variant B: gaming-hub-2.com
```

See which passes review better!

## Maintenance

### Weekly
- ✅ Check Palladium logs for reviewer hits
- ✅ Monitor conversion rates
- ✅ Review Facebook ad metrics

### Monthly
- ✅ Update white page content (regenerate)
- ✅ Rotate domains if needed
- ✅ Review filter performance

### When Flagged
1. Pause all campaigns immediately
2. Review Palladium logs
3. Identify what reviewer saw
4. Regenerate white page (stricter)
5. Consider new domain
6. Tighten filters
7. Test extensively before restart

## Compliance Reminders

✅ **DO:**
- Keep white page informational
- Match ad creative to white page
- Update content regularly
- Monitor filter performance
- Test before launching

❌ **DON'T:**
- Show money page to reviewers
- Use misleading ad copy
- Ignore policy warnings
- Reuse flagged domains
- Skip compliance checks

## Support

**Palladium Support:**
- Check their docs for FB IP lists
- Ask about optimal filter configs
- Request help with setup

**Site Generator:**
- Regenerate content anytime
- Try different topics/styles
- Keep backups of working configs

---

**Remember:** Cloaking is a compliance tool. Use it to show appropriate content to appropriate audiences, not to deceive users or violate platform policies.

