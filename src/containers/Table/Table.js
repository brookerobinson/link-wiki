import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Table.module.css';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions';

class Table extends Component {

    render () {
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
                        this.props.links.map((link, index) => {
                            return (
                                <tr key={index}>
                                    <td>{link.name}</td>
                                    <td>{link.url}</td>
                                    <td>{link.details}</td>
                                    <td>{link.dateCreated}</td>
                                    <td>{link.dateModified}</td>
                                    <td><Button btnType='Continue'>Edit</Button></td>
                                    <td><Button btnType='Danger' clicked={() => this.props.onDeleteLink(index)}>Delete</Button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        links: state.links
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteLink: (index) => dispatch(actions.deleteLink({link: index}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);