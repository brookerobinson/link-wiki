import React from 'react';

import classes from './AddLink.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

const addLink = (props) => {
    const addLinkForm = props.addLinkForm;
    const formElementsArray = [];

    for (let key in addLinkForm) {
        formElementsArray.push({
            id: key,
            config: addLinkForm[key],
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
                    changed={(event) => props.inputChanged(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    valueType={formElement.id} />
            ))}
            <Button btnType='Continue' disabled={props.formInvalid} clicked={props.continued}>ADD LINK</Button>
            <Button btnType='Cancel' clicked={props.cancelled}>CANCEL</Button>
        </div>
    );

    return (
        <div className={classes.AddLink}>
            <h4>Add a New Link</h4>
            {form}
        </div>
    );
};

export default addLink;
