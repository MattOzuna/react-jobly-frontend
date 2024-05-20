import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import JoblyApi from "../../api/api";
import JobCard from "./JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState({});
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setTouched(true);
    setSearch(e.target.value ? { title: e.target.value } : {});
    setJobs([]);
  };

  useEffect(() => {
    const fetchJobs = async (search) => {
      let res = await JoblyApi.getJobs(search);
      setJobs(res);
      setIsLoading(false);
    };
    if (touched && search.title) {
      fetchJobs(search);
    }
  }, [search]);

  return (
    <Container>
    <h1>Jobs</h1>
    <Row>
      <Form>
        <Form.Control
          placeholder="Search Jobs"
          onChange={handleChange}
        ></Form.Control>
      </Form>
    </Row>
    <Row className="justify-content-center">
      {isLoading && touched ? (
        <Spinner animation="border" role="status">
          {" "}
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : null}
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </Row>
  </Container>
  )
};

export default Jobs;
