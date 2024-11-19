import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: send request to server
    console.log(email, password);
  };

  return (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <br />
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="buttons">
          <Button variant="primary" type="submit">
            Login
          </Button>
          {/* TODO: add Link for react router here for redirecting to '/register' */}
          <Button variant="warning">Register</Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
