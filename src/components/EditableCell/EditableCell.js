import React from 'react';

const editableCell = (props) => (
        <td>
            <input
                type='text'
                name={props.cellData.type}
                id={props.cellData.id}
                value={props.cellData.value}
                onChange={props.onEditLink} />
        </td>
);

export default editableCell;