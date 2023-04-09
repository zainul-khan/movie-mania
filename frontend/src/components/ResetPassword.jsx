import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [otpNumber, setOtpNumber] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [msg, setMsg] = useState();

    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            if (!email, !newPassword, !otpNumber) {
                setMsg("Please Fill all the fields");
            }

            if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
                setMsg("Invalid email address format");
                return;
            }

            const res = await fetch("http://localhost:8000/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, newPassword, otpNumber })
            })

            const data = await res.json();

            console.log("res", res);
            console.log("data", data);

            if (data.error) {
                setMsg(data.error)
                return;
            }

            if (res.status === 200) {
                setEmail("")
                setOtpNumber("")
                setNewPassword("")
                alert(data.msg)
                navigate("/")
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <>
            <section className='signup'>
                <div className="container mt-5 pb-4">
                    <h3 className="text-center text-white my-4">Reset your <span className='text-danger'>password</span></h3>
                    <p className="text-center text-white my-4">Enter email to get otp on your device</p>

                    <div className="text-center">
                        <p className="text-danger" style={{ fontSize: "1.1rem" }}>{msg}</p>
                        <form method='post'>

                            <div className="form-group">

                                <input type="email" name="email" id="email" value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} placeholder='Your Email' />
                            </div>
                            <div className="form-group">

                                <input type="text" name="otpNumber" id="otpNumber" value={otpNumber} onChange={(e) => {
                                    setOtpNumber(e.target.value)
                                }} placeholder='Otp Recieved' />
                            </div>
                            <div className="form-group">

                                <input type="password" name="newPassword" id="password" value={newPassword} onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }} placeholder='New Password' />
                            </div>
                            <input type="submit" name="signin" id="signin" className='btn btn-danger' value="Submit" onClick={handleResetPassword} />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPassword