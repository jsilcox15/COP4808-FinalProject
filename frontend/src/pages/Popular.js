import React from 'react';
import axios from 'axios';
import Footer from './Footer';

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5678/popular`)
      .then(res => {
        const movies = res.data.results;
        this.state.movies = [];
        this.setState({ movies, isLoading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { movies, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Popular Movies</h1>
        <div className="movies-container">
          {movies.map(movie => (
            <div key={movie.id} className="movie">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Popular;
