import React from 'react';

import EditableCell from '../EditableCell/EditableCell';
import TableCell from '../TableCell/TableCell';
import Button from '../UI/Button/Button';

const tableRow = (props) => {

    if (props.editMode === false) {
        return (
            <tr key={props.index}>
                <TableCell cellClass='TableCell'>{props.link.name}</TableCell>
                <TableCell cellClass='TableCell'>{props.link.url}</TableCell>
                <TableCell cellClass='TableCell'>{props.link.details}</TableCell>
                <TableCell cellClass='TableCell'>{props.link.dateCreated}</TableCell>
                <TableCell cellClass='TableCell'>{props.link.dateModified}</TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Edit' clicked={props.editClicked}>Edit</Button></TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Delete' clicked={props.deleteClicked}>Delete</Button></TableCell>
            </tr>
        );
    } else if (props.editMode === true) {
        return (
            <tr key={props.index}>
                <EditableCell
                    onEditLink={props.onEditLink}
                    cellData={{
                        "type": "name",
                        value: props.link.name,
                    }} />
                <TableCell cellClass='TableCell'>{props.link.url}</TableCell>
                <TableCell cellClass='TableCell'>{props.link.details}</TableCell>
                <TableCell cellClass='TableCell'>{props.link.dateCreated}</TableCell>
                <TableCell cellClass='TableCell'>{props.link.dateModified}</TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Edit' clicked={props.editClicked}>Edit</Button></TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Delete' clicked={props.deleteClicked}>Delete</Button></TableCell>
            </tr>
        );
    }

}

export default tableRow;