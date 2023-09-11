import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
        <MoreMovies />
      </main>
      <Footer />
    </>
  );
}

export default Movies;