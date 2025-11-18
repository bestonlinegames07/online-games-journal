import { generateBlogPost } from './generate-blog-post.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Predefined blog post topics
const blogTopics = [
  {
    title: "Best Cooperative Games for Building Friendships",
    keywords: ["cooperative", "multiplayer", "friends", "teamwork"]
  },
  {
    title: "How to Improve Your Gaming Skills: A Comprehensive Guide",
    keywords: ["skills", "improvement", "practice", "strategy"]
  },
  {
    title: "Creating a Positive Gaming Environment in Your Community",
    keywords: ["community", "positive", "environment", "respect"]
  },
  {
    title: "The Evolution of Online Gaming Communities",
    keywords: ["history", "evolution", "community", "social"]
  },
  {
    title: "Balancing Gaming and Real Life: Tips for Healthy Gaming",
    keywords: ["balance", "health", "lifestyle", "wellness"]
  },
  {
    title: "Popular Online Games You Should Try in 2025",
    keywords: ["games", "recommendations", "2025", "popular"]
  },
  {
    title: "How to Deal with Toxic Players in Online Games",
    keywords: ["toxic", "behavior", "safety", "moderation"]
  },
  {
    title: "The Benefits of Playing Online Games",
    keywords: ["benefits", "skills", "social", "cognitive"]
  },
  {
    title: "Setting Up Your First Gaming PC: A Beginner's Guide",
    keywords: ["PC", "setup", "hardware", "beginner"]
  },
  {
    title: "Understanding Game Mechanics: From Basics to Advanced",
    keywords: ["mechanics", "gameplay", "understanding", "guide"]
  },
  {
    title: "How to Start Your First Gaming Clan or Guild",
    keywords: ["clan", "guild", "leadership", "organization"]
  },
  {
    title: "Online Gaming Safety Tips for Parents",
    keywords: ["safety", "parents", "children", "protection"]
  },
  {
    title: "The Role of Communication in Multiplayer Games",
    keywords: ["communication", "teamwork", "voice chat", "coordination"]
  },
  {
    title: "Exploring Different Gaming Genres: Find Your Style",
    keywords: ["genres", "variety", "preferences", "discovery"]
  },
  {
    title: "Building Leadership Skills Through Online Gaming",
    keywords: ["leadership", "management", "skills", "development"]
  }
];

// Generate multiple posts
async function generateMultiplePosts(topics, delay = 5000) {
  console.log(`\n🚀 Batch Blog Post Generation\n`);
  console.log(`📊 Total posts to generate: ${topics.length}`);
  console.log(`⏱️  Delay between posts: ${delay/1000}s\n`);
  
  const results = [];
  
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    console.log(`\n[${ i + 1}/${topics.length}] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    
    try {
      const result = await generateBlogPost(topic.title, topic.keywords);
      results.push({ success: true, ...result, topic });
      
      // Delay between API calls to avoid rate limits
      if (i < topics.length - 1) {
        console.log(`\n⏳ Waiting ${delay/1000}s before next post...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`❌ Failed to generate: ${topic.title}`);
      results.push({ success: false, topic, error: error.message });
    }
  }
  
  // Summary
  console.log(`\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📊 Generation Complete!`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log(`\n✅ Successfully Generated:`);
    successful.forEach(r => {
      console.log(`   • ${r.topic.title}`);
    });
  }
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed:`);
    failed.forEach(r => {
      console.log(`   • ${r.topic.title} (${r.error})`);
    });
  }
  
  console.log(`\n📝 Next Steps:`);
  console.log(`1. Generate images: python regenerate-images.py`);
  console.log(`2. Update blog/index.html with new posts`);
  console.log(`3. Update sitemap.xml`);
  console.log(`4. Test locally: npm run serve`);
  console.log(`5. Commit and push to GitHub\n`);
  
  return results;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.includes('--list')) {
    console.log('\n📋 Available Blog Topics:\n');
    blogTopics.forEach((topic, i) => {
      console.log(`${i + 1}. ${topic.title}`);
      console.log(`   Keywords: ${topic.keywords.join(', ')}\n`);
    });
    process.exit(0);
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🔄 Batch Blog Post Generator

Usage:
  node generate-multiple-posts.js [options]

Options:
  --list              Show all available topics
  --count <n>         Generate first N posts (default: 5)
  --delay <ms>        Delay between posts in milliseconds (default: 5000)
  --all               Generate all available posts
  --topics <indices>  Generate specific topics by index (comma-separated)

Examples:
  node generate-multiple-posts.js --count 3
  node generate-multiple-posts.js --all --delay 10000
  node generate-multiple-posts.js --topics 1,3,5
  node generate-multiple-posts.js --list
`);
    process.exit(0);
  }
  
  let count = 5;
  let delay = 5000;
  let topicsToGenerate = [];
  
  if (args.includes('--all')) {
    topicsToGenerate = blogTopics;
  } else if (args.includes('--topics')) {
    const indicesArg = args[args.indexOf('--topics') + 1];
    const indices = indicesArg.split(',').map(i => parseInt(i.trim()) - 1);
    topicsToGenerate = indices.map(i => blogTopics[i]).filter(t => t);
  } else {
    if (args.includes('--count')) {
      count = parseInt(args[args.indexOf('--count') + 1]) || 5;
    }
    topicsToGenerate = blogTopics.slice(0, count);
  }
  
  if (args.includes('--delay')) {
    delay = parseInt(args[args.indexOf('--delay') + 1]) || 5000;
  }
  
  generateMultiplePosts(topicsToGenerate, delay);
}

export { generateMultiplePosts, blogTopics };

