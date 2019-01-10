import React from 'react';
import classes from './EditableCell.module.css';

const editableCell = (props) => (
        <td className={classes.EditableCell}>
            <input
                type='text'
                name={props.cellData.type}
                id={props.cellData.id}
                value={props.cellData.value}
                onChange={props.onEditLink} />
        </td>
);

export default editableCell;