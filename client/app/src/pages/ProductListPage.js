import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";

import PaginationComponent from "../components/pagination/PaginationComponent";
import ProductForListComponent from "../components/card/ProductForListComponent";
import SortOptionComponent from "../components/sort/SortOptionComponent";
import PriceFilterComponent from "../components/filterQueryResult/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResult/RatingFilterComponent";
import AtributesFilter from "../components/filterQueryResult/AtributesFilter";
import CategoryFilter from "../components/filterQueryResult/CategoryFilter";
const ProductListPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item><SortOptionComponent /></ListGroup.Item>
            <ListGroup.Item><PriceFilterComponent /></ListGroup.Item>
            <ListGroup.Item><RatingFilterComponent /></ListGroup.Item>
            <ListGroup.Item><CategoryFilter /></ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary">Primary</Button>
              <Button variant="danger">Danger</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          <ProductForListComponent />
          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;

