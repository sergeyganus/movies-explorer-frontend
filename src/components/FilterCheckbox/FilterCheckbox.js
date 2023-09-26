import './FilterCheckbox.css';

function FilterCheckbox({ shortMovies, onChange }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__container">
        <input
          className="filter-checkbox__invisible-checkbox"
          name="shortMovies"
          type="checkbox"
          value={shortMovies}
          onChange={onChange}
          checked={shortMovies}
        />
        <span className="filter-checkbox__visible-checkbox"></span>
        <span className="filter-checkbox__name">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;