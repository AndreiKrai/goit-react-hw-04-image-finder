import PropTypes from 'prop-types';
import { useState } from 'react';

export function Searchbar ({onSubmitSearch}) {
const[search,setSearch]=useState('')

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitSearch(search);
    setSearch('');
  };


const handleChange  = e => {
  const{value}=e.target
  setSearch(value.toLowerCase());
};

 
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm_button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input 
          onChange={handleChange}
          name="search"
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
  }


Searchbar.propType={onSubmitSearch:PropTypes.func.isRequired}