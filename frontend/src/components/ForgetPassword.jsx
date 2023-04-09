import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {

    let navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [msg, setMsg] = useState()

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {

            if (!email) {
                setMsg(data.error)
                return;
            }

            if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
                setMsg("Invalid email address format");
                return;
            }


            const res = await fetch("http://localhost:8000/forget-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email })
            })

            const data = await res.json();


            if (data.error) {
                setMsg(data.error)
                return;
            }

            if (res.status === 200) {
                setEmail("")
                alert(data.msg)
                navigate("/reset-password")
            }

        } catch (error) {

            console.log("error=>", error);
            setMsg(error)

        }

    }
    return (
        <section className='signup'>
            <div className="container mt-5 pb-4">
                <h3 className="text-center text-white my-4">Just <span className='text-danger'>one</span> step away to <span className='text-danger'>reset</span> your password</h3>
                <p className="text-center text-white my-4">Enter email to get otp on your device</p>
                <div className="text-center">
                    <form method='post'>
                        <p className="text-danger" style={{ fontSize: "1.1rem" }}>{msg}</p>

                        <div className="form-group">
                            <label htmlFor="email">

                            </label>
                            <input type="email" name="email" id="email" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} placeholder='Your Email' />
                            <input type="submit" name="signin" id="signin" className='btn btn-danger' value="Submit" onClick={handleForgetPassword} />
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}

export default ForgetPassword