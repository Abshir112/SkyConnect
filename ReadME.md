# Web Application for Posts Display

## Overview

This project involves developing a comprehensive web application that showcases posts, user profiles, comments, and includes a navigation system. The application will dynamically fetch data and use a responsive flexbox design to provide an engaging user experience.

## Features and Requirements

### Posts Display

- Dynamically load and display posts with details such as ID, title, body, userId, tags, and reaction count.
- Implement either pagination or infinite scrolling to manage the loading of posts.

### Navigation Bar

- Develop a responsive navigation bar with links to various sections like Home, Posts, etc., which will be visible at the top of all pages.

### Home Page

- The Home page should succinctly describe the application's purpose and offer user instructions.

### Posts Page

- Display a list of posts, with each post featuring:
  - A title
  - Body text
  - Username (hint: consider how to derive the username from the userId)
- Attach associated comments to their respective posts.

### Error Handling and Feedback

- Implement error handling for network request failures.
- Provide feedback for empty states or errors to improve user experience.

## Technical Requirements

### 1. HTML

- Use structured markup for creating posts, user profiles, comments, navigation elements, and a contact form.
  - The contact form must include fields for "Name," "Email," a "Send" button, and a checkmark for "confirm to send."
- Employ semantic HTML tags throughout the application.

### 2. CSS

- Utilize flexbox or grid layouts for responsive design.
- Apply styling to enhance the visual appeal and usability across different devices.

### 3. JavaScript

- **Fetch Post Data:** Use `fetch` to retrieve posts from https://dummyjson.com/posts.
- **Fetching Comments:** Use `fetch` to obtain comments from https://dummyjson.com/comments.
- **Displaying Comments:** Develop functionality to append comments to the respective post.
- **Fetching User Data:** Use `fetch` to get user profiles from https://dummyjson.com/users.
- **Linking Posts to User Profiles:** Integrate functionality where clicking a username in a post displays a modal with the user's profile information from the "users" endpoint.
- **User Objects:** Post-fetching, re-organize users into either an object or a class for better management.
- **Validate the Contact Form:** Ensure the contact form is validated upon submission:
  - The name field must not contain numbers.
  - The email must include "@" and ".".
  - The checkmark must be checked for the form submission button to be clickable.

## Conclusion

This project aims to build a dynamic and responsive web application that enhances user engagement through effective display and management of posts, user profiles, and comments. By adhering to the specified technical requirements, I created a user-friendly and aesthetically pleasing application.
