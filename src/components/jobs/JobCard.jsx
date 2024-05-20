import { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { UserContext } from "../auth/UserContext";

const jobCard = ({ job }) => {
  const { userData, apply } = useContext(UserContext);

  const handleClick = () => {
    apply(userData.username, job.id);
  };

  return (
    <Card style={{ width: "18rem", margin: "4px" }}>
      <Card.Body>
        <Card.Title>
          <div>{job.title}</div>
        </Card.Title>
        <Link to={`/companies/${job.companyHandle}`} key={job.companyHandle}>
          <div>{job.companyHandle}</div>
        </Link>
        {!userData[job.id] ?
          <Button variant="light" size="sm" onClick={handleClick}>
          Apply
        </Button>: null}
      </Card.Body>
    </Card>
  );
};

export default jobCard;
