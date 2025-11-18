# Configuration Examples

Different `config.json` examples for various white page campaigns.

## Example 1: Online Games (Default)

Perfect for gaming-related campaigns that need a safe, informational landing page.

```json
{
  "topic": "Online Games and Gaming Community",
  "vertical": "entertainment",
  "site": {
    "title": "Online Games Journal",
    "description": "Your guide to the best online games, gaming tips, and community news",
    "domain": "onlinegamesjournal.com"
  },
  "content": {
    "numPosts": 6
  },
  "design": {
    "themeColor": "#6366f1"
  }
}
```

**Generated posts will cover:**
- Popular online games (Fortnite, Minecraft, Among Us)
- Gaming tips and strategies
- Community updates
- Game reviews

---

## Example 2: Mobile Apps Discovery

For campaigns promoting app downloads or mobile content.

```json
{
  "topic": "Mobile Apps and Productivity Tools",
  "vertical": "technology",
  "site": {
    "title": "App Discovery Hub",
    "description": "Find the best mobile apps to boost your productivity and entertainment",
    "domain": "appdiscoveryhub.com"
  },
  "content": {
    "numPosts": 8
  },
  "design": {
    "themeColor": "#10b981"
  }
}
```

---

## Example 3: Board Games & Puzzles

Family-friendly content for tabletop gaming enthusiasts.

```json
{
  "topic": "Board Games and Puzzle Games",
  "vertical": "hobbies",
  "site": {
    "title": "Board Game Enthusiast",
    "description": "Discover new board games, strategy guides, and community reviews",
    "domain": "boardgameenthusiast.com"
  },
  "content": {
    "numPosts": 5
  },
  "design": {
    "themeColor": "#f59e0b"
  }
}
```

---

## Example 4: Esports & Competitive Gaming

For campaigns targeting the esports audience.

```json
{
  "topic": "Esports and Competitive Gaming",
  "vertical": "sports",
  "site": {
    "title": "Esports Arena",
    "description": "Stay updated on esports tournaments, player profiles, and competitive strategies",
    "domain": "esportsarena.com"
  },
  "content": {
    "numPosts": 10
  },
  "design": {
    "themeColor": "#ef4444"
  }
}
```

---

## Example 5: Casual Social Games

Light, accessible content about social and casual gaming.

```json
{
  "topic": "Casual Social Games and Party Games",
  "vertical": "social",
  "site": {
    "title": "Social Gamer",
    "description": "Fun casual games to play with friends online and offline",
    "domain": "socialgamer.com"
  },
  "content": {
    "numPosts": 6
  },
  "design": {
    "themeColor": "#ec4899"
  }
}
```

---

## Example 6: Retro & Classic Games

Nostalgia-focused content for retro gaming fans.

```json
{
  "topic": "Retro Games and Classic Gaming",
  "vertical": "nostalgia",
  "site": {
    "title": "Retro Game Revival",
    "description": "Celebrating classic games, retro reviews, and gaming history",
    "domain": "retrogamerevival.com"
  },
  "content": {
    "numPosts": 7
  },
  "design": {
    "themeColor": "#8b5cf6"
  }
}
```

---

## Example 7: Game Development & Design

Educational content for aspiring game developers.

```json
{
  "topic": "Game Development and Design",
  "vertical": "education",
  "site": {
    "title": "Game Dev Insights",
    "description": "Learn game development, design principles, and industry insights",
    "domain": "gamedevinsights.com"
  },
  "content": {
    "numPosts": 8
  },
  "design": {
    "themeColor": "#0ea5e9"
  }
}
```

---

## Theme Colors Reference

Choose colors that match your vertical:

- **Blue** `#3b82f6` - Trust, technology
- **Indigo** `#6366f1` - Gaming, digital
- **Purple** `#8b5cf6` - Creative, premium
- **Pink** `#ec4899` - Social, fun
- **Red** `#ef4444` - Esports, competitive
- **Orange** `#f59e0b` - Energy, excitement
- **Green** `#10b981` - Apps, productivity
- **Teal** `#14b8a6` - Modern, fresh

---

## Advanced: Topic Specificity

**More specific = better content quality**

❌ Too broad:
```json
"topic": "games"
```

✅ Good:
```json
"topic": "Online Multiplayer Games"
```

✅ Even better:
```json
"topic": "Online Multiplayer Strategy Games and MOBA Communities"
```

---

## Tips for Campaign-Specific Sites

### Scenario: Facebook Ads for Gaming App

1. Create config focused on mobile gaming
2. Generate site with 6-8 posts
3. Deploy to clean domain
4. Use in Palladium as white page
5. Money page = actual app offer

### Scenario: Multiple GEOs

Generate separate sites:
- `config-us.json` → English content
- `config-es.json` → Spanish content (update topic)
- `config-de.json` → German content

Run:
```bash
cp config-us.json config.json && npm run generate
# Deploy to domain-us.com

cp config-es.json config.json && npm run generate
# Deploy to domain-es.com
```

### Scenario: A/B Testing

Generate 2-3 variants:
- Different titles
- Different color schemes
- Different number of posts

Track which converts better as white page!

---

## Compliance Checklist

Before deploying, verify your config:

- ✅ Topic is informational/educational
- ✅ NO gambling keywords
- ✅ NO "real money" references
- ✅ Family-friendly language
- ✅ Cookie banner included
- ✅ Privacy policy included
- ✅ Terms included

**The generator enforces these automatically, but double-check your topic!**

