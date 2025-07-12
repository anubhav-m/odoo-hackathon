import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);

        const { username, email, password } = formData;
        if (
            username.length < 3 ||
            username.length > 30 ||
            !/^\S+@\S+\.\S+$/.test(email) ||
            password.length < 6
        ) {
            return;
        }

        try {
            const res = await fetch("http://localhost:4500/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Sign up failed");
            }

            localStorage.setItem("token", data.token);
            navigate("/signin");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-dark text-light d-flex justify-content-center align-items-center min-vh-100">
            <Container>
                <Card style={{ maxWidth: "500px", backgroundColor: "#2a2a2a" }} className="mx-auto shadow text-light p-4 rounded-4">
                    <Card.Body>
                        <Card.Title className="mb-4 fs-3 text-center text-white">
                            Sign Up • StackIt
                        </Card.Title>

                        {error && (
                            <Alert variant="danger" className="text-danger">
                                {error}
                            </Alert>
                        )}

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                    maxLength={30}
                                    placeholder="Enter username"
                                    style={{
                                        backgroundColor: "#1f1f1f",
                                        color: "#d1d1d1",
                                        borderColor: "#555",
                                    }}
                                />
                                <Form.Control.Feedback type="invalid" className="text-danger">
                                    Username must be 3–30 characters.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter email"
                                    style={{
                                        backgroundColor: "#1f1f1f",
                                        color: "#d1d1d1",
                                        borderColor: "#555",
                                    }}
                                />
                                <Form.Control.Feedback type="invalid" className="text-danger">
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    placeholder="Password"
                                    style={{
                                        backgroundColor: "#1f1f1f",
                                        color: "#d1d1d1",
                                        borderColor: "#555",
                                    }}
                                />
                                <Form.Control.Feedback type="invalid" className="text-danger">
                                    Password must be at least 6 characters.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="outline-info" type="submit" className="w-100">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default SignUp;
