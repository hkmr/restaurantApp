import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  FormFeedback
} from "reactstrap";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: false,
      contactType: "Tel.",
      message: "",
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
        message: false
      }
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    console.log(JSON.stringify(this.state));
    event.preventDefault();
  };

  handleBlur = event => {
    const name = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
  };

  validateForm(firstname, lastname, telnum, email, message) {
    const errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      message: ""
    };

    if (this.state.touched.firstname && firstname.length < 3)
      errors.firstname = "First Name must be greater than of 3 characters.";
    else if (this.state.touched.firstname && firstname.length >= 10)
      errors.firstname = "First Name must be less than of 10 characters.";

    if (this.state.touched.lastname && lastname.length < 3)
      errors.lastname = "Last Name must be greater than of 3 characters.";
    else if (this.state.touched.lastname && lastname.length >= 10)
      errors.lastname = "Last Name must be less than of 10 characters.";

    const regx = /^\d+$/;
    if (this.state.touched.telnum && !regx.test(telnum))
      errors.telnum = "Contact number must be only digits.";

    if (
      this.state.touched.email &&
      email.split("").filter(x => x === "@").length !== 1
    )
      errors.email = "Invalid Email address.";

    if (this.state.touched.message && message.length < 10)
      errors.message = "Please provide more information.";

    return errors;
  }

  render() {
    const errors = this.validateForm(
      this.state.firstname,
      this.state.lastname,
      this.state.telnum,
      this.state.email,
      this.state.message
    );

    return (
      <div className="container">
        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone" />: +852 1234 5678
              <br />
              <i className="fa fa-fax" />: +852 8765 4321
              <br />
              <i className="fa fa-envelope" />:{" "}
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone" /> Call
              </a>
              <a role="button" className="btn btn-info">
                <i className="fa fa-skype" /> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o" /> Email
              </a>
            </div>
          </div>
        </div>

        <div className="row row-content">
          <div className="col-12">
            <h3>Send us Your Feedback</h3>
          </div>
          <div className="col-12 col-md-9">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="firstname" md={2}>
                  First Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                    invalid={errors.firstname !== ""}
                    value={this.state.firstname}
                  />
                  <FormFeedback>{errors.firstname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="lastname" md={2}>
                  Last Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                    invalid={errors.lastname !== ""}
                    value={this.state.lastname}
                  />
                  <FormFeedback>{errors.lastname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="telnum" md={2}>
                  Contact No.
                </Label>
                <Col md={10}>
                  <Input
                    type="tel"
                    id="telnum"
                    name="telnum"
                    placeholder="Contact Number"
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                    invalid={errors.telnum !== ""}
                    value={this.state.telnum}
                  />
                  <FormFeedback>{errors.telnum}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="email" md={2}>
                  Email
                </Label>
                <Col md={10}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                    invalid={errors.email !== ""}
                    value={this.state.email}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 6, offset: 2 }}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="agree"
                        onChange={this.handleInputChange}
                        checked={this.state.agree}
                      />
                      <strong>We may contact you</strong>
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={{ size: 3, offset: 1 }}>
                  <Input
                    type="select"
                    name="contactType"
                    onChange={this.handleInputChange}
                    value={this.state.contactType}
                  >
                    <option>Tel.</option>
                    <option>Email</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="message" md={2}>
                  Your Feedback
                </Label>
                <Col md={10}>
                  <Input
                    type="textarea"
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Your Feedback"
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                    invalid={errors.message !== ""}
                    value={this.state.message}
                  />
                  <FormFeedback>{errors.message}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="dark">
                    Send Feedback
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
