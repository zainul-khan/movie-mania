import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [contacter, setContacter] = useState({
    name: "", email: "", contact: "", query: ""
  });
  let name, value;

  const handleContact = (e) => {
    name = e.target.name;
    value = e.target.value;
    setContacter({ ...contacter, [name]: value })
  }

  const submitQuery = async (e) => {
    e.preventDefault();

    try {
      const { name, email, contact, query } = contacter;

      if (!name || !email || !contact || !query) {
        setMsg("All feilds are required")
        return
      }

      if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
        setMsg("Invalid email address format");
        return;
      }

      const res = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, contact, query })
      })

      const data = await res.json()

      if (!res.status === 422 || !res) {
        window.alert("Cannot submitted")
        return
      }
      else {
        window.alert("submitted")
        setContacter("")
        navigate("/")
      }
    } catch (error) {
      console.log("error=>", error);
    }
  }
  return (
    <>
      <div className="contact-row-info">
        <div className="contact-form-details" >
          <div className="contact-headings">
            <h1>GET A <span className="text-danger">Quote</span></h1>
            <p>Fill the form and our team will get back to you within 24 hours</p>
          </div>
          <div className="contact-details my-5">
            <div className="contact-details-item my-4">
              <p><i className="zmdi zmdi-smartphone-android"></i>6264 5** 418</p>
            </div>
            <div className="contact-details-item my-4">
              <p><i className="zmdi zmdi-email"></i>kzainul22@gmail.com</p>
            </div>
            <div className="contact-details-item my-4">
              <p><i className="zmdi zmdi-pin"></i>Bhopal, Madhya Pradesh</p>
            </div>
            <div className="contact-details social-links">
              <i class="zmdi zmdi-facebook"></i>
              <i class="zmdi zmdi-twitter"></i>
              <i class="zmdi zmdi-instagram"></i>
            </div>
          </div>
        </div>
        <form method="POST" className="contact-form" id="register-form">
          <div className="contact-form-content">
            <p className="text-danger text-center my-4" style={{ fontSize: "1.2rem" }}>{msg}</p>
            <div className="form-group">
              <label htmlFor="name">
                <i className="zmdi zmdi-account"></i>Name
              </label><br />
              <input type="text" name="name" id="name" value={contacter.name} onChange={handleContact} placeholder='Your Name' />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-email"></i>Email
              </label><br />
              <input type="email" name="email" id="email" value={contacter.email} onChange={handleContact} placeholder='Your Email' />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                <i className="zmdi zmdi-phone-in-talk"></i>Phone
              </label><br />
              <input type="tel" name="contact" id="phone" value={contacter.contact} onChange={handleContact} placeholder='Your Phone' />
            </div>
            <div className="contact_textarea form-group">
              <i class="zmdi zmdi-comment-text"></i>Message<br />
              <textarea name="query" id="msg" value={contacter.query} style={{ borderRadius: "4px", padding: "4px" }} onChange={handleContact} placeholder='Your Query Here...'></textarea>
            </div>
            <div className="form-group form-button">
              <button type="submit" className='btn btn-dark m-2' onClick={submitQuery}>Submit</button>
            </div>
          </div>
        </form>
      </div>

    </>
  )
}

export default Contact