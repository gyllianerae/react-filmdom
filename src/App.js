import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com?apikey=61652765';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);   
    }

    const movie1 = {
        "Title": "Frozen River",
        "Year": "2008",
        "imdbID": "tt0978759",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTk2NjMwMDgzNF5BMl5BanBnXkFtZTcwMDY0NDY3MQ@@._V1_SX300.jpg"
    }
    
    useEffect(() => {
        searchMovies('Frozen'); 
    }, []);

    return(
        <div className='app'>
            <h1>FilmDom</h1>
            <div className='search'>
                <input 
                placeholder='search for movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon} 
                alt='search'
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>no movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;