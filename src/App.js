import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

const App = () => {
  const [formData, setFormData] = useState({
    productName: "",
    email: "",
    price: "",
    quantity: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const states = ["State1", "State2", "State3", "State4"];

  const validateForm = () => {
    const errors = {};

    if (!formData.productName) errors.productName = "Product name is required";
    if (!formData.email.includes("@")) errors.email = "Valid email is required";
    if (!formData.price || isNaN(formData.price))
      errors.price = "Valid numeric price is required";
    if (!formData.quantity || isNaN(formData.quantity))
      errors.quantity = "Valid numeric quantity is required";
    if (!formData.city || /\d/.test(formData.city))
      errors.city = "City should not contain digits";
    if (!formData.state) errors.state = "State is required";
    if (!formData.zipCode || !/^\d{6}$/.test(formData.zipCode))
      errors.zipCode = "Valid 6 digit zip code is required";

    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      if (editIndex !== null) {
        const updatedData = [...data];
        updatedData[editIndex] = formData;
        setData(updatedData);
        setEditIndex(null);
      } else {
        setData([...data, formData]);
      }
      setFormData({
        productName: "",
        email: "",
        price: "",
        quantity: "",
        city: "",
        state: "",
        zipCode: "",
      });
    } else {
      setFormErrors(errors);
    }
  };

  const handleEdit = (index) => {
    setFormData(data[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filteredData = data.filter((_, i) => i !== index);
    setData(filteredData);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                isInvalid={!!formErrors.productName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.productName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                isInvalid={!!formErrors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                isInvalid={!!formErrors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.quantity}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                isInvalid={!!formErrors.city}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.city}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                name="state"
                value={formData.state}
                onChange={handleChange}
                isInvalid={!!formErrors.state}
              >
                <option value="">Choose...</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.state}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                isInvalid={!!formErrors.zipCode}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.zipCode}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              {editIndex !== null ? "Update" : "Submit"}
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.email}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.zipCode}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
