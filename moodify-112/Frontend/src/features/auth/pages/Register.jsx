import React, { useState } from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const { handleRegister } = useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
    }
    return (
    <main className='register-page'>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <FormGroup value={username} onChange={(e) => setUsername(e.target.value)} label="Username" placeholder="Username" />
                <FormGroup value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Email" />
                <FormGroup value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Password" />
                <button className='button' type='submit'>Register</button>
            </form>
            <p>Already have an account ? <a href="/login">Login</a></p>
        </div>
    </main>
  )
}

export default Register