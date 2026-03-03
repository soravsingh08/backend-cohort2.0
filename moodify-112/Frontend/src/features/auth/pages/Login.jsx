import React from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const { handleLogin, loading } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }
    return (
        <main className='login-page'>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email" placeholder="Email" />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" placeholder="Password" />
                    <button className='button' type='submit'>Login</button>
                </form>
                <p>Don't have an account ? <a href="/register">Register</a></p>
            </div>
        </main>

    )
}

export default Login
