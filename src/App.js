import React, { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import './App.css'
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com?apikey=c1051385'

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm , setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search)
    }

    useEffect(() =>{
        searchMovies('shrek')
    },[])

    return(
        <div className="app">
            <h1>MovieCloud</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie => (
                            <MovieCard movie={movie} />
                        )))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div> 
            )}

        </div>
    );
}

export default App