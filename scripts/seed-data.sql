-- Seed data for Book Review Platform

-- Insert sample users
INSERT INTO users (name, email, password_hash, bio, favorite_genres) VALUES
('John Doe', 'john.doe@example.com', '$2b$10$example_hash_1', 'Avid reader and book enthusiast who loves exploring different genres.', ARRAY['Fiction', 'Science Fiction', 'Mystery']),
('Jane Smith', 'jane.smith@example.com', '$2b$10$example_hash_2', 'Literature professor with a passion for classic novels and contemporary fiction.', ARRAY['Fiction', 'Romance', 'Biography']),
('Mike Johnson', 'mike.johnson@example.com', '$2b$10$example_hash_3', 'Science fiction fan and technology enthusiast.', ARRAY['Science Fiction', 'Fantasy', 'Non-Fiction']),
('Sarah Wilson', 'sarah.wilson@example.com', '$2b$10$example_hash_4', 'Mystery lover and amateur detective story writer.', ARRAY['Mystery', 'Thriller', 'Crime']),
('David Brown', 'david.brown@example.com', '$2b$10$example_hash_5', 'Fantasy enthusiast and role-playing game master.', ARRAY['Fantasy', 'Adventure', 'Mythology']);

-- Insert sample books
INSERT INTO books (title, author, genre, description, cover_image, published_date, isbn, page_count, featured) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway and his mysterious neighbor Jay Gatsby.', '/placeholder.svg?height=400&width=300', '1925-04-10', '978-0-7432-7356-5', 180, true),

('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch as her father defends a black man falsely accused of rape.', '/placeholder.svg?height=400&width=300', '1960-07-11', '978-0-06-112008-4', 324, true),

('1984', 'George Orwell', 'Science Fiction', 'A dystopian social science fiction novel that explores the consequences of totalitarianism, mass surveillance, and repressive regimentation of persons and behaviors.', '/placeholder.svg?height=400&width=300', '1949-06-08', '978-0-452-28423-4', 328, true),

('Pride and Prejudice', 'Jane Austen', 'Romance', 'A romantic novel that critiques the British landed gentry at the end of the 18th century, following Elizabeth Bennet as she deals with issues of manners, upbringing, morality, and marriage.', '/placeholder.svg?height=400&width=300', '1813-01-28', '978-0-14-143951-8', 432, true),

('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 'A controversial novel that follows Holden Caulfield, a teenager from New York City, who is expelled from his prep school and then takes a journey around his hometown.', '/placeholder.svg?height=400&width=300', '1951-07-16', '978-0-316-76948-0', 277, false),

('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', 'An epic high fantasy novel that follows the quest to destroy the One Ring and defeat the Dark Lord Sauron, featuring hobbits, elves, dwarves, and men in Middle-earth.', '/placeholder.svg?height=400&width=300', '1954-07-29', '978-0-544-00341-5', 1216, true),

('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 'Fantasy', 'The first novel in the Harry Potter series, following a young wizard''s journey as he learns about his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.', '/placeholder.svg?height=400&width=300', '1997-06-26', '978-0-7475-3269-9', 223, true),

('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 'A children''s fantasy novel that follows Bilbo Baggins, a hobbit who embarks on an unexpected adventure with a group of dwarves to reclaim their mountain home from a dragon.', '/placeholder.svg?height=400&width=300', '1937-09-21', '978-0-547-92822-7', 366, true),

('Dune', 'Frank Herbert', 'Science Fiction', 'A science fiction novel set in the distant future amidst a feudal interstellar society, following Paul Atreides as he leads a rebellion to free his desert world from the emperor''s rule.', '/placeholder.svg?height=400&width=300', '1965-08-01', '978-0-441-17271-9', 688, false),

('The Handmaid''s Tale', 'Margaret Atwood', 'Science Fiction', 'A dystopian novel set in a near-future New England where a fundamentalist theocratic regime has overthrown the United States government, focusing on the subjugation of women.', '/placeholder.svg?height=400&width=300', '1985-08-17', '978-0-385-49081-8', 311, true),

('Gone Girl', 'Gillian Flynn', 'Mystery', 'A psychological thriller about a marriage gone terribly wrong, told through the perspectives of both husband and wife as dark secrets are revealed.', '/placeholder.svg?height=400&width=300', '2012-06-05', '978-0-307-58836-4', 419, false),

('The Girl with the Dragon Tattoo', 'Stieg Larsson', 'Mystery', 'A crime thriller featuring journalist Mikael Blomkvist and hacker Lisbeth Salander as they investigate a wealthy family''s dark secrets.', '/placeholder.svg?height=400&width=300', '2005-08-01', '978-0-307-26975-1', 590, false),

('The Alchemist', 'Paulo Coelho', 'Fiction', 'A philosophical novel about a young Andalusian shepherd who travels from Spain to Egypt in search of a treasure, learning about following one''s dreams along the way.', '/placeholder.svg?height=400&width=300', '1988-01-01', '978-0-06-112241-5', 163, true),

('Brave New World', 'Aldous Huxley', 'Science Fiction', 'A dystopian novel set in a futuristic World State where citizens are environmentally engineered into an intelligence-based social hierarchy.', '/placeholder.svg?height=400&width=300', '1932-01-01', '978-0-06-085052-4', 268, false),

('The Kite Runner', 'Khaled Hosseini', 'Fiction', 'A story of friendship, guilt, and redemption set against the backdrop of Afghanistan''s tumultuous history from the 1970s to the early 2000s.', '/placeholder.svg?height=400&width=300', '2003-05-29', '978-1-59448-000-3', 371, true);

-- Insert sample reviews
INSERT INTO reviews (book_id, user_id, rating, title, content) VALUES
(1, 1, 5, 'A timeless masterpiece', 'The Great Gatsby is a beautifully written novel that captures the essence of the American Dream and its ultimate futility. Fitzgerald''s prose is elegant and the characters are complex and memorable. The symbolism throughout the book is rich and thought-provoking.'),

(1, 2, 4, 'Great read, but overhyped', 'While I enjoyed the book and appreciate its literary significance, I found some parts slow-paced. The symbolism is rich and the ending is powerful, but I don''t think it quite lives up to all the hype surrounding it.'),

(1, 3, 3, 'Decent classic', 'It''s a well-written book with beautiful language, but I struggled to connect with the characters. The themes are important and relevant, but the pacing felt uneven to me.'),

(2, 1, 5, 'Powerful and moving', 'Harper Lee created a masterpiece that deals with serious themes while remaining accessible. The character development is exceptional and the moral lessons are timeless. Scout''s perspective makes difficult topics approachable.'),

(2, 4, 5, 'Essential reading', 'This book should be required reading for everyone. It tackles racism, justice, and morality with incredible skill. Atticus Finch is one of literature''s greatest characters, and the story is both heartbreaking and inspiring.'),

(3, 3, 5, 'Chillingly relevant', 'Orwell''s vision of a totalitarian future feels more relevant than ever. The concepts of doublethink, newspeak, and Big Brother have become part of our cultural vocabulary for good reason. A must-read dystopian novel.'),

(3, 2, 4, 'Thought-provoking dystopia', 'A dark and disturbing look at what society could become. While sometimes heavy-handed, the book''s warnings about surveillance and authoritarianism are important and well-executed.'),

(4, 2, 5, 'Austen at her finest', 'Pride and Prejudice is a perfect blend of romance, social commentary, and wit. Elizabeth Bennet is a wonderful protagonist, and the relationship between her and Darcy is beautifully developed.'),

(4, 1, 4, 'Charming romance', 'A delightful read with memorable characters and sharp social observations. Austen''s wit shines throughout, though some of the social conventions feel dated to modern readers.'),

(6, 5, 5, 'Epic fantasy at its best', 'Tolkien created an entire world with its own languages, cultures, and history. The Lord of the Rings is the gold standard for epic fantasy, with unforgettable characters and a timeless story of good versus evil.'),

(6, 3, 4, 'Impressive world-building', 'The depth of Tolkien''s world-building is incredible, though the pacing can be slow at times. The themes of friendship, sacrifice, and hope make it a rewarding read despite its length.'),

(7, 5, 5, 'Magical beginning', 'The book that started it all! Rowling created a magical world that feels real and characters that readers care about deeply. Perfect for both children and adults.'),

(7, 1, 4, 'Great start to the series', 'A wonderful introduction to the wizarding world. While not as complex as later books in the series, it establishes the characters and world beautifully.'),

(10, 2, 4, 'Disturbing but important', 'Atwood''s dystopian vision is terrifying in its plausibility. The book serves as a powerful warning about women''s rights and religious extremism.'),

(13, 1, 4, 'Inspiring journey', 'A simple but profound story about following your dreams. Coelho''s writing is accessible and the message is universal, though sometimes the philosophy feels a bit heavy-handed.');

-- Insert some helpful votes
INSERT INTO review_helpful_votes (review_id, user_id) VALUES
(1, 2), (1, 3), (1, 4), (1, 5),
(2, 1), (2, 3), (2, 5),
(3, 2), (3, 4),
(4, 2), (4, 3), (4, 5),
(5, 1), (5, 2), (5, 3),
(6, 1), (6, 2), (6, 4), (6, 5),
(7, 1), (7, 5),
(8, 1), (8, 3), (8, 4), (8, 5),
(9, 3), (9, 4),
(10, 1), (10, 3), (10, 4),
(11, 1), (11, 2),
(12, 2), (12, 3), (12, 4),
(13, 2), (13, 3),
(14, 1), (14, 3), (14, 5),
(15, 2), (15, 3);
