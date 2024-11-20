import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import supabase from "../../config/supabase";
import DismissibleAlert from "../../utils/Alert";

interface RegistrationForm {
  name: string;
  email: string;
  work: string;
  password: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationForm>({
    name: "",
    email: "",
    work: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("users").insert(formData);
      if (error) {
        setErrorMessage(error.details);
        setShow(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <br />
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <br />
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicWork">
          <Form.Label>Work</Form.Label>
          <br />
          <Form.Control
            type="text"
            placeholder="Enter your work here..."
            name="work"
            value={formData.work}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-light" type="submit">
            Register
          </Button>
          <Button variant="outline-light">Login</Button>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
