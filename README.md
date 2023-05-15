Group 16 - Final Project TheMovieDatabase Website

https://group16-finalproject.herokuapp.com/

https://youtu.be/7fb63wXuKtA


<img src="FINAL.gif" alt="Running screenfetch">


<img width="1407" alt="Screen Shot 2023-05-01 at 8 01 14 PM" src="https://user-images.githubusercontent.com/111597346/235552146-3543fb65-e80d-4e59-9f54-a58a0d5a8558.png">





Our project is a MyMovie project that uses the TMDB API in order to search for and find movies relevant to their search and then users can add these searched movies to their favorites list where they can view them at any time, retrieve more information about the movie or remove it from their favorites list.

/movie This is the main function of our project as it allows users to search for any query and send it to the TMDB api where it will return a list of the most relevant movies to their query, the page will then display the movie image, its title, description, release date, rating and then finally a button to add it to their favorites list.

/addToFavorites This function is the other main function of our project and allows users to add a movie to their favorites list

/removeFromFavorites This function allows users to remove a movie from their favorites list

/getFavorites This function allows users to get their favorites list by taking the stored movie_id and then making a call to the TMDB API in order to pull the relevant information again for each movie in their favorites

/popular This function calls the TMDB API and gets the current most popular movies and displays the first page of results and some relevant information about each movie similar to /movie.

The Home page holds our mission statement about our project.

The Popular page holds the /popular function and displays all of the popular movies

The SearchMovie page allows the user to search for movies based on a query submitted in a form and then allows users to then favorite the movie by clicking the addFavorites button which calls /addFavorites

The Favorites page allows the user to get their favorites with /getFavorites and can then remove a favorited movie with /removeFavorites

The Signin page holds two forms Login and Register which are swapped out for each other, the user can login with both an email and a Google login.

The Signout page logs the user out of the session

The Footer page holds the footer for our project

The NotFound page is our 404 page.









