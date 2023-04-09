import React from 'react'
import img4 from '../images/4.jpg'
import img5 from '../images/5.jpg'
import img7 from '../images/7.jpg'
import img8 from '../images/8.jpg'
import img9 from '../images/9.jpg'
import img10 from '../images/10.jpg'
import img11 from '../images/11.jpg'
import img12 from '../images/12.jpg'
import img13 from '../images/13.jpg'
import img14 from '../images/14.jpg'
import { useRef, useState } from 'react'

const Netflix = () => {
  const ref = useRef()
  const [next, setNext] = useState(0)
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
      <div className="slider-container py-4">
        <div className="my-slider">
          <h1 className='text-danger mb-3 ml-3'>Netflix</h1>
          <i className="zmdi zmdi-arrow-left" id="left-arrow" onClick={handlePrev}></i>
          <i className="zmdi zmdi-arrow-right" id="right-arrow" onClick={handleNext}></i>
          <div className="slider-row" >
            <div className="slider-image-container" style={{ transition: "0.2s ease", transform: `translateX(${next}px)` }} ref={ref}>
              <img src={img9} alt="sliderimg" className='slider-image' />
              <img src={img10} alt="sliderimg" className='slider-image' />
              <img src={img11} alt="sliderimg" className='slider-image' />
              <img src={img12} alt="sliderimg" className='slider-image' />
              <img src={img13} alt="sliderimg" className='slider-image' />
              <img src={img14} alt="sliderimg" className='slider-image' />
              <img src={img7} alt="sliderimg" className='slider-image' />
              <img src={img8} alt="sliderimg" className='slider-image' />
              <img src={img4} alt="sliderimg" className='slider-image' />
              <img src={img5} alt="sliderimg" className='slider-image' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Netflix