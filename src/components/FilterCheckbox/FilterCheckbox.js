import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__container">
        <input className="filter-checkbox__invisible-checkbox" name="shortfilms" type="checkbox" />
        <span className="filter-checkbox__visible-checkbox"></span>
        <span className="filter-checkbox__name">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;