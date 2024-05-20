import { useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import JoblyApi from "../../api/api";
import Spinner from "react-bootstrap/Spinner";
import JobCard from "../jobs/JobCard";
import Row from "react-bootstrap/Row";

const CompanyDetails = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async (handle) => {
      let res = await JoblyApi.getCompany(handle);
      setCompany(res);
      setIsLoading(false);
    };
    fetchCompany(handle);
  }, [isLoading]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <Container className="justify-content-md-center">
      <Row>
        <h2 className="my-3">Company Details</h2>
        <Card>
          <Card.Body>
            <Card.Title>{company.name}</Card.Title>
            <Card.Text>{company.description}</Card.Text>
          </Card.Body>
        </Card>
      </Row>
      {company.jobs.length !== 0 ? (
        <h2 className="my-3">Available Jobs</h2>
      ) : null}
      <Row className="justify-content-center">
        {company.jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </Row>
    </Container>
  );
};

export default CompanyDetails;
