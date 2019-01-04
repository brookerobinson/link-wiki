import React, { Component } from 'react';
import classes from './App.module.css';

import Button from './components/UI/Button/Button';
import Input from './components/UI/Input/Input';
import Aux from './hoc/Auxiliary/Auxiliary';
import Modal from './components/UI/Modal/Modal';

import { checkValidity, updateObject } from './shared/utility';

class App extends Component {
  state = {
    links: [
      { name: "Link 1", url: "URL 1", details: "This is Link 1" },
      { name: "Link 2", url: "URL 2", details: "This is Link 2" },
      { name: "Link 3", url: "URL 3", details: "This is Link 3" },
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
    addingLink: false
  }

  deleteLinkHandler = (index) => {
    const updatedLinks = this.state.links;
    updatedLinks.splice(index, 1);
    this.setState({ links: updatedLinks })
  }

  addLinkHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.addLinkForm) {
      formData[formElementIdentifier] = this.state.addLinkForm[formElementIdentifier].value;
    }
    const updatedLinks = this.state.links;
    updatedLinks.push(formData);

    this.setState({ links: updatedLinks, addingLink: false })
  }

  cancelLinkHandler = () => {
    this.setState({addingLink: false});
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


  render() {
    const formElementsArray = [];
    for (let key in this.state.addLinkForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addLinkForm[key],
      })
    }
    let form = (
      <div>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            valueType={formElement.id} />
        ))}
        <Button btnType='Continue' disabled={!this.state.formIsValid} clicked={this.addLinkHandler}>ADD LINK</Button>
        <Button btnType='Danger' clicked={this.cancelLinkHandler}>CANCEL</Button>
      </div>
    );

    let table = (
      <div className={classes.Table}>
            <table>
              <thead>
                <tr>
                  <th>Link Name</th>
                  <th>URL</th>
                  <th>Details</th>
                  <th>Date Created</th>
                  <th>Date Modified</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.links.map((link, index) => {
                    return (
                      <tr key={index}>
                        <td>{link.name}</td>
                        <td>{link.url}</td>
                        <td>{link.details}</td>
                        <td>{link.dateCreated}</td>
                        <td>{link.dateModified}</td>
                        <td><Button btnType='Continue'>Edit</Button></td>
                        <td><Button btnType='Danger' clicked={() => this.deleteLinkHandler(index)}>Delete</Button></td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
    );


    return (
      <Aux>
        <div className={classes.App}>
          <h1>This is my Link Wiki App</h1>
          
          <Button btnType='Continue' clicked={() => this.setState({addingLink: true})}>ADD LINK</Button>
          <h2>My links</h2>
          {table}
        </div>
        <Modal
          show={this.state.addingLink}
          modalClosed={this.cancelLinkHandler}>
          <div className={classes.AddLink}>
            <h4>Add a New Link</h4>
            {form}
          </div>
        </Modal>
      </Aux>
    );
  }
}

export default App;
