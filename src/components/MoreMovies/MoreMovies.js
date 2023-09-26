import './MoreMovies.css';

function MoreMovies({ isActive, onAddMoreMovies }) {
  return (
    <section className={`more-movies ${isActive ? 'more-movies_active' : ''}`} aria-label="Загрузить больше фильмов">
      <button className="more-movies__button" type="button" onClick={onAddMoreMovies}>Ещё</button>
    </section>
  );
}

export default MoreMovies;