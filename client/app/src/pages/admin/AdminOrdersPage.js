import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../components/cartItem/CartItemComponent";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { StyledEngineProvider } from "@mui/material/styles";

const AdminOrderDetailsPage = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={3} lg={2}>
          <StyledEngineProvider injectFirst>
            <AdminLinksComponent />
          </StyledEngineProvider>
        </Col>
        <Col md={9} lg={10}>
          <h1>Order Details</h1>
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: John Doe <br />
              <b>Address</b>: 8739 Mayflower St. Los Angeles, CA 90063 <br />
              <b>Phone</b>: 888 777 666
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select disabled={false}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery (delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Alert className="mt-3" variant="danger">
                Not delivered
              </Alert>
            </Col>
            <Col md={6}>
              <Alert className="mt-3" variant="success">
                Paid on 2022-10-02
              </Alert>
            </Col>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {Array.from({ length: 3 }).map((item, idx) => (
              <CartItemComponent key={idx} />
            ))}
          </ListGroup>
        </Col>
        <Col className="mx-auto"  md={6} lg={6}  >
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax): <span className="fw-bold">$892</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">$904</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant="danger"
                  type="button"
                  onClick={() => {

                    console.log("Mark as delivered clicked");
                  }}
                >
                  Mark as delivered
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminOrderDetailsPage;
