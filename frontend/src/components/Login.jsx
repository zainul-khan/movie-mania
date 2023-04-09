import React, { useState } from 'react'
import signup2 from '../images/signup2.png'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from './Context'

const Login = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useGlobalContext()
  const [msg, setMsg] = useState()

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      if (!email, !password) {
        setMsg("All feilds are required")
        return;
      }

      if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
        setMsg("Invalid email address format");
        return;
      }

      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
      })
      const data = await res.json();
      if (!email || !password) {
        setMsg(data.error)
      }
      else if (email !== data.email || password !== data.password) {
        setMsg(data.error)
      }
      if (res.status === 201) {
        localStorage.setItem("userdatatoken", data.result.token)
        setEmail("")
        setPassword("")
        dispatch({ type: "USER", payload: true })
        navigate("/movies")
      }
    } catch (error) {
      console.log("error=>", error);
    }

  }
  return (
    <>
      <section className="signup ">
        <div className="container mt-5 pb-4">
          <h3 className="text-center text-white my-4">Hi User! <span className='text-danger'>Login</span> to Enjoy our Services</h3>
          <div className="signup-content">
            <div className="signup-image">
              <figure>
                <img src={signup2} alt="" />
              </figure>
              <Link to="/signup" className="signup-image-link">Create an Account</Link>
            </div>
            <div className="signup-form">
              <h2 className="form-title">Login</h2>
              <p className="text-danger" style={{ fontSize: "1.1rem" }}>{msg}</p>
              <form className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input type="email" name="email" id="email" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                  }} placeholder='Your Email' />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input type="password" name="password" id="password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                  }} placeholder='Your Password' />
                </div>
                <div>
                  <Link to="/forget-password" className="signup-image-link" style={{ display: "flex", justifyContent: "flex-end" }}>Forget Password?</Link>
                </div>
                <div className="form-group form-button">
                  <input type="submit" name="signin" id="signin" className='btn btn-danger' value="Log In" onClick={loginUser} />
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Login