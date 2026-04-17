#  Huntrix – GitHub Profile Explorer & Battle App

Huntrix is a web-based application that allows users to search GitHub profiles and compare two users in a “Battle Mode” based on their GitHub statistics.

---

##  Features

###  Search Mode
- Search any GitHub username
- View:
  - Avatar
  - Name
  - Bio
  - Followers
  - Public Repositories
  - Total Stars
  - Join Date
- Latest repositories displayed
- Handles invalid usernames gracefully

###  Battle Mode
- Compare two GitHub users
- Displays:
  - Followers count
  - Total no.of repositories to declare the winner
- Highlights:
  -  Winner (Green color)
  -  Loser  (Red color)
  -  Draw   (Blue color)

###  UI Features
- Dynamic theme switching:
  - Calm UI for Search Mode
  - Cinematic fire-themed UI for Battle Mode
- Responsive layout
- Animated background effects
- Clean and modern card design

---

##  Tech Stack

- HTML
- CSS 
- JavaScript 
- GitHub REST API

---

## 🔗 API Used

- https://api.github.com/users/{username}
- https://api.github.com/users/{username}/repos

---

##  How It Works

1. User inputs a GitHub username
2. App fetches data using GitHub API
3. Displays profile details dynamically
4. In battle mode:
   - Fetches both users
   - Calculates total stars
   - Compares and declares result

---

##  Key Concepts Used

- Async/Await
- Fetch API
- DOM Manipulation
- Conditional Rendering
- Event Handling
- Dynamic UI updates
- Error Handling

---

##  Error Handling

- Handles 404 (User Not Found)
- Displays loading state during API calls
- Prevents UI crashes

---

## Live Demo
 
 Vercel : https://huntrix-theta.vercel.app/ 

---

##  Author

- Kondreddy Geethika
- Developed as part of an internship project at **Prodesk IT Solutions**

---

