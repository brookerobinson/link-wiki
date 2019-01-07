import React from 'react';

import EditableCell from '../EditableCell/EditableCell';
import TableCell from '../TableCell/TableCell';
import Button from '../UI/Button/Button';


//Gets these props from table:
{/*
    <TableRow 
        key={index}
        link={link}
        index={index}
        editMode={props.editMode}
        deleteClicked={() => props.deleteClicked(index)}
        editClicked={props.editClicked}
        onEditLink={props.onEditLink} />
*/}

const tableRow = (props) => {
    const link = props.link;
    let linkData = [];
    for (let data in link) {
        let obj = {};
        obj[data] = link[data];
        linkData.push(obj);
    }

    if (props.editMode === false) {
        // console.log('link', link)
        // console.log('linkData', linkData);
        const linkDataRow = linkData.map((item, index) => {
            // console.log(item);
            for (let key in item) {
                if (key === 'name' || key === 'url' || key === 'details' || key === 'dateCreated' || key === 'dateModified' ) {
                    return (
                        <TableCell key={index} cellClass='TableCell'>{item[key]}</TableCell>
                    );
                } return null;
            }
        });
        return (
            <tr>
                {linkDataRow}
                <TableCell cellClass='ButtonCell'><Button btnType='Edit' clicked={props.editClicked}>Edit</Button></TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Delete' clicked={props.deleteClicked}>Delete</Button></TableCell>
            </tr>

            // <tr key={props.index}>

            //     <TableCell cellClass='TableCell'>{props.link.name}</TableCell>
            //     <TableCell cellClass='TableCell'>{props.link.url}</TableCell>
            //     <TableCell cellClass='TableCell'>{props.link.details}</TableCell>
            //     <TableCell cellClass='TableCell'>{props.link.dateCreated}</TableCell>
            //     <TableCell cellClass='TableCell'>{props.link.dateModified}</TableCell>
            //     <TableCell cellClass='ButtonCell'><Button btnType='Edit' clicked={props.editClicked}>Edit</Button></TableCell>
            //     <TableCell cellClass='ButtonCell'><Button btnType='Delete' clicked={props.deleteClicked}>Delete</Button></TableCell>
            // </tr>
        );
    } else if (props.editMode === true) {
        console.log('Mapping through LinkData', linkData)
        const linkDataRow = linkData.map((item, index) => {
            // console.log(item);

            for (let key in item) {
                if (key === 'name' || key === 'url' || key === 'details') {
                    return (
                        <EditableCell key={index} value={item[key]} onEditLink={props.onEditLink} />
                    );
                } else if (key === 'dateCreated' || key === 'dateModified') {
                    return (
                        <TableCell key={index} cellClass='TableCell'>{item[key]}</TableCell>
                    );
                }
            } return null;
        });
        return (
            <tr>
                {linkDataRow}
                <TableCell cellClass='ButtonCell'><Button btnType='Edit' clicked={props.editClicked}>Edit</Button></TableCell>
                <TableCell cellClass='ButtonCell'><Button btnType='Delete' clicked={props.deleteClicked}>Delete</Button></TableCell>
            </tr>
        );
        // return (
        //     <tr key={props.index}>
        //         <EditableCell
        //             onEditLink={props.onEditLink}
        //             // cellData={{
        //             //     "type": "name",
        //             //     value: props.link.name,
        //             // }}
        //             value={props.link.name}
        //         />
        //         <TableCell cellClass='TableCell'>{props.link.url}</TableCell>
        //         <TableCell cellClass='TableCell'>{props.link.details}</TableCell>
        //         <TableCell cellClass='TableCell'>{props.link.dateCreated}</TableCell>
        //         <TableCell cellClass='TableCell'>{props.link.dateModified}</TableCell>
        //         <TableCell cellClass='ButtonCell'><Button btnType='Edit' clicked={props.editClicked}>Edit</Button></TableCell>
        //         <TableCell cellClass='ButtonCell'><Button btnType='Delete' clicked={props.deleteClicked}>Delete</Button></TableCell>
        //     </tr>
        // );
    }

}

export default tableRow;