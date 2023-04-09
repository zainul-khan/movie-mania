import React from 'react'
import { Link } from 'react-router-dom'
import movielogo from '../images/movielogo.jpg'
import { useGlobalContext } from './Context'
const Navbar = () => {
  const { state, dispatch } = useGlobalContext()
  const RenderMenu = () => {
    if (localStorage.getItem("userdatatoken")) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/movies">Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          <li><Link className="nav-link" to="/logout">Log Out</Link></li>
        </>
      )
    }
    else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/movies">Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </>
      )
    }
  }

  return (
    <><nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        <img src={movielogo} className="movielogo" alt="" />
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"><i className="zmdi zmdi-menu hamburger"></i></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <RenderMenu />
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navbar