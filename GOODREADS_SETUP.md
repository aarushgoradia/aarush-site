# Goodreads Integration Setup

This setup includes a backend scraper for Goodreads and a frontend that displays your currently reading book.

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3001`

## Frontend Integration

The frontend automatically tries to fetch your currently reading book from the backend API every 30 minutes.

## Manual Book Updates (Since Profile is Private)

Since your Goodreads profile is private, you can manually update your currently reading book:

### Option 1: Using the Script
```bash
chmod +x update-book.sh
./update-book.sh "Book Title" "Author Name" "Book Subtitle" progress "goodreads-book-url"
```

Example:
```bash
./update-book.sh "The Innovators" "Walter Isaacson" "How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution" 65 "https://www.goodreads.com/book/show/21013851-the-innovators"
```

### Option 2: Direct API Call
```bash
curl -X POST http://localhost:3001/api/update-book \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Book Title",
    "author": "Author Name",
    "subtitle": "Book Subtitle",
    "progress": 65,
    "bookLink": "https://www.goodreads.com/book/show/book-id"
  }'
```

## Making Your Profile Public (Optional)

If you want automatic scraping to work:

1. Go to your Goodreads profile settings
2. Make your profile public
3. The backend will automatically scrape your currently reading books

## Features

- **Auto-refresh**: Book data refreshes every 30 minutes
- **Clickable titles**: Book titles link to their Goodreads pages
- **Cover images**: Shows book covers when available
- **Progress tracking**: Visual progress bar
- **Fallback**: Shows default book if API fails

## API Endpoints

- `GET /api/current-book/:userId` - Get currently reading book
- `POST /api/update-book` - Manually update book data

## Notes

- The backend caches book data for 30 minutes to avoid excessive scraping
- Cover images are fetched from Goodreads when available
- The system gracefully falls back to static data if the API fails
