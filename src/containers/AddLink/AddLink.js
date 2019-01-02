import React, {Component} from 'react';

import { checkValidity, updateObject } from '../../shared/utility';

import classes from './AddLink.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

class AddLink extends Component {
    state = {
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
    }

    addLinkHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.addLinkForm) {
            formData[formElementIdentifier] = this.state.addLinkForm[formElementIdentifier].value;
        }
        const newLink = {
            linkData: formData
        }
        /// put the new link in the table
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
        //console.log(formIsValid);
        this.setState({addLinkForm: updatedaddLinkForm, formIsValid: formIsValid});

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
            <form onSubmit={this.orderHandler}>
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
                        valueType={formElement.id}/>
                ))}
                <Button btnType={'Continue'} disabled={!this.state.formIsValid}>ADD LINK</Button>
            </form>
        ); 

        return (
            // <div className={classes.AddLink}>
            //     <form className={classes.Input}>
            //         <label className={classes.Label}>Link Name</label>
            //         <input type="text" className={classes.InputElement} onChange={props.changed}></input>
            //         <label className={classes.Label}>Link URL</label>
            //         <input type="text" className={classes.InputElement}></input>
            //         <label className={classes.Label}>Link Details</label>
            //         <input type="text" className={classes.InputElement}></input>
            //     </form>
            //     <Button btnType={'Continue'} disabled={!this.state.formIsValid}>Add Link</Button>
            // </div>

            <div className={classes.AddLink}>
                <h4>Add a New Link</h4>
                {form}
            </div>
        );
    }  
};

export default AddLink;
