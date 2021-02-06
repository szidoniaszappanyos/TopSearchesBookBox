# TopSearchesBookBox
https://docs.google.com/presentation/d/1EbhjMk-fQoWvnnVeglMVn8BnhMT2dnz0YBcsID7cit8/edit?usp=sharing

Application counts accesses of users to book volumes and categories. Keeps track of the top searches in the BookBox app.


This is a NodeJs app. It uses express. 
It connects to a mongoDb through mongoose.

There are requests for book volumes and categories.
When a user navigates to the detailed page of a book, requests are sent to this server.

The server stores each book volume id and each category and increments them each time any user accesses them.

There are get requests available, for retrieving all data from the db for book volumes and categories.

User creation is also available.
