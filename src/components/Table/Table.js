import React from 'react';

import classes from './Table.module.css';
import TableRow from '../TableRow/TableRow';

const table = (props) => {
    //pass on the methods there?
    const links = props.links;
    let table = (
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
                    links.map((link, index) => {
                        return (
                            <TableRow key={index}
                                link={link} 
                                index={index}
                                editMode={props.editMode}  
                                deleteClicked={() => props.deleteClicked(index)}
                                editClicked={props.editClicked}
                                onEditLink={props.onEditLink}/>
                        );
                    })
                }
            </tbody>
        </table>
    );

    return (
        <div className={classes.Table}>
            {table}
        </div>
    );
}

export default table;