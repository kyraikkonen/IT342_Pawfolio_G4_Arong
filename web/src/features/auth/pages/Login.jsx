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
            localStorage.setItem(
  "user",
  JSON.stringify(data)
);

            navigate("/dashboard")

        }catch(err){

            setError("Invalid email or password")

        }
    }

    // GOOGLE LOGIN
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google"
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

                    <div style={{margin:"15px 0", textAlign:"center"}}>
                        <span style={{fontSize:"12px", color:"#999"}}>OR</span>
                    </div>

                    <button
    type="button"
    onClick={handleGoogleLogin}
    style={{
        width:"100%",
        padding:"10px",
        borderRadius:"6px",
        border:"1px solid #D1D5DB",
        background:"#FFFFFF",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"10px",
        fontWeight:"500",
        cursor:"pointer"
    }}
>
    <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        style={{width:"18px", height:"18px"}}
    />
    Login with Google
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