import React from 'react'
import { useGlobalContext } from './Context'

const SearchBox = () => {
  const { query, setQuery, isError } = useGlobalContext();
  return (
    <>
      <section className="search-section">
        <h2 className='text-center'>Search Your Favourite Movie</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input type="text" placeholder='Search here' value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }} />
          </div>
        </form>
        <div className="card-error">
          <p>{isError.showErr && isError.msg}</p>
        </div>
      </section>
    </>
  )
}

export default SearchBox