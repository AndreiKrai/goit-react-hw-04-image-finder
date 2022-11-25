import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmitSearch, onChange, search }) => {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmitSearch}>
        <button type="submit" className="SearchForm_button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={onChange}
          name="searchName"
          className="SearchForm-input "
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
        />
      </form>
    </header>
  );
};

Searchbar.propType = {
  onSubmitSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  search: PropTypes.string,
};
