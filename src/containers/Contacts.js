import React, { Component } from "react";
import { API } from "aws-amplify";
import ContactForm from "../components/ContactForm";

import "./Contacts.css";


export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
    		  isLoading: null,
    		  isDeleting: null,
    		  contact: null,
    };
  }

  async componentDidMount() {
    try {
      const contact = await this.getContact();

      this.setState({
        contact: contact.record,
      });
    } catch (e) {
      alert(e);
    }
  }

  getContact() {
    return API.get("salesforce", `/contacts/${this.props.match.params.id}`);
  }

  validateForm() {
      return true;
	}


	saveContact(formState) {
        var body = {
                id: `${this.props.match.params.id}`,
                firstname : formState.firstname,
                lastname: formState.lastname,
                phone:formState.phone,
                email : formState.email,
                description: formState.description
        };
        return API.put("salesforce", `/contacts/${this.props.match.params.id}`, {
            body: body
        });
    }

    handleSubmit = async (formState) => {

        this.setState({ isLoading: true });

        try {

        await this.saveContact(formState);

        this.props.history.push("/");
        } catch (e) {
        alert(e);
        this.setState({ isLoading: false });
        }
    }


		deleteContact() {
			  return API.del("salesforce", `/contacts/${this.props.match.params.id}`);
			}

        handleDelete = async event => {

            const confirmed = window.confirm(
            "Are you sure you want to delete this contact?"
            );

            if (!confirmed) {
            return;
            }

            this.setState({ isDeleting: true });

            try {
            await this.deleteContact();
            this.props.history.push("/");
            } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
            }
        }

	render() {
	  return (
	    <div className="Contacts">
	          {this.state.contact &&
              <ContactForm
	            loading={this.state.isLoading}
                onSubmit={this.handleSubmit}
                onDelete={this.handleDelete}
                contact = {this.state.contact}
	          />}
	    </div>
	  );
	}
}
