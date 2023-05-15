import React from 'react';
import Footer from './Footer';

export default function Home() {
    return(
        <div>
            <h1>MyMovie Database Project</h1>
            <h2>Mission Statement</h2>
            <p>Our project is a simple React based website which allows for the user to have access to an on demand list of the most popular movies currently
                however in order to see the rest of the functionality of our site, users need to be signed in first using either an existing email or Gmail account
                after which users will then be able to search for movies based on a search query. If a user sees a movie they like, they can add it to their favorites
                list which can be accessed at any time from their favorites page. On their favorites page, users can view their favorites or remove from their favorites
                in addition to seeing a trailer for the movie.
            </p>
            <Footer></Footer>
        </div>
    )
}
