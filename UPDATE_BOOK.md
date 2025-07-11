# How to Update Your Currently Reading Book

## Quick Steps:

1. Open [`src/pages/Home.jsx`](src/pages/Home.jsx)
2. Find the section marked with the comment "📚 CURRENTLY READING BOOK - UPDATE HERE!"
3. Update the book details:

```javascript
const currentBook = {
  title: "Your Book Title",
  author: "Author Name", 
  subtitle: "Book Subtitle or Description",
  currentPage: 123,        // What page you're on
  totalPages: 456,         // Total pages in the book
  coverUrl: "https://...", // Book cover image URL (optional)
  bookLink: "https://..."  // Link to book page (optional)
};
```

## Finding Book Cover URLs:

1. Go to the book's Goodreads page
2. Right-click on the cover image
3. Select "Copy image address"
4. Paste that URL as the `coverUrl`

## Example Update:

```javascript
const currentBook = {
  title: "Dune", 
  author: "Frank Herbert",
  subtitle: "The epic science fiction masterpiece",
  currentPage: 200,
  totalPages: 688,
  coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
  bookLink: "https://www.goodreads.com/book/show/44767458-dune"
};
```

That's it! The progress bar and percentage will automatically update based on your current page vs total pages.

## Deploying to GitHub Pages:

1. Build the project: `npm run build`
2. Push to GitHub
3. Enable GitHub Pages in your repository settings
4. Point it to the `dist` folder or main branch

Much simpler than the backend approach! 🎉
