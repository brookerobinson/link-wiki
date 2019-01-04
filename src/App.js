import React, { Component } from 'react';
import classes from './App.module.css';

import Button from './components/UI/Button/Button';
// import Input from './components/UI/Input/Input';
import Aux from './hoc/Auxiliary/Auxiliary';
import Modal from './components/UI/Modal/Modal';
import Table from './components/Table/Table';
import AddLink from './components/AddLink/AddLink';

import { checkValidity, updateObject } from './shared/utility';

class App extends Component {
  state = {
    links: [
      { id: 1, name: "Link 1", url: "URL 1", details: "This is Link 1", dateCreated: "Today", dateModified: "" },
      { id: 2, name: "Link 2", url: "URL 2", details: "This is Link 2", dateCreated: "Today", dateModified: "" },
      { id: 3, name: "Link 3", url: "URL 3", details: "This is Link 3", dateCreated: "Today", dateModified: "" },
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

  deleteLinkHandler = (index) => {
    const updatedLinks = this.state.links;
    updatedLinks.splice(index, 1);
    this.setState({ links: updatedLinks })
  }

  addLinkHandler = (event) => {
    event.preventDefault();

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

    const id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);

    const formData = {};
    
    for (let formElementIdentifier in this.state.addLinkForm) {
      formData[formElementIdentifier] = this.state.addLinkForm[formElementIdentifier].value;
      formData.id = id;
      formData.dateCreated = today;
    }

    console.log('form data: ', formData)

    const updatedLinks = this.state.links;
    updatedLinks.push(formData);

    this.setState({ links: updatedLinks, addingLink: false })
  }

  cancelLinkHandler = () => {
    // Clear the form when not in use
    // const updatedNameElement = updateObject(this.state.addLinkForm.name, {
    //   value: ''
    // });
    // const updatedUrlElement = updateObject(this.state.addLinkForm.url, {
    //   value: ''
    // });
    // const updatedDetailsElement = updateObject(this.state.addLinkForm.details, {
    //   value: ''
    // });

    // const updatedaddLinkForm = updateObject(this.state.addLinkForm, {
    //   name: updatedNameElement,
    //   url: updatedUrlElement,
    //   details: updatedDetailsElement
    // });
    // this.setState({addingLink: false, addLinkForm: updatedaddLinkForm});
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
    // var item = {
    //   value: event.target.value
    // };
    // var links = this.state.links.slice();
    // var newLinks = links.map(function (link) {

    //   for (var key in link) {
    //     if (key === item.name && link.id === item.id) {
    //       link[key] = item.value;

    //     }
    //   }
    //   return link;
    // });
    // this.setState({ links: newLinks });

    console.log(event);

    // this.setState( {
    //   links: [
    //     { name: event.target.value }
    //   ]
    // } )
  }

  editModeHandler = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    // const formElementsArray = [];
    // for (let key in this.state.addLinkForm) {
    //   formElementsArray.push({
    //     id: key,
    //     config: this.state.addLinkForm[key],
    //   })
    // }
    // let form = (
    //   <div>
    //     {formElementsArray.map(formElement => (
    //       <Input
    //         key={formElement.id}
    //         elementType={formElement.config.elementType}
    //         elementConfig={formElement.config.elementConfig}
    //         value={formElement.config.value}
    //         changed={(event) => this.inputChangedHandler(event, formElement.id)}
    //         invalid={!formElement.config.valid}
    //         shouldValidate={formElement.config.validation}
    //         touched={formElement.config.touched}
    //         valueType={formElement.id} />
    //     ))}
    //     <Button btnType='Continue' disabled={!this.state.formIsValid} clicked={this.addLinkHandler}>ADD LINK</Button>
    //     <Button btnType='Cancel' clicked={this.cancelLinkHandler}>CANCEL</Button>
    //   </div>
    // );

    // let table = (
    //   <div className={classes.Table}>
    //         <table>
    //           <thead>
    //             <tr>
    //               <th>Link Name</th>
    //               <th>URL</th>
    //               <th>Details</th>
    //               <th>Date Created</th>
    //               <th>Date Modified</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {
    //               this.state.links.map((link, index) => {
    //                 return (
    //                   <tr key={index}>
    //                     <td>{link.name}</td>
    //                     <td>{link.url}</td>
    //                     <td>{link.details}</td>
    //                     <td>{link.dateCreated}</td>
    //                     <td>{link.dateModified}</td>
    //                     <td><Button btnType='Continue'>Edit</Button></td>
    //                     <td><Button btnType='Danger' clicked={() => this.deleteLinkHandler(index)}>Delete</Button></td>
    //                   </tr>
    //                 );
    //               })
    //             }
    //           </tbody>
    //         </table>
    //       </div>
    // );


    return (
      <Aux>
        <div className={classes.App}>
          <h1>This is my Link Wiki App</h1>
          <Button btnType='Continue' clicked={() => this.setState({ addingLink: true })}>ADD LINK</Button>
          <h2>My links</h2>
          {/* {table} */}
          <Table
            deleteClicked={(index) => this.deleteLinkHandler(index)}
            editClicked={this.editModeHandler}
            editMode={this.state.editMode}
            links={this.state.links}
            onEditLink={this.editLinkHandler} />
        </div>
        <Modal
          show={this.state.addingLink}
          modalClosed={this.cancelLinkHandler}>
          <AddLink
            addLinkForm={this.state.addLinkForm}
            inputChanged={(event, id) => this.inputChangedHandler(event, id)}
            formInvalid={!this.state.formIsValid}
            continued={this.addLinkHandler}
            cancelled={this.cancelLinkHandler} />
        </Modal>
      </Aux>
    );
  }
}

export default App;
