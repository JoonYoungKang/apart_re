import React from 'react';

function SearchBar() {
  return (
    <form action="#" method="get">
      <input type="text" id="search" name="search" placeholder="검색어 입력..." aria-label="검색어" required />
      <button type="submit">검색</button>
    </form>
  );
}

export default SearchBar;
