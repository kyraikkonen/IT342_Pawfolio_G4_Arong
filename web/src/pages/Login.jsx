import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(){

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const handleLogin = async (e) => {

        e.preventDefault()

        setError("")

        try{

            const response = await fetch("http://localhost:8080/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            })

            if(!response.ok){
                throw new Error("Login failed")
            }

            const data = await response.json()

            // store user temporarily
            localStorage.setItem("user",JSON.stringify(data))

            navigate("/dashboard")

        }catch(err){

            setError("Invalid email or password")

        }
    }

    return(

        <div className="auth-container">

            <div className="auth-left">

                <div className="brand">Pawfolio</div>

                <h2>Welcome back to Pawfolio</h2>

                <p>Your pets' health records, all in one place.</p>

            </div>


            <div className="auth-right">

                <form className="form-card" onSubmit={handleLogin}>

                    <h2>Login</h2>
                    <p className="subtitle">Sign in to your account</p>

                    {error && <p style={{color:"#EF4444"}}>{error}</p>}

                    <div className="input-group">

                        <label>Email</label>

                        <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        />

                    </div>

                    <button className="btn-primary">
                        Login
                    </button>

                    <p className="footer-text">
                        Don't have an account? 
                        <span
                        className="link"
                        style={{cursor:"pointer"}}
                        onClick={()=>navigate("/register")}>
                        {" "}Create Account
                        </span>
                    </p>

                </form>

            </div>

        </div>

    )
}