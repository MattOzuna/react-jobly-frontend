import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import JoblyApi from "../../api/api";
import CompanyCard from "./CompanyCard";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState({});
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setTouched(true);
    setSearch(e.target.value ? { name: e.target.value } : {});
    setCompanies([]);
  };

  useEffect(() => {
    const fetchCompanies = async (search) => {
      let res = await JoblyApi.getCompanies(search);
      setCompanies(res);
      setIsLoading(false);
    };
    if (touched && search.name) {
      fetchCompanies(search);
    }
  }, [search]);

  return (
    <Container>
      <h1>Companies</h1>
      <Row>
        <Form>
          <Form.Control
            placeholder="Search a Company"
            onChange={handleChange}
          ></Form.Control>
        </Form>
      </Row>
      <Container className="justify-content-center">
        {isLoading && touched ? (
          <Spinner animation="border" role="status">
            {" "}
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : null}
        {companies.map((company) => (
          <CompanyCard company={company} key={company.handle} />
        ))}
      </Container>
    </Container>
  );
};

export default CompanyList;
