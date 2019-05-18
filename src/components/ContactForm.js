import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";

class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        firstname: props.contact.firstname,
        lastname: props.contact.lastname,
        phone: props.contact.phone,
        email: props.contact.email,
        description: props.contact.description,
        isProcessing: false,
    };
  }

  validateForm() {
    return (
        this.state.firstname !=="" &&
        this.state.lastname !=="" &&
        this.state.phone !=="" &&
        this.state.email !=="" &&
        this.state.description !==""
    );
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmitClick = async event => {
    event.preventDefault();

    this.setState({ isProcessing: true });

    this.props.onSubmit(this.state);
  }

  handleDelete = async event => {
      this.props.onDelete();
  }

  render() {
    const loading = this.state.isProcessing || this.props.loading;

    return (
      <form className="ContactForm" onSubmit={this.handleSubmitClick}>
        <FormGroup bsSize="large" controlId="firstname">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            min="1"
            type="text"
            value={this.state.firstname}
            onChange={this.handleFieldChange}
            placeholder="Contact first name"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="lastname">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.lastname}
            onChange={this.handleFieldChange}
            placeholder="Contact last name"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="phone">
          <ControlLabel>Phone</ControlLabel>
          <FormControl
            type="text"
            value={this.state.phone}
            onChange={this.handleFieldChange}
            placeholder="Contact phone"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            value={this.state.email}
            onChange={this.handleFieldChange}
            placeholder="Contact email"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="description">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="text"
            value={this.state.description}
            onChange={this.handleFieldChange}
            placeholder="Contact description"
          />
        </FormGroup>
	          <LoaderButton
	            block
	            bsStyle="primary"
	            bsSize="large"
	            disabled={!this.validateForm()}
	            type="submit"
	            isLoading={this.state.isLoading}
	            text="Save"
	            loadingText="Saving…"
	          />
	          <LoaderButton
	            block
	            bsStyle="danger"
	            bsSize="large"
	            isLoading={this.state.isDeleting}
	            onClick={this.handleDelete}
	            text="Delete"
	            loadingText="Deleting…"
	          />
      </form>
    );
  }
}

export default ContactForm;
