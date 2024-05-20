import { useParams} from "react-router-dom/cjs/react-router-dom.min";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import JoblyApi from "../../api/api";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import UserCard from "./UserCard";
import JobCard from "../jobs/JobCard";

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async (username) => {
      let res = await JoblyApi.getUser(username);
      setUser(res);
      setIsLoading(false);
    };
    fetchUser(username);
  }, [isLoading]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Container>
      <Row>
        <UserCard user={user} />
      </Row>
      {user.applications.length !== 0 ? (
        <h2 className="my-3">Applications</h2>
      ) : null}
      <Row className="justify-content-center">
        {user.applications.map((application) => (
          <JobCard key={application.id} job={application}/>
        ))}
      </Row>
    </Container>
  );
};

export default UserDetails;
