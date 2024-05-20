import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const UserCard = ({ user }) => {
  return (
    <Card>
      <h2>{user.username} Profile</h2>
      <Card.Body>
        <Card.Title>
          {user.firstName} {user.lastName}
        </Card.Title>
        <Card.Text>{user.email}</Card.Text>
        <Link to={`/users/edit/${user.username}`}>Edit</Link>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
