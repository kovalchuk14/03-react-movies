//import { useState } from 'react'
import './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>();

  async function hendleSubmit(title: string) {
    setMovies([]);
    setIsLoading(true);
    setIsError(false);
    try { 
      const movieList: Movie[] = await fetchMovies(title);
      console.log(movieList);
      setMovies(movieList);
    } catch (error) { 
      console.log(error);
      setIsError(true);
    }
    setIsLoading(false);
  }

  function openCard(movie: Movie) {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  }

  function closeCard() {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }


  return (
    <>
      <SearchBar onSubmit={hendleSubmit} />
      {movies.length > 0 && <MovieGrid onSelect={openCard} movies={movies}/>}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      { (isModalOpen && selectedMovie) && <MovieModal  movie={selectedMovie} onClose={closeCard}/>}
    </>
  );
}

export default App
