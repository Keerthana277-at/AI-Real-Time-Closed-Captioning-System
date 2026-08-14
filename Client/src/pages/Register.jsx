import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/api";
import "../styles/auth.css";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        try {
            const data = await registerUser({
                name,
                email,
                password
            });

            console.log("REGISTER RESPONSE:", data);

            setMessage("Registration successful!");

        } catch (error) {
            console.log("Register error:", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="auth-page">

            {/* Brand */}
            <div className="auth-brand">

                <div className="brand-icon">
                    🎧
                </div>

                <h1>CaptionAI</h1>

                <p>
                    Real-time captions made simple and accessible.
                </p>

            </div>


            {/* Register Card */}
            <div className="auth-card">

                <h2>Create an account ✨</h2>

                <p className="auth-subtitle">
                    Join CaptionAI and make communication more accessible.
                </p>


                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="input-group">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Email */}
                    <div className="input-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Password */}
                    <div className="input-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Create Account
                    </button>

                </form>


                {/* Messages */}
                {message && (
                    <p className="success-message">
                        ✅ {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}


                {/* Login */}
                <p className="auth-footer">

                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;