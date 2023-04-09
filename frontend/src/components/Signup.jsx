import React, { useState } from 'react'
import signup from '../images/signup.png'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  let navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const [user, setUser] = useState({
    name: "", email: "", phone: "", password: "", cpassword: ""
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault();
    try {

      const { name, email, phone, password, cpassword } = user;

      if (!name || !email || !phone || !password || !cpassword) {
        setMsg("All feilds are requried")
        return;
      }

      if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
        setMsg("Invalid email address format");
        return;
      }

      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, phone, password, cpassword
        })
      })
      const data = await res.json()
      if (data.status === 422 || !data) {
        window.alert("Invalid Registration")
        console.log("Invalid Registration")
      }
      else if (!name || !email || !phone || !password || !cpassword) {
        setMsg(data.error)
      }
      else if (password !== cpassword) {
        setMsg(data.error)
      }
      else if (data.email === email.email) {
        setMsg(data.error)
      }
      if (res.status === 201) {
        window.alert("Registration done")
        console.log("Registration done")
        navigate("/login")
      }
    } catch (error) {
      console.log("error=>", error);
    }
  }
  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <h3 className="text-center text-white my-2">Welcome! <span className='text-danger'>Register</span> to Enjoy our Services</h3>
          <div className="signup-content">
            <div className="signup-image">
              <figure>
                <img src={signup} alt="" />
              </figure>
              <Link to="/login" className="signup-image-link">I am already registered</Link>
            </div>
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <p className="text-danger" style={{ fontSize: "1.1rem" }}>{msg}</p>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account"></i>
                  </label>
                  <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} placeholder='Your Name' />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input type="email" name="email" id="email" value={user.email} onChange={handleInputs} placeholder='Your Email' />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input type="tel" name="phone" id="phone" value={user.phone} onChange={handleInputs} placeholder='Your Phone' />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} placeholder='Your Password' />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs} placeholder='Confirm  Password' />
                </div>
                <div className="form-group form-button">
                  <input type="submit" name="signup" id="signup" className='btn btn-danger' value="Register" onClick={postData} />
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Signup