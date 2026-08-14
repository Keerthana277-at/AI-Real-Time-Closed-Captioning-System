import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/api";
import "../styles/auth.css"
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [message,setMessage] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        try{
            const data = await loginUser({
                email,
                password
            });

            console.log("LOGIN RESPONSE:",data);

            localStorage.setItem("token",data.token);

            setMessage("Login successfull!");

            navigate("/dashboard");
        }
      
    catch(error){
        console.log("Login error:",error.message);
        setError(error.message);
    }
}; 

    return (
        <div className="auth-page">

    <div className="auth-brand">
        <div className="brand-icon">🎧</div>
        <h1>CaptionAI</h1>
        <p>Real-time captions made simple and accessible.</p>
    </div>

    <div className="auth-card">

        <h2>Welcome back 👋</h2>
        <p className="auth-subtitle">
            Sign in to continue to your dashboard.
        </p>

        <form onSubmit={handleSubmit}>

            <div className="input-group">
                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                />
            </div>

            <div className="input-group">
                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                />
            </div>

            <button
                type="submit"
                className="login-btn"
            >
                Login
            </button>

        </form>

        {message && (
            <p className="success-message">
                {message}
            </p>
        )}

        {error && (
            <p className="error-message">
                {error}
            </p>
        )}

        <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
        </p>

    </div>

</div>
    );
    }
    

export default Login;