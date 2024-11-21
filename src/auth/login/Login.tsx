import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import supabase from "../../config/supabase";
import DismissibleAlert from "../../utils/Alert";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.from("users").select();
    const thisUser = data && data.filter((i) => i.email === email);
    if (!thisUser?.length || thisUser[0].password !== password) {
      setErrorMessage("Incorrect Email or Password!");
      setShow(true);
      return;
    }
    if (thisUser[0].status === "blocked") {
      setErrorMessage("User is blocked!");
      setShow(true);
      return;
    }
    if (error) {
      console.error(error);
      setErrorMessage(error.details);
      setShow(true);
    }
    if (thisUser) {
      await login(thisUser[0]?.name);

      const { error } = await supabase
        .from("users")
        .update({ last_login: new Date() })
        .in("id", thisUser[0].id.toString());
      console.log(error);
    }
  };

  return (
    <div className="bg-primary position-absolute top-50 start-50 translate-middle p-3 rounded-3">
      {show && (
        <DismissibleAlert
          text={errorMessage}
          heading="Error!"
          color="danger"
          setShow={setShow}
        />
      )}
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

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-light" type="submit">
            Login
          </Button>
          <Link to="/registration">
            <Button variant="outline-light">Register</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
