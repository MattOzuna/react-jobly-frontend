import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <Card style={{ margin: "4px" }}>
      <Card.Body>
        <Card.Title>
          <Link to={`/companies/${company.handle}`} key={company.handle}>
            <div>{company.name}</div>
          </Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;
