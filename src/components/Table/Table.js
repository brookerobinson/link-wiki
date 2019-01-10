import React from 'react';

import classes from './Table.module.css';
import TableRow from '../TableRow/TableRow';

const table = (props) => {
    const links = props.links;
    let table = <p>There are no links!!! Click 'Add Link'</p>

    if (links.length !== 0) {
        table = (
            <table>
                <thead>
                    <tr>
                        <th>Link Name</th>
                        <th>URL</th>
                        <th>Details</th>
                        <th>Date Created</th>
                        <th>Date Last Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        links.map((link, index) => {
                            // console.log(links);
                            return (
                                <TableRow key={index}
                                    link={link}
                                    index={index}
                                    editMode={props.editMode}
                                    deleteClicked={() => props.deleteClicked(index)}
                                    editClicked={() => props.editClicked(index)}
                                    onEditLink={props.onEditLink}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }

    return (
        <div className={classes.Table}>
            {table}
        </div>
    );
}

export default table;