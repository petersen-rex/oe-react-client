import React, { Component } from "react";
import { ListGroupItem, PageHeader, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

import {API } from "aws-amplify";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: [],
      records: [],
      message: {}
    };
  }
  async componentDidMount() {
	  if (!this.props.isAuthenticated) {
	    return;
	  }

	  try {
	    const notes = await this.notes();
        this.setState({ notes });
        //const message = await this.message();
        //this.setState({message});
        const records = (await this.salesForce()).records;
        console.log("Contacts: " + JSON.stringify(records));
        this.setState({records});
	  } catch (e) {
	    alert(e);
	  }

	  this.setState({ isLoading: false });
	}

	notes() {
	  return API.get("notes", "/notes");
	}
    message(){
        return API.get("notes", "/message");
    }
    salesForce(){
        return API.get("salesforce", "/contacts");
    }

    renderNotesList(notes) {  
        return [{}].concat(notes).map(
		    (note, i) =>
		      i !== 0
		        ? <LinkContainer
		            key={note.noteId}
		            to={`/notes/${note.noteId}`}
		          >
		            <ListGroupItem header={note.content.trim().split("\n")[0]}>
		              {"Created: " + new Date(note.createdAt).toLocaleString()}
		            </ListGroupItem>
		          </LinkContainer>
		        : <LinkContainer
		            key="new"
		            to="/notes/new"
		          >
		            <ListGroupItem>
		              <h4>
		                <b>{"\uFF0B"}</b> New Note
		              </h4>
		            </ListGroupItem>
		          </LinkContainer>
		  );
		}

    renderContactsList(contacts) {  
        return [{}].concat(contacts).map(
		    (contact, i) =>
		      i !== 0
		        ? <LinkContainer
		            key={contact.id}
		            to={`/contacts/${contact.id}`}
		          >
		            <ListGroupItem header={contact.firstname+" "+contact.lastname}>
		              {contact.account.Name}<br/>
                      {contact.phone + " " + contact.email}
		            </ListGroupItem>
		          </LinkContainer>
		        : <LinkContainer
		            key="new"
		            to="/contacts/new"
		          >
		            <ListGroupItem>
		              <h4>
		                <b>{"\uFF0B"}</b> New Contact
		              </h4>
		            </ListGroupItem>
		          </LinkContainer>
		  );
		}

    renderLander() {
    return (
      <div className="lander">
        <h1>oeDXP</h1>
        <p>A simple AWS-based CMS</p>
        <div>
        	<Link to="/login" className="btn btn-info btn-lg">Login</Link>
        	<Link to="/signup" className="btn btn-success btn-lg">Signup</Link>
        </div>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Notes </PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
        <ListGroup>
            {!this.state.isLoading && this.renderContactsList(this.state.records)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}
