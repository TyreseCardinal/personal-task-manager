# personal-task-manager

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Task/Project Management Application Overview This is a personal task/project management application built with Vue 2 for the front end and a Flask API for the back end. The app is designed to help manage tasks and projects efficiently while practicing full-stack web development skills. The project is structured for potential scalability, making it suitable for anyone who might want to use it in the future.

Project Structure markdown Copy code

Vue 2 (Front End)
src
assets
Logo.png
components
CreateTask.vue
DayTick.vue
EventTick.vue
ProfilePicture.vue
SideBar.vue
TaskList.vue
Timeline.vue
plugins
axios.js
cookies.js
router
index.js
services
auth.js
styles
fonts
Poppins
scss
_variables.scss
DayTick.scss
EventTick.scss
global.scss
homeview.scss
Login.scss
Profile.scss
sidebar.scss
Timeline.scss
TimelineView.scss
utils
auth.js
views
HomeView.vue
Login.vue
Profile.vue
Register.vue
TimelineView.vue
App.vue
main.js
.browserlistrc
.gitignore
jsconfig.json
package-lock.json
package.json
README.md
vue.config.js Key Features Authentication The application uses JWT (JSON Web Tokens) for authentication. The main functionalities related to authentication include:
Login: Users can log in with their email and password, with an option to stay signed in. Logout: Users can log out, which clears the authentication tokens. Token Management: The app handles access and refresh tokens using cookies. Token Expiration Check: Before making API requests, the app checks if the access token is expired. If expired, it attempts to refresh the token. Token Expiration Check The utils/auth.js file contains the isTokenExpired function that checks if a JWT token has expired. This is done by decoding the token and comparing the expiration time with the current time.

javascript Copy code import { jwtDecode } from 'jwt-decode'; // Import the named export

export function isTokenExpired(token) { if (!token) return true; // Consider no token as expired

try { const decodedToken = jwtDecode(token); // Decode the JWT token const currentTime = Date.now() / 1000; // Get current time in seconds

return decodedToken.exp < currentTime; // Return true if token has expired
} catch (error) { return true; // In case of an error, treat token as expired } } Components The application consists of several reusable components:

SideBar: Contains navigation links and a logout button. Login: The login form for user authentication. Profile: Displays user profile information. TimelineView: Shows tasks and projects in a timeline format. Installation Clone the repository. Navigate to the project directory. Install dependencies using: bash Copy code npm install Run the development server: bash Copy code npm run serve Contributing Contributions are welcome! Feel free to submit a pull request or open an issue for any feature requests or bugs.

License This project is licensed under the MIT License.

Feel free to adjust the details to match your project's specific requirements and features! If there are any additional sections you’d like to add or modify, let me know!