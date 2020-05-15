The objective of the project is to design and code a system to manage
a list of favorite music albums. By performing CURD operations
 The project consists of 3 parts: 
1. Creating a Database
2. Creating a Node server
3. Creating a React component
* A Node server with a PostgeSQL database to store the favorite list. The server provides a REST API to access the database
* A React client for user interface. It consists of 2 parts:
- A component to display the favorite album list obtained from the Node server. 
- A component to search music albums from the music distributing service called Discogs.com. 
The search results are displayed. The user can add selected albums from Discogs to its favorite list. 
So this component must also interface with the Node server API to add an album to the favorite list.