import React from 'react';

import EditableCell from '../EditableCell/EditableCell';
import TableCell from '../TableCell/TableCell';
import Button from '../UI/Button/Button';

const tableRow = (props) => {
    const link = props.link;

    if (link.editMode === false) {
        return (
            <tr key={props.index}>
                <TableCell cellClass='TableCell'>{link.name}</TableCell>
                <TableCell cellClass='TableCell'>{link.url}</TableCell>
                <TableCell cellClass='TableCell'>{link.details}</TableCell>
                <TableCell cellClass='TableCell'>{link.dateCreated}</TableCell>
                <TableCell cellClass='TableCell'>{link.dateModified}</TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Edit' clicked={props.editClicked}>Edit</Button></TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Delete' clicked={props.deleteClicked}>Delete</Button></TableCell>
            </tr>
        );
    } else if (link.editMode === true) {
        return (
            <tr key={props.index}>
                <EditableCell cellData={{ "type": "name", value: link.name, id: link.id }} onEditLink={props.onEditLink} />
                <EditableCell cellData={{ "type": "url", value: link.url, id: link.id }} onEditLink={props.onEditLink} />
                <EditableCell cellData={{ "type": "details", value: link.details, id: link.id }} onEditLink={props.onEditLink} />
                <TableCell cellClass='TableCell'>{link.dateCreated}</TableCell>
                <TableCell cellClass='TableCell'>{link.dateModified}</TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Continue' clicked={props.editClicked}>APPLY</Button></TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Delete' clicked={props.deleteClicked}>Delete</Button></TableCell>
            </tr>
        );
    }
}

export default tableRow;