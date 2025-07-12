# How to Update Your Currently Reading Book

## Simple Steps:

1. Open [`src/pages/Home.jsx`](src/pages/Home.jsx)
2. Find the book object around line 10
3. Update the book details:

```javascript
const currentBook = {
  title: "Your Book Title",
  author: "Author Name",
  subtitle: "Book Description",
  currentPage: 123,        // What page you're on
  totalPages: 456,         // Total pages in the book
  coverUrl: "https://...", // Book cover image URL (optional)
  bookLink: "https://..."  // Link to book page (optional)
};
```

## Example:

```javascript
const currentBook = {
  title: "Mason & Dixon",
  author: "Thomas Pynchon", 
  subtitle: "A Novel",
  currentPage: 264,
  totalPages: 773,
  coverUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/Mason_%26_Dixon_%281997_1st_ed_jacket_cover%29.jpg",
  bookLink: "https://www.goodreads.com/book/show/5327.Mason_Dixon"
};
```

## Deploy to GitHub Pages:

1. Run `npm run build`
2. Upload the contents of the [`dist`](dist ) folder to your GitHub repository
3. Enable GitHub Pages in repository settings

That's it! 🎉