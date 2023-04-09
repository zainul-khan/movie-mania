import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from './Context'
const Logout = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useGlobalContext()
    const loggingout = async () => {
        let token = localStorage.getItem("userdatatoken")
        const res = await fetch("http://localhost:8000/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                "Accept": "application/json"
            }
        })
        const data = await res.json();
        console.log(data)
        if (data.status === 200) {
            console.log("user logout")
            localStorage.removeItem("userdatatoken")
            dispatch({ type: "USER", payload: false })
            navigate("/")
        }
        else {
            console.log("Some error")
        }
    }
    useEffect(() => {
        loggingout()
    }, [])
    return (
        <>
            <div className='error-page'>You have Been Logged Out
                <button className="btn btn-danger mt-3" onClick={() => {
                    navigate("/")
                }}>Home</button>
            </div>

        </>
    )
}

export default Logout