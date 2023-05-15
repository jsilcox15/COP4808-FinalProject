import React, {useState} from "react";
import axios from "axios";
import Footer from "./Footer"; // import the Footer component
import { auth } from "../firebase"; //Checking for Signin Status
import {useNavigate} from 'react-router-dom'
import "../App.css";
import "./table.css";

const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;


export default function Favorites() {
    let [response, setResponse] = useState("");
    let [data, setData] = useState(null);
    let [movie_id, setMovieID] = useState("");
    let [authCheck, setAuthCheck] = useState("");

    const navigate = useNavigate();

    let getAuthCheck = () => {
        return authCheck
    }
  
    const [error, setError] = useState(null);
  
    auth.onAuthStateChanged(user =>{
        if (user)
        {
            setAuthCheck(user.uid);
        }
        else 
        {
            setAuthCheck(-1);
            navigate('http://localhost:5678/Signin', { replace: true });
        }
    })

    let removeFromFavorites = (e) => {
      e.preventDefault();
      
      var token = getAuthCheck();

      console.log(movie_id);
      axios.delete('http://localhost:5678/removeFromFavorites',
      {
        data: {
            movie_id: movie_id,
            token: token
        }
      })
      .then(function (response) {
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
                navigate('http://localhost:5678/Signin', { replace: true });
            }
        })
        
        var token = getAuthCheck();

          e.preventDefault();
          setError(null);
          axios.get('http://localhost:5678/getFavorites',
              {
                  params: { token }
              })
              .then(function (response) {
                setError(false);
                console.log(response.data)
                setData(response.data);
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
    console.log(e.target.value);
    movie_id = (e.target.value);
    console.log(movie_id);
    removeFromFavorites(e);
    }

    return (
        <div>
      <div>
          <br />
          <>
          <form onSubmit={sendQuery}>
              <button>{"View Favorites"}</button>
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
                                      {authCheck && authCheck !== -1 && <td>{<button type="button" value={info.id} onClick={(e) => {favoritesRequest(e)}}>{"Remove"}</button>}</td>}
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