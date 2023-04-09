import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="myfooter pt-5 text-center">
        <hr className="line" />
        <div className="container-fluid pt-5 pb-5">
          <div className="row">
            <div className="col-md-3">
              <h3 className="font-weight-bold mt-5 pt-2 text-danger mb-3">MOVIE MANIA</h3>
              <p><i className="zmdi zmdi-pin"></i>Bhopal, Madhya Pradesh</p>
              <p><i className="zmdi zmdi-phone"></i>+91 6264***418</p>
            </div>

            <div className="col-md-3">
              <h4 className="font-weight-bold mb-3">About Us</h4>
              <Link to="/contact" className='footer-link'>Contact Us</Link>
              <Link to="" className='footer-link'>About Us</Link>
              <Link to="" className='footer-link'>Careers</Link>
              <Link to="" className='footer-link'>Services</Link>
            </div>

            <div className="col-md-3">
              <h4 className="font-weight-bold mb-3">Help</h4>
              <Link to="" className='footer-link'>FAQ</Link>
              <Link to="" className='footer-link'>File a complain</Link>
              <Link to="" className='footer-link'>Cancellation</Link>
              <Link to="" className='footer-link'>Report Infringement</Link>
            </div>

            <div className="col-md-3">
              <h4 className="font-weight-bold mb-3">Policy</h4>
              <Link to="" className='footer-link'>Terms of use</Link>
              <Link to="" className='footer-link'>Security</Link>
              <Link to="" className='footer-link'>Privacy</Link>
              <Link to="/signup" className='footer-link'>Sign Up</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer