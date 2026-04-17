## Prompts Used

1. I'm trying to fetch GitHub user data using the API, but nothing is showing on the UI even though the API is returning data in the console. I think my displayUser function is not updating the DOM correctly. Can you help me check if I'm assigning the values properly to elements like avatar, name, and bio?

2. My error handling is not working properly. When I enter a username that doesn’t exist, the app just stays blank instead of showing my error message. I think I’m not handling response.ok correctly. Can you help me fix this so it shows "User Not Found" properly?

3. I added a loading state, but it behaves inconsistently. Sometimes it stays even after the data is loaded. I think my try-catch-finally structure might be wrong. Can you help me fix the logic so loading appears only while fetching?

4. I’m fetching repositories, but I only want to show the latest 5. Right now it's showing everything. How do I sort the repos based on created date and slice only the top 5 correctly?

5. For battle mode, I can fetch both users separately, but I’m not sure how to structure the logic to compare them cleanly. How do I handle both API responses together and decide the winner based on followers or stars?

6. I’m trying to calculate total stars from all repositories, but I’m confused about how to sum stargazers_count from the repos array. Is using reduce the correct approach here?

7. My winner logic is not consistent. Sometimes both users render without a clear result. How do I compare values properly and dynamically assign winner/loser styles based on the result?

8. My background is not switching properly between search mode and battle mode. The fire animation is still visible in search mode. I think my CSS is overlapping. How do I control styles properly using body classes so each mode stays independent?  