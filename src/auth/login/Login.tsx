import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import supabase from "../../config/supabase";
import DismissibleAlert from "../../utils/Alert";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.from("users").select();
    const thisUser = data && data.filter((i) => i.email === email);
    if (!thisUser?.length || thisUser[0].password !== password) {
      setErrorMessage("Incorrect Email or Password!");
      setShow(true);
      return;
    }
    // TODO: make currentUser thisUser
    console.log(thisUser);
    if (error) {
      console.error(error);
      setErrorMessage(error.details);
      setShow(true);
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
          {/* TODO: add Link for react router here for redirecting to '/register' */}
          <Button variant="outline-light">Register</Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
