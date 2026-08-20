import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const response = await api.post("/auth/register", {
                name,
                email,
                password
            });

            console.log("REGISTRATION SUCCESS:", response.data);

            // Store JWT token
            localStorage.setItem("token", response.data.token);

            // Store user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Redirect to dashboard
            navigate("/dashboard");

        } catch (error) {
            console.log("SIGNUP ERROR:", error);
            console.log("RESPONSE:", error.response);
            console.log("DATA:", error.response?.data);
            console.log("STATUS:", error.response?.status);

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h1>Create Account</h1>

                {message && (
                    <p className="error-message">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Full Name */}
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        minLength={6}
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Sign Up"}
                    </button>

                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;