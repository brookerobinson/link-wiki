import React, { Component } from 'react';
import classes from './App.module.css';

import Button from './components/UI/Button/Button';
import Aux from './hoc/Auxiliary/Auxiliary';
import Modal from './components/UI/Modal/Modal';
import Table from './components/Table/Table';
import AddLink from './components/AddLink/AddLink';

import { checkValidity, updateObject } from './shared/utility';

let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = dd + '/' + mm + '/' + yyyy;

class App extends Component {
  state = {
    links: [
      { id: 1, name: "Link 1", url: "URL 1", details: "This is Link 1", dateCreated: "Today", dateModified: "Today", editMode: false },
      { id: 2, name: "Link 2", url: "URL 2", details: "This is Link 2", dateCreated: "Today", dateModified: "Today", editMode: false },
      { id: 3, name: "Link 3", url: "URL 3", details: "This is Link 3", dateCreated: "Today", dateModified: "Today", editMode: false },
    ],
    addLinkForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Link Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      url: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Link URL',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      details: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Link Details',
        },
        value: '',
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    addingLink: false,
    editMode: false
  }

  startAddingHandler = () => {
    this.setState({ addingLink: true });
  }

  addLinkHandler = (event) => {
    event.preventDefault();

    const id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);

    const formData = {};
    const addLinkForm = { ...this.state.addLinkForm }

    for (let formElementIdentifier in addLinkForm) {
      formData[formElementIdentifier] = addLinkForm[formElementIdentifier].value;
    }

    console.log('form data: ', formData)

    const newLinkData = {
      id: id,
      dateCreated: today,
      dateModified: today,
      editMode: false
    }

    Object.assign(newLinkData, formData);

    const updatedLinks = [...this.state.links];
    updatedLinks.push(newLinkData);

    console.log('[Add Link] Updated Links: ', updatedLinks);

    this.setState({ links: updatedLinks, addingLink: false });
  }

  cancelLinkHandler = () => {
    this.setState({ addingLink: false });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.addLinkForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.addLinkForm[inputIdentifier].validation),
      touched: true
    });

    const updatedaddLinkForm = updateObject(this.state.addLinkForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedaddLinkForm) {
      formIsValid = updatedaddLinkForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ addLinkForm: updatedaddLinkForm, formIsValid: formIsValid });

  }

  editLinkHandler = (event) => {
    const cell = {
      name: event.target.name,
      value: event.target.value,
      id: event.target.id
    };
    //console.log('cell: ', cell);
    const links = this.state.links;
    //console.log('links: ', links);
    const newLinks = links.map(function (link) {

      for (let key in link) {
        if (key === cell.name && link.id.toString() === cell.id) {
          link[key] = cell.value;
          link.dateModified = today;
        }
      }
      return link;

    });

    this.setState({ links: newLinks });
  }

  editModeHandler = (index) => {
    let newLinks = [...this.state.links];

    for (let linkIndex in newLinks) {
      if (linkIndex === index.toString()) {
        newLinks[index].editMode = !newLinks[index].editMode;
      }
    }
    this.setState({ links: newLinks });
  }

  deleteLinkHandler = (index) => {
    const updatedLinks = this.state.links;
    updatedLinks.splice(index, 1);
    this.setState({ links: updatedLinks })
  }

  render() {
    let addLink = null;
    if (this.state.addingLink) {
      addLink = <AddLink
        addLinkForm={this.state.addLinkForm}
        inputChanged={(event, id) => this.inputChangedHandler(event, id)}
        formInvalid={!this.state.formIsValid}
        continued={this.addLinkHandler}
        cancelled={this.cancelLinkHandler} />
    }

    return (
      <Aux>
        <div className={classes.App}>
          <h1>This is my Link Wiki App</h1>
          <Button btnType='Continue' clicked={this.startAddingHandler}>ADD LINK</Button>
          <h2>My links</h2>
          <Table
            deleteClicked={(index) => this.deleteLinkHandler(index)}
            editClicked={(index) => this.editModeHandler(index)}
            editMode={this.state.editMode}
            links={this.state.links}
            onEditLink={this.editLinkHandler} />
        </div>
        <Modal
          show={this.state.addingLink}
          modalClosed={this.cancelLinkHandler}>
          {addLink}
        </Modal>
      </Aux>
    );
  }
}

export default App;
