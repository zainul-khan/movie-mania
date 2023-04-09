import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img1 from '../images/1.jpeg'
import img2 from '../images/2.jpeg'
import img3 from '../images/3.jpg'
import img4 from '../images/4.jpg'
import img5 from '../images/5.jpg'
import img6 from '../images/6.jpg'
import img7 from '../images/7.jpg'
import img8 from '../images/8.jpg'
import Netflix from './Netflix'
import Populer from './Populer'

const Home = () => {
  const ref = useRef()
  const navigate = useNavigate();
  const [next, setNext] = useState(0)
  // const handleClick = (direction)=>{
  //   if(slideNumber === 0 || slideNumber>=1 && click === "right"){
  //     setSlideNumber(slideNumber+1)
  //     transform =  'translateX(230px)'
  //   }
  //   if(slideNumber === 5 || slideNumber<=1 && click === "left"){
  //     setSlideNumber(slideNumber-1)
  //     transform =  'translateX(-230px)'
  //   }
  // }
  const handleNext = () => {
    const width = ref.current.offsetWidth
    if (next < - 1000) {
      setNext(0)
    }
    else {
      setNext(next - 100)
    }
  }
  const handlePrev = () => {
    if (next === 0) {
      setNext(0)
    }
    else {
      setNext(next + 100)
    }
  }
  return (
    <>
      <div className="mybanner">
        <div className="featured-content">
          <div className="featured-title">MOVIE MANIA</div>
          <div className="featured-para">Movie Mania is an online database of information related to films, television series, anime, web series, and streaming content online - including cast, rating, release dates, ratings, and the country it was produced by. Movie Mania began as a fan-operated movie database. It is now owned and operated by Movie Mania.com, Inc., a subsidiary of Private Organization.</div>
          <div className="btn btn-danger mt-3 featured-btn" onClick={() => {
            navigate("./movies")
          }}>Movies</div>
        </div>
      </div>

      <div className="slider-container py-4">
        <div className="my-slider">
          <h1 className='text-danger mb-3 ml-3'>Featured</h1>
          <i className="zmdi zmdi-arrow-left" id="left-arrow" onClick={handlePrev}></i>
          <i className="zmdi zmdi-arrow-right" id="right-arrow" onClick={handleNext}></i>
          <div className="slider-row" >
            <div className="slider-image-container" style={{ transition: "0.2s ease", transform: `translateX(${next}px)` }} ref={ref}>
              <img src={img1} alt="sliderimg" className='slider-image' />
              <img src={img2} alt="sliderimg" className='slider-image' />
              <img src={img3} alt="sliderimg" className='slider-image' />
              <img src={img4} alt="sliderimg" className='slider-image' />
              <img src={img5} alt="sliderimg" className='slider-image' />
              <img src={img6} alt="sliderimg" className='slider-image' />
              <img src={img7} alt="sliderimg" className='slider-image' />
              <img src={img8} alt="sliderimg" className='slider-image' />
              <img src={img4} alt="sliderimg" className='slider-image' />
              <img src={img5} alt="sliderimg" className='slider-image' />
            </div>
          </div>
        </div>
      </div>

      <Netflix />
      <Populer />
    </>
  )
}

export default Home