# Book Review Platform

A full-stack web application for book lovers to discover, review, and rate their favorite books. Built with Next.js, React, TypeScript, and PostgreSQL.

## Features

### Frontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Home Page**: Featured books and platform statistics
- **Book Listing**: Search, filter, and pagination functionality
- **Book Details**: Comprehensive book information with reviews
- **User Profile**: Personal dashboard with review management
- **Review System**: Star ratings and detailed reviews
- **State Management**: React Context for global state

### Backend
- **RESTful API**: Well-structured endpoints following REST principles
- **Data Validation**: Input validation and error handling
- **Database Integration**: PostgreSQL with proper relationships
- **Pagination**: Efficient data loading for large datasets
- **Search & Filtering**: Advanced book discovery features

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL (with SQL scripts provided)
- **State Management**: React Context API
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom components

## API Endpoints

### Books
- \`GET /api/books\` - Retrieve all books with optional search, filter, and pagination
- \`GET /api/books/:id\` - Retrieve a specific book
- \`POST /api/books\` - Add a new book (admin functionality)

### Reviews
- \`GET /api/reviews\` - Retrieve reviews (by book or user)
- \`POST /api/reviews\` - Submit a new review

### Users
- \`GET /api/users/:id\` - Retrieve user profile
- \`PUT /api/users/:id\` - Update user profile

## Database Schema

The application uses PostgreSQL with the following main tables:

- **users**: User profiles and authentication
- **books**: Book information and metadata
- **reviews**: User reviews and ratings
- **review_helpful_votes**: Helpful vote tracking

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd book-review-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up the database**
   
   Create a PostgreSQL database and run the SQL scripts:
   \`\`\`bash
   psql -U your_username -d your_database -f scripts/create-database.sql
   psql -U your_username -d your_database -f scripts/seed-data.sql
   \`\`\`

4. **Configure environment variables**
   
   Create a \`.env.local\` file:
   \`\`\`env
   DATABASE_URL=postgresql://username:password@localhost:5432/bookreviews
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
book-review-platform/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── books/             # Book-related pages
│   ├── profile/           # User profile page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
├── contexts/              # React Context providers
├── types/                 # TypeScript type definitions
├── scripts/               # Database scripts
└── README.md
\`\`\`

## Key Features Implementation

### State Management
The application uses React Context API for state management with three main contexts:
- **BookContext**: Manages book data and operations
- **ReviewContext**: Handles review operations
- **UserContext**: Manages user authentication and profile

### Search and Filtering
- Real-time search across book titles, authors, and genres
- Genre-based filtering
- Rating-based filtering
- Pagination for large datasets

### Review System
- 5-star rating system
- Detailed text reviews
- Helpful vote tracking
- User review history

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

## Error Handling

The application implements comprehensive error handling:
- API error responses with appropriate HTTP status codes
- Frontend error boundaries and loading states
- Input validation on both client and server
- User-friendly error messages

## Performance Optimizations

- **Pagination**: Efficient data loading
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Caching**: API response caching strategies

## Testing

To run tests (when implemented):
\`\`\`bash
npm test
\`\`\`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Manual Deployment
1. Build the application: \`npm run build\`
2. Start the production server: \`npm start\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- User authentication with NextAuth.js
- Book recommendation system
- Social features (following users, book clubs)
- Advanced search with Elasticsearch
- Mobile app with React Native
- Admin dashboard for content management
- Email notifications for new reviews
- Book wishlist functionality
- Reading progress tracking
- Integration with external book APIs


