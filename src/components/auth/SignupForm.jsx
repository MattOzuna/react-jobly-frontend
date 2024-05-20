import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import JoblyApi from "../../api/api";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuidv4 } from "uuid";

const SignupForm = ({ register }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await JoblyApi.registerNewUser(formData);
      await register(res, formData.username);
      history.push("/");
    } catch (err) {
      setErrors(err.message ? ['Unkown Issue. Try again later.'] : err);
    }
  };

  return (
    <Form className="" onSubmit={handleSubmit}>
      <h2 className="my-4">Sign up</h2>
      {errors.map((error) => (
        <div className="text-danger" key={uuidv4()}>
          {error}
        </div>
      ))}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          required
          name="email"
          type="email"
          placeholder="name@example.com"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3 mx-auto" controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          required
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3 mx-auto" controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          required
          minLength="5"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3 mx-auto" controlId="firstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              required
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3 mx-auto" controlId="lastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
