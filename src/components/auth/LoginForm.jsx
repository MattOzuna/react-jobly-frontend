import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import JoblyApi from "../../api/api";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuidv4 } from "uuid";

const LoginForm = ({ login }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await JoblyApi.getToken(formData);
      await login(res, formData.username);
      history.push("/");
    } catch (err) {
      setErrors(err.message ? ["Unkown Issue. Try again later."] : err);
    }
  };

  return (
    <Form className="w-50" onSubmit={handleSubmit}>
      <h2 className="my-4">Login</h2>
      {errors.map((error) => (
        <div className="text-danger" key={uuidv4()}>
          {error}
        </div>
      ))}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          minLength="5"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
