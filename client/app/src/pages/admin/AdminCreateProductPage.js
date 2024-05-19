import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Container, Form, Table, Alert } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FileUpload from "react-material-file-upload";
// Assuming these are your custom hooks and functions
import { useThunk } from "../../hooks/use-thunk";
import {
  createProduct,
  fetchCategory,
  getAttributesValue,
  getAttributesValueByKey,
} from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import {
  addCategory,
  upDateProduct,
  uploadImageProduct,
} from "../../redux/store/thunks/apiThunk";
import Loader from "../../utils/Loader";
import { fetchSingleProduct } from "../../redux/store";
import { removeSingleProductData } from "../../redux/store/slices/productSlice";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AdminCreateProductPage = () => {
  const [validated, setValidated] = useState(false);
  const [newCategory, setNewCateory] = useState("");
  const [getCategoryData] = useThunk(fetchCategory);
  const [getAttributesData] = useThunk(getAttributesValue);
  const [getDataBySingleKey, getSingleLoading] = useThunk(
    getAttributesValueByKey
  );
  const [productData, productLoading] = useThunk(createProduct);
  const [addCategoryData] = useThunk(addCategory);
  const [uploadImage, uploadImageLoading, uploadImageError] =
    useThunk(uploadImageProduct);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [catFlag, setCatFlag] = useState(false);
  const [catFlag2, setCatFlag2] = useState(false);
  const [updateData, updateLoading, upErr, upSucess, upErrFlag] =
    useThunk(upDateProduct);
  const dispatch = useDispatch();
  const state = useLocation();
  const id = state?.state?.id;
  const editFlag = state?.state?.flag;

  const [proData, proLoading, prErr, PSucees, pErrFlag] =
    useThunk(fetchSingleProduct);

  const dataSingleProduct = useSelector(
    (state) => state?.product?.singleProductData?.data
  );

  useEffect(() => {
    if (editFlag) {
      dispatch(removeSingleProductData());
      proData(id);
    }
  }, []);

  useEffect(() => {
    if (editFlag) {
      if (dataSingleProduct) {
        setFormData({
          name: dataSingleProduct?.name || "",
          description: dataSingleProduct?.description || "",
          count: dataSingleProduct?.count || "",
          price: dataSingleProduct?.price || "",
          category: dataSingleProduct?.category,
          attributesTable: dataSingleProduct.attrs,
          key: "",
          newKey: "",
          newValue: "",
          value: [],
        });
      }
    }
  }, [dataSingleProduct]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    count: "",
    price: "",
    category: "",
    attributesTable: [],
    key: "",
    newKey: "",
    newValue: "",
    value: [],
  });

  const [files, setFiles] = useState([]);

  const postProductData = {
    name: formData.name,
    description: formData?.description,
    count: formData?.count,
    price: formData?.price,
    category: catFlag ? newCategory : formData?.category,
    attributesTable: formData?.attributesTable,
  };

  const postCategoryData = {
    name: catFlag ? newCategory : formData?.category,
    description: formData.description,
  };

  const handleChangeNewCategory = (event) => {
    const { value } = event.target;
    setNewCateory(value);
    if (value.trim() !== "") {
      setCatFlag(true);
    } else {
      setCatFlag(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeAttrs = (event) => {
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

  const postData = {};
  postData.key = formData?.key;

  const handleAttributeChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      key: value,
    }));
  };

  const handleMultipleAttributeChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      value: value,
    }));
  };

  const handleFileChange = (newFiles) => {
    const uniqueNewFiles = newFiles.filter(
      (newFile) =>
        !files.some((existingFile) => existingFile.name === newFile.name)
    );
    setFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
  };

  const data2 = useSelector((state) => state?.product?.productData?.data);
  const handleImageUpload = () => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("formData", file);
    });
    formData.append("id", data2._id);
    uploadImage(formData);
    setFlag3(true);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (formData?.key !== "" && formData?.value?.length > 0) {
      if (formData.key !== "" && formData.newKey !== "") {
        let arr = formData?.newValue?.split(",");
        console.log(arr[3]);
        console.log("arr", arr);
        setFormData((prevState) => ({
          ...prevState,
          attributesTable: [
            ...prevState.attributesTable,
            { key: formData.key, value: formData.value },
            { key: formData.newKey, value: arr },
          ],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          attributesTable: [
            ...prevState.attributesTable,
            { key: formData.key, value: formData.value },
          ],
        }));
      }
    }
    setFlag(true);
    setValidated(true);
  };

  useEffect(() => {
    getCategoryData();
    getAttributesData();
    getDataBySingleKey(postData);
    if (flag && !editFlag) {
      productData(postProductData);
      addCategoryData(postCategoryData);
      console.log("postProductData", formData);
      setFlag2(true);
    }
    if (flag && editFlag) {
      postProductData.id = id;
      updateData(postProductData);
      if (!upErrFlag) {
        toast.success("Product Details updated successfully");
        navigate("/admin/products", { state: { flag: flag } });
      }
    }

    if (flag2) {
      toast.success("Product Details created successfully");
    }

    if (flag3) {
      toast.success("Image uploaded");
      navigate("/admin/products");
    }
  }, [formData.key, flag, flag3]);

  const data = useSelector((state) => state?.category);
  let categoryOptions = [];
  let attributeOption = [];
  let singleAttributesValue = [];
  data?.categoryData?.data?.map((item) => {
    categoryOptions.push(item.name);
  });

  data?.attributeData?.data?.map((item) => {
    item.attrs.map((item2) => {
      attributeOption.push(item2.key);
    });
  });

  data?.attributesDataBySingleKey?.data?.map((item) => {
    singleAttributesValue.push(item);
  });

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          {!editFlag ? <h1>Create a new product</h1> : <h1>Update product</h1>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={formData.name}
                name="name"
                required
                type="text"
                onChange={handleChange}
              />
            </Form.Group>

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
                value={formData.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                value={formData.count}
                name="count"
                required
                type="number"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              {editFlag && proLoading ? (
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
              <Form.Control
                value={formData.price}
                name="price"
                required
                type="text"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categoryOptions}
                sx={{ width: 550 }}
                value={formData.category}
                onChange={handleCategoryChange}
                renderInput={(params) => <TextField {...params} />}
                disabled={catFlag}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new category (e.g. Computers/Laptops/Intel)
              </Form.Label>
              <Form.Control
                name="newCategory"
                type="text"
                onChange={handleChangeNewCategory}
              />
            </Form.Group>

            {!editFlag ? (
              <>
                <Row className="mt-5">
                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAttributes"
                    >
                      <Form.Label>Choose attribute and set value</Form.Label>
                      <Autocomplete
                        disablePortal
                        id="attrs"
                        options={attributeOption}
                        value={formData?.key}
                        onChange={handleAttributeChange}
                        sx={{ width: 220 }}
                        renderInput={(params) => (
                          <TextField {...params} label="key" />
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAttributeValue"
                    >
                      <Form.Label>Attribute value</Form.Label>
                      <Autocomplete
                        multiple
                        filterSelectedOptions
                        loading={getSingleLoading}
                        disablePortal
                        id="attrs"
                        options={singleAttributesValue}
                        sx={{ width: 220 }}
                        onChange={handleMultipleAttributeChange}
                        renderInput={(params) => (
                          <TextField {...params} label="value" />
                        )}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicNewAttribute"
                    >
                      <Form.Label>Create new attribute</Form.Label>
                      <Form.Control
                        disabled={false}
                        placeholder="first choose or create category"
                        name="newKey"
                        type="text"
                        value={formData.newKey}
                        onChange={handleChange}
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
                        name="newValue"
                        value={formData.newValue}
                        type="text"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            ) : null}
            {editFlag
              ? dataSingleProduct?.attrs?.map((item, id) => {
                  return (
                    <>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicAttributes"
                      >
                        <Form.Label>Choose attribute and set value</Form.Label>
                        <Autocomplete
                          disablePortal
                          id={id}
                          options={attributeOption}
                          value={formData?.key ? formData?.key : item?.key}
                          onChange={handleAttributeChange}
                          sx={{ width: 220 }}
                          renderInput={(params) => (
                            <TextField {...params} label="key" />
                          )}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicAttributeValue"
                      >
                        <Form.Label>Attribute value</Form.Label>
                        <Autocomplete
                          multiple
                          filterSelectedOptions
                          loading={getSingleLoading}
                          // value={formData?.value?formData.value :item?.value || formData.value}
                          disablePortal
                          id={item._id}
                          options={singleAttributesValue}
                          sx={{ width: 220 }}
                          onChange={handleMultipleAttributeChange}
                          renderInput={(params) => (
                            <TextField {...params} label="value" />
                          )}
                        />
                      </Form.Group>
                    </>
                  );
                })
              : null}

            <div
              style={{ marginTop: "20px", marginBottom: "10px" }}
              className="col-md-12 text-center"
            >
              {!editFlag ? (
                <button type="submit" class="btn btn-primary">
                  {" "}
                  {productLoading ? <Loader /> : "Create Product Details"}{" "}
                </button>
              ) : (
                <button type="submit" class="btn btn-primary">
                  {" "}
                  {updateLoading ? <Loader /> : "Update Product Details"}{" "}
                </button>
              )}
            </div>
          </Form>

          {!editFlag ? (
            <div
              style={{ marginTop: "20px", marginBottom: "20px" }}
              className="col-md-12 text-center"
            >
              <FileUpload
                value={files}
                onChange={handleFileChange}
                multiFile={true}
                leftLabel="or"
                rightLabel="to select files"
                buttonLabel="click here"
                buttonRemoveLabel="Remove all"
                maxFileSize={10}
                maxUploadFiles={0}
                bannerProps={{ elevation: 0, variant: "outlined" }}
                containerProps={{ elevation: 0, variant: "outlined" }}
              />

              <div
                style={{ marginTop: "20px" }}
                className="col-md-12 text-center"
              >
                <button onClick={handleImageUpload} class="btn btn-primary">
                  {uploadImageLoading ? <Loader /> : "Upload Image To server"}{" "}
                </button>
              </div>
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateProductPage;
