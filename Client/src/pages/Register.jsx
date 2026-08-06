import { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";


function Register(){

    const [name,setName] = useState("");
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
            const data = await registerUser({
                name,
                email,
                password
            });

            console.log("Register Response:",data);

            setMessage("Regitration successfull! Redirectiong to login...");

            setTimeout(()=>{
                navigate("/login");
            },1500);
        }catch(error){
            console.log("Register Error:",error.message);
            setError(error.message);
        }
    };


    return (
        <div>
            <h1>Create account</h1>

            <form onSubmit={handleSubmit} >
                <input type="text"
                 placeholder="Enter your name"
                 value={name} 
                 onChange={(event)=> setName(event.target.value)}
                 />
                <br /><br />

                <input type="email"
                 placeholder="Enter Email"
                 value={email}
                 onChange={(event) => setEmail(event.target.value)}
                  />
                <br /><br />

                <input type="password"
                 placeholder="Enter password"
                 value={password}
                 onChange={(event)=>setPassword(event.target.value)}
                  />
                <br /><br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;