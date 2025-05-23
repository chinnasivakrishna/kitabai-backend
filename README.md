# Complete API Documentation

## Base URL
```
https://kitabai-backend.onrender.com/api
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Routes (`/api/auth`)

### 1. Request OTP
**Endpoint:** `POST /api/auth/request-otp`
**Authentication:** Not required
**Purpose:** Send OTP to user's phone/email for login

**Request Body:**
```json
{
  "phoneNumber": "+1234567890",
  // OR
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otpId": "unique_otp_identifier"
}
```

### 2. Verify OTP
**Endpoint:** `POST /api/auth/verify-otp`
**Authentication:** Not required
**Purpose:** Verify OTP and get authentication token

**Request Body:**
```json
{
  "otpId": "unique_otp_identifier",
  "otp": "123456",
  "phoneNumber": "+1234567890"
  // OR
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "phoneNumber": "+1234567890",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

---

## 👤 Profile Routes (`/api/profile`)

### 1. Get Profile
**Endpoint:** `GET /api/profile`
**Authentication:** Required
**Purpose:** Get current user's profile information

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "profilePicture": "url_to_image",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 2. Update Profile
**Endpoint:** `PUT /api/profile`
**Authentication:** Required
**Purpose:** Update user profile information

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "bio": "User bio here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "Updated Name",
    "email": "newemail@example.com",
    "bio": "User bio here"
  }
}
```

### 3. Upload Profile Picture
**Endpoint:** `POST /api/profile/upload-picture`
**Authentication:** Required
**Purpose:** Upload/update user's profile picture

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
profilePicture: <image_file>
```

**Response:**
```json
{
  "success": true,
  "message": "Profile picture uploaded successfully",
  "profilePictureUrl": "https://example.com/uploads/profile_picture.jpg"
}
```

---

## 📚 Book Routes (`/api/books`)

### 1. Get All Books
**Endpoint:** `GET /api/books`
**Authentication:** Not required
**Purpose:** Get list of all available books with optional filtering

**Query Parameters:**
```
?category=fiction&search=harry&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "books": [
    {
      "id": "book_id",
      "title": "Book Title",
      "author": "Author Name",
      "category": "Fiction",
      "description": "Book description",
      "coverImage": "image_url",
      "totalPages": 300,
      "publishedDate": "2024-01-15",
      "isbn": "978-1234567890"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalBooks": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 2. Get Book Categories
**Endpoint:** `GET /api/books/categories`
**Authentication:** Not required
**Purpose:** Get list of all book categories

**Response:**
```json
{
  "success": true,
  "categories": [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Biography",
    "Romance",
    "Mystery"
  ]
}
```

### 3. Get Book by ID
**Endpoint:** `GET /api/books/:id`
**Authentication:** Not required
**Purpose:** Get detailed information about a specific book

**Response:**
```json
{
  "success": true,
  "book": {
    "id": "book_id",
    "title": "Book Title",
    "author": "Author Name",
    "category": "Fiction",
    "description": "Detailed book description",
    "coverImage": "image_url",
    "totalPages": 300,
    "publishedDate": "2024-01-15",
    "isbn": "978-1234567890",
    "content": "Full book content or chapters",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1",
        "startPage": 1,
        "endPage": 25
      }
    ]
  }
}
```

---

## 💬 Chat Routes (`/api/chat`)

### 1. Get Chat History
**Endpoint:** `GET /api/chat/:bookId`
**Authentication:** Required
**Purpose:** Get chat history for a specific book

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": "message_id",
      "bookId": "book_id",
      "userId": "user_id",
      "message": "What is the main theme of this book?",
      "response": "The main theme revolves around...",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 2. Send Message
**Endpoint:** `POST /api/chat/:bookId`
**Authentication:** Required
**Purpose:** Send a message/question about a book

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "message": "Can you explain the character development in chapter 5?",
  "context": "Optional context about current reading position"
}
```

**Response:**
```json
{
  "success": true,
  "message": {
    "id": "message_id",
    "bookId": "book_id",
    "userId": "user_id",
    "message": "Can you explain the character development in chapter 5?",
    "response": "In chapter 5, the main character undergoes...",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

## 📖 Reading History Routes (`/api/history`)

### 1. Get Reading History
**Endpoint:** `GET /api/history`
**Authentication:** Required
**Purpose:** Get user's reading history and progress

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "history": [
    {
      "bookId": "book_id",
      "book": {
        "title": "Book Title",
        "author": "Author Name",
        "coverImage": "image_url"
      },
      "currentPage": 150,
      "totalPages": 300,
      "progressPercentage": 50,
      "lastReadAt": "2024-01-15T10:30:00Z",
      "startedAt": "2024-01-10T10:30:00Z",
      "isCompleted": false
    }
  ]
}
```

### 2. Update Reading Progress
**Endpoint:** `PUT /api/history/:bookId`
**Authentication:** Required
**Purpose:** Update reading progress for a specific book

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPage": 175,
  "isCompleted": false,
  "readingTimeMinutes": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "Reading progress updated",
  "progress": {
    "bookId": "book_id",
    "currentPage": 175,
    "progressPercentage": 58.3,
    "isCompleted": false,
    "lastReadAt": "2024-01-15T10:30:00Z"
  }
}
```

### 3. Add Note
**Endpoint:** `POST /api/history/:bookId/notes`
**Authentication:** Required
**Purpose:** Add a note/highlight for a specific book

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "note": "This is an important quote about friendship",
  "page": 87,
  "chapter": "Chapter 5",
  "highlightedText": "Friendship is the only cement that will ever hold the world together",
  "type": "highlight" // or "note"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note added successfully",
  "note": {
    "id": "note_id",
    "bookId": "book_id",
    "note": "This is an important quote about friendship",
    "page": 87,
    "chapter": "Chapter 5",
    "highlightedText": "Friendship is the only cement...",
    "type": "highlight",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Get Notes
**Endpoint:** `GET /api/history/:bookId/notes`
**Authentication:** Required
**Purpose:** Get all notes for a specific book

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "notes": [
    {
      "id": "note_id",
      "bookId": "book_id",
      "note": "This is an important quote about friendship",
      "page": 87,
      "chapter": "Chapter 5",
      "highlightedText": "Friendship is the only cement...",
      "type": "highlight",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 📄 Paper Routes (`/api/paper`)

### 1. Submit Paper
**Endpoint:** `POST /api/paper`
**Authentication:** Required
**Purpose:** Submit a paper for review/grading

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data (if uploading file)
```

**Request Body:**
```json
{
  "title": "Essay on Climate Change",
  "content": "Full essay content here...",
  "subject": "Environmental Science",
  "type": "essay", // or "assignment", "thesis"
  "dueDate": "2024-02-15T23:59:59Z",
  "instructions": "Specific assignment instructions"
}
```

**Or with file upload (Form Data):**
```
title: Essay on Climate Change
subject: Environmental Science
type: essay
paperFile: <uploaded_file>
```

**Response:**
```json
{
  "success": true,
  "message": "Paper submitted successfully",
  "paper": {
    "id": "paper_id",
    "title": "Essay on Climate Change",
    "subject": "Environmental Science",
    "type": "essay",
    "status": "submitted",
    "submittedAt": "2024-01-15T10:30:00Z",
    "fileUrl": "https://example.com/papers/essay.pdf"
  }
}
```

### 2. Get Papers
**Endpoint:** `GET /api/paper`
**Authentication:** Required
**Purpose:** Get all papers submitted by the user

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
?status=submitted&subject=Math&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "papers": [
    {
      "id": "paper_id",
      "title": "Essay on Climate Change",
      "subject": "Environmental Science",
      "type": "essay",
      "status": "graded", // submitted, under_review, graded
      "grade": "A-",
      "score": 87,
      "submittedAt": "2024-01-15T10:30:00Z",
      "gradedAt": "2024-01-18T14:20:00Z",
      "feedback": "Excellent work with minor improvements needed"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalPapers": 25
  }
}
```

### 3. Get Paper by ID
**Endpoint:** `GET /api/paper/:id`
**Authentication:** Required
**Purpose:** Get detailed information about a specific paper

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "paper": {
    "id": "paper_id",
    "title": "Essay on Climate Change",
    "content": "Full essay content...",
    "subject": "Environmental Science",
    "type": "essay",
    "status": "graded",
    "grade": "A-",
    "score": 87,
    "submittedAt": "2024-01-15T10:30:00Z",
    "gradedAt": "2024-01-18T14:20:00Z",
    "feedback": "Excellent work with minor improvements needed",
    "detailedFeedback": {
      "strengths": ["Clear thesis", "Good research"],
      "improvements": ["Better conclusion", "More citations"],
      "rubric": {
        "content": 90,
        "grammar": 85,
        "structure": 88
      }
    },
    "fileUrl": "https://example.com/papers/essay.pdf"
  }
}
```

### 4. Update Paper Feedback (Admin/Teacher)
**Endpoint:** `PUT /api/paper/:id/feedback`
**Authentication:** Required (Admin/Teacher)
**Purpose:** Add feedback and grade to a submitted paper

**Request Body:**
```json
{
  "grade": "A-",
  "score": 87,
  "feedback": "Excellent work with minor improvements needed",
  "detailedFeedback": {
    "strengths": ["Clear thesis", "Good research"],
    "improvements": ["Better conclusion", "More citations"],
    "rubric": {
      "content": 90,
      "grammar": 85,
      "structure": 88
    }
  },
  "status": "graded"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback updated successfully",
  "paper": {
    "id": "paper_id",
    "grade": "A-",
    "score": 87,
    "status": "graded",
    "gradedAt": "2024-01-18T14:20:00Z"
  }
}
```

---

## 🔧 Frontend Integration Examples

### JavaScript/Fetch Examples

#### Login Flow
```javascript
// Step 1: Request OTP
const requestOTP = async (phoneNumber) => {
  const response = await fetch('https://kitabai-backend.onrender.com/api/auth/request-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber })
  });
  return response.json();
};

// Step 2: Verify OTP
const verifyOTP = async (otpId, otp, phoneNumber) => {
  const response = await fetch('https://kitabai-backend.onrender.com/api/auth/verify-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ otpId, otp, phoneNumber })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
  }
  return data;
};
```

#### Authenticated Requests
```javascript
const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('https://kitabai-backend.onrender.com/api/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

const updateReadingProgress = async (bookId, currentPage) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://kitabai-backend.onrender.com/api/history/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ currentPage })
  });
  return response.json();
};
```

### React Hooks Example
```javascript
// Custom hook for API calls
import { useState, useEffect } from 'react';

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://kitabai-backend.onrender.com${url}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
          }
        });
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage in component
const BookList = () => {
  const { data: books, loading, error } = useApi('/api/books');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {books?.books?.map(book => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
};
```

---

## 🚨 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)",
  "code": "ERROR_CODE"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Notes

1. Replace `https://kitabai-backend.onrender.com` with your actual server URL in production
2. Store JWT tokens securely (avoid localStorage in production, consider httpOnly cookies)
3. Always handle errors appropriately in your frontend
4. File uploads use `multipart/form-data` content type
5. Pagination is available for list endpoints (books, papers, history)
6. Some endpoints may require additional middleware (admin access for paper feedback)