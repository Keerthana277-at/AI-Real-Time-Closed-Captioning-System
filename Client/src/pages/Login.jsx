import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/api";
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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email"
                 placeholder="Enter your email"
                 value={email} 
                 onChange={(event)=>setEmail(event.target.value)}
                 />
                <br /><br />

                <input type="password" 
                placeholder="Enter the password"
                value={password}
                onChange={(event)=>setPassword(event.target.value)} 
                />
                <br /><br />

                <button type="submit" >Login</button>
            </form>

            {message && <p>{message}</p>}

            {error && <p>{error}</p>}

            <p>
                Don't have an account? {" "}
                <Link to="/register">Register</Link>
            </p>
        </div>
    );
    }
    

export default Login;