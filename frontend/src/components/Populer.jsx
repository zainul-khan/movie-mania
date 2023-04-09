import React, { useRef, useState } from 'react'
import img2 from '../images/2.jpeg'
import img4 from '../images/4.jpg'
import img5 from '../images/5.jpg'
import img7 from '../images/7.jpg'
import img8 from '../images/8.jpg'
import img15 from '../images/15.jpg'
import img16 from '../images/16.jpg'
import img17 from '../images/17.jpg'
import img18 from '../images/18.jpg'
import img19 from '../images/19.jpg'

const Populer = () => {
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
          <h1 className='text-danger mb-3 ml-3'>Popular</h1>
          <i className="zmdi zmdi-arrow-left" id="left-arrow" onClick={handlePrev}></i>
          <i className="zmdi zmdi-arrow-right" id="right-arrow" onClick={handleNext}></i>
          <div className="slider-row" >
            <div className="slider-image-container" style={{ transition: "0.2s ease", transform: `translateX(${next}px)` }} ref={ref}>
              <img src={img18} alt="sliderimg" className='slider-image' />
              <img src={img19} alt="sliderimg" className='slider-image' />
              <img src={img17} alt="sliderimg" className='slider-image' />
              <img src={img15} alt="sliderimg" className='slider-image' />
              <img src={img16} alt="sliderimg" className='slider-image' />
              <img src={img2} alt="sliderimg" className='slider-image' />
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

export default Populer