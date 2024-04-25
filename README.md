# Applied Project & Minor Dissertation
This repository contains final-year project work for the Applied Project & Minor Dissertation at Atlantic Technology University. 
# ConnectSphere
ConnectSphere is a social media platform designed to facilitate connections, conversations, and content sharing among users. It provides feautres for user authentication, posting content, following other users, real-time chats and notifications.

- client: This folder contains the frontend code for the web application.
- server: This folder contains the backend code for the web application.
- dissertation: This folder contains the final report work in Latex format.
- Dissertation.pdf: PDF of the final report. 
- Screencast_Link.pdf: A PDF with a link to a screencast demonstrating the working software.
- README.md: This file briefly summarizes the project. 

<h2>Features </h2>

1. User authencation: Secure login and registration with token-based authentication.
2. Content posting: Users can create, edit, and delete images, videos, gifs, and text.
3. User interaction: Ability to like/dislike posts, follow/unfollow other users, and receive notifications. 
4. Real-time chats: Live chat features that allow you to send and receive messages as well as join rooms.
5. Notification: Users receive real-time notifications for likes.
6. Search functionality: Search users by username with responsive search results.
7. User profiles: View user profiles with important details and follower counts.
8. Messages: Users can send, receive and delete messages.


<h2>Technologies Used</h2>

* React.js: The frontend was developed using React.

* Material-UI: The application's design was made more visually appealing using Material-UI.

* Redux: Redux was used to manage state.

* Dropzone: Manages the file upload.

* Multer: After uploading is complete, Multer saves files.

* JSON Web Token: Authorized access is guaranteed by JSON web tokens.

* Socket.Io: Socket.Io enabled real-time communication.

* Node.js: The backend was built using Node.js

* MongoDB: MongoDB served as the database management system.

* Jira: Jira was used to manage the project.

* Render: Render was used to deploy the project.

<h2>Instructions</h2>

* Ensure that Node.js and npm are installed on your system

* Clone the project repository from your system.

```bash
git clone https://github.com/davidamankwah/Final_YearProject.git
cd Final_YearProject
```
* Navigate to the project directory in the terminal.

```bash
cd client
cd server
```
* Rum 'npm install' to install project dependencies for both client and server.
 
 ```bash
npm install
```

<h3>Running the project: </h3>

* Start the server by running the follwing command in the backend directory. 

 ```bash
nodemon index.js
```

* Start the client by running the follwing command in the frontend directory. 

 ```bash
npm start
```

* The application runs in the web browser at 'http://localhost:3000'.

<h3>Cloud Deployment</h3>

* Access the ConnectSphere application through Render.com, see [this link](https://frontend-dnnx.onrender.com/).

## Author
<b>David Amankwah - G00394825</b>

## Resources

Provided links to resources used:

[Learn Socket.IO](https://www.youtube.com/watch?v=djMy4QsPWiI)

[Learn JWT](https://www.youtube.com/watch?v=KgXT63wPMPc)
