import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from './Context'
import SearchBox from './SearchBox'

const Movies = () => {
  const { movieData } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0)
    MoviesValid();
  }, [])

  const MoviesValid = async () => {
    let token = localStorage.getItem('userdatatoken')
    console.log(token);
    const res = await fetch("http://localhost:8000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token
      }
    })
    const data = await res.json();
    if (data.status === 401 || !data  || !token) {
      navigate("/login")
    }
    else {
      console.log("USer verify")
    }
  }
 

  return (
    <>
      <SearchBox />
      <section className="movie-page">
        <div className="movie-container grid">
          {movieData.map((currMovie) => {
            const { imdbID, Title, Poster } = currMovie;
            const movieName = Title.substring(0, 15)
            return <>

              <div className="card text-center" style={{ width: '18rem' }}>
                <div className="card-info">
                  <h2 className='title'>{movieName.length >= 15 ? `${movieName}...` : movieName}</h2>
                  <img src={Poster} alt={imdbID} className="movie-img" />
                </div>
                <button onClick={() =>
                  navigate(`/movies/${imdbID}`)} className="btn btn-dark mt-3">Show Details</button>
              </div>
            </>
          }
          )}
        </div>
      </section>

    </>
  )
}

export default Movies