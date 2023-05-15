import React, {useState} from "react";
import axios from "axios";
import Footer from "./Footer"; // import the Footer component
import { auth } from "../firebase"; //Checking for Signin Status
import {useNavigate} from 'react-router-dom'
import "../App.css";
import "./table.css";

const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

export default function SearchMovie() {
  let [query, setQuery] = useState("");
  let [response, setResponse] = useState("");
  let [data, setData] = useState(null);
  let [movie_id, setMovieID] = useState("");
  let [authCheck, setAuthCheck] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  let addToFavorites = (e) => {
    e.preventDefault();

    let getAuthCheck = () => {
        return authCheck
    }

    var token = getAuthCheck();

    axios.post('http://localhost:5678/addToFavorites',
    {
        movie_id: movie_id,
        token: token
    })
    .then(function (response) {
        if(response.data.movie_id === -1){
            alert("Already Favorited");
        }
        setError(false);
    })
    .catch(function (error) {

        setError(true);
    })
    .then(function () {
    })
  }

  let sendQuery = (e) => {
    auth.onAuthStateChanged(user =>{
        if (user)
        {
            setAuthCheck(user.uid);
        }
        else 
        {
            setAuthCheck(-1);
            navigate('/Signin', { replace: true });
        }
    })

      e.preventDefault();
      setError(null);
      axios.get('http://localhost:5678/movie',
          {
              params: { query }
          })
          .then(function (response) {
            setError(false);
            setData(response.data.results);
            setResponse(response.data);
          })
          .catch(function (error) {
            setResponse(error);
            setError(true);
          })
          .then(function () {
          })
  }

  let favoritesRequest = e => {
    e.preventDefault();
    movie_id = (e.target.value);
    addToFavorites(e);
  }

  return (
    <div>
      <div>
          <br />
          <>
          <form onSubmit={sendQuery}>
              <label htmlFor="query">Query: </label>
              <input type="text" id="query" name="query" value={query} onChange={(e) => {setQuery(e.target.value)}} />
              <br />
              <br />
              <button>{"Search"}</button>
              {error && <p style={{color: 'red', 'fontWeight': 'bold'}}>{response.message}</p>}
              <div><p style={{color: 'green', 'fontWeight': 'bold'}}>{response.data}</p></div>
          </form>
          <div>
              {data && (!data.length || data.length === 0) && <p>No results found!</p>}
              {data && data.length > 0 && <>
                  <br />
                  <table className="movie-table">
                      <thead>
                          <tr>
                              <th>Icon</th>
                              <th>Title</th>
                              <th>Description</th>
                              <th>Release Date</th>
                              <th>Rating</th>
                              {authCheck && authCheck !== -1 && <th>Favorite</th>}
                          </tr>
                      </thead>
                      <tbody>
                          {data.map(info => {
                              return (
                                  <tr key={info.id}>
                                      <td>{<img alt="Movie Poster" src={getImage(info.poster_path)} />}</td>
                                      <td>{info.original_title}</td>
                                      <td>{info.overview}</td>
                                      <td>{info.release_date}</td>
                                      <td>{info.vote_average}</td>
                                      {authCheck && authCheck !== -1 && <td>{<button type="button" value={info.id} onClick={(e) => {favoritesRequest(e)}}>{"Favorite"}</button>}</td>}
                                  </tr>
                              )
                          })}
                      </tbody>
                  </table>
              </>}
          </div>
          </>
      </div>
      <Footer />
      </div>
  )
}