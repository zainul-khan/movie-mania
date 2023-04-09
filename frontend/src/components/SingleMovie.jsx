import React, { useEffect,useState } from 'react'
import {API_URL} from './Context'
import { useParams, useNavigate} from 'react-router-dom';

const SingleMovie = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState("");

  const getSingleMovie = async (url)=>{
    const token = localStorage.getItem("userdatatoken")
    const validateToken = await fetch("http://localhost:8000/validuser",{
      method:"GET",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":token

      }
    })
    const getData = await validateToken.json();
    if(getData===401 || !getData || !token){
      navigate("/login")
    }else{
    setIsLoading(true);
      try {
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
          if(data.Response === "True"){
              setIsLoading(false)
              setMovieData(data)
          }
      } catch (error) {
          console.log(error)
      }
  }
  }
    useEffect(()=>{
        //setTImeout so that our page don't do multiple request ie for debouncing
        let timerOut = setTimeout(()=>{
          window.scrollTo(0, 0);
          getSingleMovie(`${API_URL}&i=${id}`);
        }, 500)

        //this will return the final result and clearing the prev results
        return ()=> clearTimeout(timerOut)
    },[id])
 
  if(isLoading){
    return(
      <div>
        <div className="loading">Loading...</div>
      </div>
    )
  }
  return (
    <div className="movie-container">
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movieData.Poster} alt="" className='moviecard-img'/>
        </figure>
        <div className="card-content">
          <p className="title">{movieData.Title}</p>
          <p className="card-text">{movieData.Actors}</p>
          <p className="card-text">{movieData.Released}</p>
          <p className="card-text">{movieData.Genre}</p>
          <p className="card-text">{movieData.imdbRating}/10</p>
          <p className="card-text">{movieData.Plot}</p>
          <p className="card-text">{movieData.Country}</p>
          <button onClick={() => navigate('/')} className="btn btn-danger">Home</button>
          </div>
      </div>
    </section>
    </div>
  )
}

export default SingleMovie