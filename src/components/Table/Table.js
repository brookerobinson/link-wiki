import React from 'react';

import classes from './Table.module.css';
import Button from '../UI/Button/Button';

const links = [
    {id: 1, Name: "Link 1", url: "URL 1", details: "This is the first link", dateCreated: "Today", dateModified: "Today"},
    {id: 2, Name: "Link 2", url: "URL 2", details: "This is the second link", dateCreated: "Today", dateModified: "Today"},
    {id: 3, Name: "Link 3", url: "URL 3", details: "This is the third link", dateCreated: "Today", dateModified: "Today"}
]

const table = () => {
    return (
        <div className={classes.Table}>
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
                    links.map((link) => {
                        return (
                            <tr key={link.id}>
                                <td>{link.Name}</td>
                                <td>{link.url}</td>
                                <td>{link.details}</td>
                                <td>{link.dateCreated}</td>
                                <td>{link.dateModified}</td>
                                <td><Button btnType='Continue'>Edit</Button></td>
                                <td><Button btnType='Danger'>Delete</Button></td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default table;