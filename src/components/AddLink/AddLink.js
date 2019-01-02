import React from 'react';

import classes from './AddLink.module.css'
import Button from '../UI/Button/Button'

const addLink = () => {
    return (
        <div className={classes.AddLink}>
            <form className={classes.Input}>
                <label className={classes.Label}>Link Name</label>
                <input type="text" className={classes.InputElement}></input>
                <label className={classes.Label}>Link URL</label>
                <input type="text" className={classes.InputElement}></input>
                <label className={classes.Label}>Link Details</label>
                <input type="text" className={classes.InputElement}></input>
            </form>
            <Button btnType={'Continue'}>Add Link</Button>
        </div>
    );
};

export default addLink;