const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Cache to store book data
let cachedBookData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

async function scrapeGoodreadsProfile(userId) {
  try {
    // Use the currently reading list URL which is more reliable
    const url = `https://www.goodreads.com/review/list/${userId}?shelf=currently-reading`;
    
    console.log(`Scraping ${url}...`);
    
    // Add headers to mimic a real browser
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    });

    const $ = cheerio.load(response.data);
    
    // Check if we can access the page
    if ($('body').text().includes('Sign in to Goodreads') || $('body').text().includes('This Profile is Private')) {
      console.log('Cannot access currently reading list');
      return null;
    }
    
    // Try multiple selectors for book entries in the list view
    const selectors = [
      '.bookalike.review', // Main book review container
      '.bookTitle', // Book title links
      '.bookCover', // Book cover images
      '[itemtype="http://schema.org/Book"]', // Schema.org book markup
      '.elementList tr', // Table rows in list view
      '.field.title a', // Title field links
    ];
    
    let bookElement = null;
    
    // Find the first book element
    for (const selector of selectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        bookElement = elements.first();
        console.log(`Found book using selector: ${selector}`);
        break;
      }
    }
    
    if (bookElement && bookElement.length > 0) {
      // Try different ways to extract book info
      let title = bookElement.find('.bookTitle').text().trim() || 
                 bookElement.find('a[title]').attr('title') || 
                 bookElement.find('[itemprop="name"]').text().trim() ||
                 bookElement.find('.field.title a').text().trim() ||
                 bookElement.find('img').attr('alt') || '';
      
      let author = bookElement.find('.authorName').text().trim() || 
                  bookElement.find('[itemprop="author"]').text().trim() ||
                  bookElement.find('.field.author a').text().trim() ||
                  bookElement.find('a[href*="/author/"]').text().trim() || '';
      
      let coverUrl = bookElement.find('.bookCover img').attr('src') || 
                    bookElement.find('[itemprop="image"]').attr('src') ||
                    bookElement.find('img').attr('src') || null;
      
      let bookLink = bookElement.find('.bookTitle').attr('href') || 
                    bookElement.find('a[href*="/book/show/"]').attr('href') || 
                    bookElement.find('.field.title a').attr('href') || null;
      
      // Try to get progress if available
      const progressText = bookElement.find('.progress').text().trim() ||
                          bookElement.find('.field.position').text().trim() ||
                          bookElement.find('.date_read').text().trim();
      
      let progress = 0;
      let totalPages = 0;
      
      if (progressText) {
        const match = progressText.match(/(\d+) of (\d+) pages/);
        if (match) {
          progress = Math.round((parseInt(match[1]) / parseInt(match[2])) * 100);
          totalPages = parseInt(match[2]);
        } else {
          // Try to find page count in other elements
          const pageText = bookElement.find('.field.num_pages').text().trim() ||
                          bookElement.find('[itemprop="numberOfPages"]').text().trim();
          if (pageText) {
            const pageMatch = pageText.match(/(\d+)/);
            if (pageMatch) {
              totalPages = parseInt(pageMatch[1]);
            }
          }
        }
      }
      
      console.log('Extracted data:', { title, author, coverUrl, bookLink, progress, totalPages });
      
      if (title && author) {
        return {
          title: title.replace(/^["']|["']$/g, ''), // Remove quotes
          author: author.replace(/^["']|["']$/g, ''),
          coverUrl: coverUrl ? (coverUrl.startsWith('http') ? coverUrl : `https:${coverUrl}`) : null,
          bookLink: bookLink ? (bookLink.startsWith('http') ? bookLink : `https://www.goodreads.com${bookLink}`) : null,
          progress,
          totalPages,
          subtitle: totalPages > 0 ? `${totalPages} pages` : 'Currently reading'
        };
      }
    }
    
    // If no books found, try alternative approach - look for any book elements
    const anyBookTitle = $('.bookTitle').first();
    if (anyBookTitle.length > 0) {
      console.log('Found book title, trying alternative extraction...');
      const title = anyBookTitle.text().trim();
      const href = anyBookTitle.attr('href');
      
      if (title) {
        return {
          title: title.replace(/^["']|["']$/g, ''),
          author: 'Unknown Author',
          coverUrl: null,
          bookLink: href ? (href.startsWith('http') ? href : `https://www.goodreads.com${href}`) : null,
          progress: 0,
          totalPages: 0,
          subtitle: 'Currently reading'
        };
      }
    }
    
    console.log('No books found in currently reading list');
    return null;
  } catch (error) {
    console.error('Error scraping Goodreads:', error.message);
    return null;
  }
}

app.get('/api/current-book/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const now = Date.now();
    
    // Check cache
    if (cachedBookData && (now - lastFetchTime) < CACHE_DURATION) {
      return res.json(cachedBookData);
    }
    
    const bookData = await scrapeGoodreadsProfile(userId);
    
    if (bookData) {
      cachedBookData = bookData;
      lastFetchTime = now;
      res.json(bookData);
    } else {
      // Return fallback data if scraping fails
      res.json({
        title: "The Innovators",
        author: "Walter Isaacson",
        subtitle: "How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution",
        progress: 65,
        coverUrl: null,
        bookLink: "https://www.goodreads.com/book/show/21013851-the-innovators"
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch book data' });
  }
});

// Manual update endpoint for when profile is private
app.post('/api/update-book', (req, res) => {
  const { title, author, subtitle, progress, coverUrl, bookLink } = req.body;
  
  cachedBookData = {
    title,
    author,
    subtitle,
    progress: parseInt(progress) || 0,
    coverUrl,
    bookLink
  };
  lastFetchTime = Date.now();
  
  res.json({ message: 'Book data updated successfully', data: cachedBookData });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Goodreads scraper running on port ${PORT}`);
});
