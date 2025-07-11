#!/bin/bash

# Script to manually update your currently reading book
# Usage: ./update-book.sh "Book Title" "Author Name" "Subtitle" progress "goodreads-book-url" "cover-image-url"

TITLE="$1"
AUTHOR="$2"
SUBTITLE="$3"
PROGRESS="$4"
BOOK_URL="$5"
COVER_URL="$6"

# Default values if not provided
if [ -z "$TITLE" ]; then
  echo "Usage: ./update-book.sh \"Book Title\" \"Author Name\" \"Subtitle\" progress \"goodreads-book-url\" \"cover-image-url\""
  echo "Example: ./update-book.sh \"The Innovators\" \"Walter Isaacson\" \"How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution\" 75 \"https://www.goodreads.com/book/show/21013851-the-innovators\" \"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1410191571i/21013851.jpg\""
  exit 1
fi

# Send update to backend
curl -X POST http://localhost:3001/api/update-book \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"$TITLE\",
    \"author\": \"$AUTHOR\",
    \"subtitle\": \"$SUBTITLE\",
    \"progress\": $PROGRESS,
    \"bookLink\": \"$BOOK_URL\",
    \"coverUrl\": \"$COVER_URL\"
  }"

echo -e "\nBook updated successfully!"
