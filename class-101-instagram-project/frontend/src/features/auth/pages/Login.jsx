import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router'
import { useAuth } from '../useAuth'
import { useNavigate } from 'react-router'
import Nav from '../../shared/components/Nav'

const Login = () => {

    const { user, loading, handleLogin } = useAuth()

    const [username, setuserName] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleLogin(username, password)

        navigate("/")
    }

    if (loading) {
        return (<main>

            <h1>Loading...</h1>

        </main>)
    }
    return (
        <main>
            <div className="form-container">

                <h1 className='instagram-text'>Instagram</h1>
                <form onSubmit={handleSubmit}>
                    <input onInput={(e) => setuserName(e.target.value)}
                        type="text"
                        name='username'
                        id='username'
                        placeholder=' Enter Username' />
                    <input
                        onInput={(e) => setPassword(e.target.value)}
                        type="password"
                        name='password'
                        id='password'
                        placeholder=' Enter Password' />
                    <button className='button primary-button' type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login