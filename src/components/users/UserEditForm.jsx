import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuidv4 } from "uuid";
import JoblyApi from "../../api/api";

const UserEditForm = () => {
  const { username } = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async (username) => {
      let {email, lastName, firstName} = await JoblyApi.getUser(username);
      setFormData({email, lastName, firstName});
      setIsLoading(false);
    };
    fetchUser(username);
  }, [isLoading]);

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let res = await JoblyApi.editUser(username, formData)
        history.push(`/users/${username}`)
    } catch (err) {
      setErrors(err.message ? ["Unkown Issue. Try again later."] : err);
    }
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Form className="" onSubmit={handleSubmit}>
      <h2 className="my-4">Edit Profile</h2>
      {errors.map((error) => (
        <div className="text-danger" key={uuidv4()}>
          {error}
        </div>
      ))}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          required
          value={formData.email}
          name="email"
          type="email"
          placeholder="name@example.com"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3 mx-auto" controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          required
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
              value={formData.firstName}
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
              value={formData.lastName}
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

export default UserEditForm;
