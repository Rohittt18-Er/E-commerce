import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
  Image,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useThunk } from "../../hooks/use-thunk";
import { fetchSingleProduct } from "../../redux/store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeSingleProductData } from "../../redux/store/slices/productSlice";
import Loader from "../../utils/Loader";
import Autocomplete from "@mui/material/Autocomplete";
const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-10px",
  transform: "scale(2.7)",
};

const AdminEditProductPage = () => {
  const dispatch = useDispatch();
  const state = useLocation();
  const id = state?.state?.id;

  const [proData, proLoading, prErr, PSucees, pErrFlag] =
    useThunk(fetchSingleProduct);
  const [validated, setValidated] = useState(false);
  const data = useSelector((state) => state?.product?.singleProductData?.data);
  useEffect(() => {
    dispatch(removeSingleProductData());
    proData(id);
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        description: data.description || "",
        count: data.count || "",
        price: data.price || "",
        category: "",
        attributesTable: [],
        key: "",
        newKey: "",
        newValue: "",
        value: [],
      });
    }
  }, [data]);

  console.log(data);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const [formData, setFormData] = useState({
    name: data?.name,
    description: data?.description,
    count: data?.count,
    price: data?.price,
    category: data.category,
    attributesTable: [],
    key: "",
    newKey: "",
    newValue: "",
    value: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
    }));
  };

  console.log("formData", formData);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              onChange={handleChange}
              value={formData?.name}
            />

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                onChange={handleChange}
                value={formData?.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                value={formData?.count}
                name="count"
                required
                type="number"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              value={formData?.price}
              className="mb-3"
              controlId="formBasicPrice"
            >
              <Form.Label>
                Price
                {proLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItem: "center",
                      marginLeft: "300px",
                    }}
                  >
                    <Loader />
                  </div>
                ) : null}
              </Form.Label>
              <Form.Control
                value={formData.price}
                name="price"
                required
                type="text"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categoryOptions}
                sx={{ width: 550 }}
                value={formData.category}
                onChange={handleCategoryChange}
                renderInput={(params) => <TextField {...params} />}
              /> */}
            </Form.Group>

            <Row className="mt-5">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAttributes">
                  <Form.Label>Choose atrribute and set value</Form.Label>
                  <Form.Select
                    name="atrrKey"
                    aria-label="Default select example"
                  >
                    <option>Choose attribute</option>
                    <option value="red">color</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Select
                    name="atrrVal"
                    aria-label="Default select example"
                  >
                    <option>Choose attribute value</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Table hover>
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>attr key</td>
                    <td>attr value</td>
                    <td>
                      <CloseButton />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create category"
                    required={true}
                    name="newAttrValue"
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="primary">
              After typing attribute key and value press enterr on one of the
              field
            </Alert>

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Row>
                <Col style={{ position: "relative" }} xs={3}>
                  <Image src="/images/monitors-category.png" fluid />
                  <i style={onHover} className="bi bi-x text-danger"></i>
                </Col>
                <Col style={{ position: "relative" }} xs={3}>
                  <Image src="/images/monitors-category.png" fluid />
                  <i style={onHover} className="bi bi-x text-danger"></i>
                </Col>
              </Row>
              <Form.Control required type="file" multiple />
            </Form.Group>
            <Button variant="primary" type="submit">
              UPDATE
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditProductPage;
